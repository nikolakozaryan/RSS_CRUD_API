import dotenv from 'dotenv';
import { parseUrl } from './middlewares/parseUrl';
import { App } from './modules/App/App';
import { userRouter } from './user-router';
import cluster from 'cluster';
import http from 'node:http';
import { cpus } from 'os';
import { BASIC_URL } from './models/constants/constants';
import { getRequestOptions } from './utils/getRequestOptions';
import { Methods } from './models/types/router.types';

dotenv.config();
const MODE = process.env.NODE_ENV;
const PORT = +(process.env.PORT as string);
const numCPUs = cpus().length;

const app = new App();
app.use(parseUrl);
app.addRouter(userRouter);

if (MODE === 'multi') {
  let requestCounter = 0;
  if (cluster.isPrimary) {
    for (let i = 1; i <= numCPUs; i++) {
      const WORKER_ENV = { PORT: PORT + i };
      cluster.fork(WORKER_ENV);
    }

    const balancer = http.createServer((req, res) => {
      const numCPUs = cpus().length;
      const { url, method } = req;
      let dataToSend = '';
      let dataFromWorker = '';

      req.on('data', (chunk) => {
        dataToSend += chunk;
      });

      req.on('end', () => {
        requestCounter = ++requestCounter > numCPUs ? (requestCounter %= numCPUs) : requestCounter;
        const WORKER_PORT = PORT + requestCounter;
        const workerUrl = `${BASIC_URL}:${WORKER_PORT}${url}`;
        const options = getRequestOptions(method as Methods, dataToSend);

        const request = http.request(workerUrl, options, (response) => {
          response.on('data', (chunk) => (dataFromWorker += chunk));
          response.on('end', () => {
            res.writeHead(response.statusCode!, { 'Content-type': 'application/json' });
            res.end(dataFromWorker);
          });
        });

        request.on('error', (e) => {
          console.error(`problem with request: ${e.message}`);
        });

        if (dataToSend) request.write(dataToSend);
        request.end();
      });
    });
    balancer.listen(+PORT);
  } else {
    const WORKER_PORT = +(process.env.PORT as string);

    app.listen(WORKER_PORT, () => {
      console.log(`Server ${process.pid} started on PORT ${WORKER_PORT}`);
    });
  }
} else {
  app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`);
  });
}
