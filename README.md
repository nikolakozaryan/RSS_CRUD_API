# RSS_CRUD_API
## How to start

1. Clone the repository
```
https://github.com/nikolakozaryan/RSS_CRUD_API.git
```
2. Move to app folder
```
cd RSS_CRUD_API
```
3. Change brunch to develop
```
git checkout dev
```
4. Install dependencies
```
npm install
```
5. Rename example.env to .env and specify the port
## How to run the app
1. To start the app in development mode (run the app with nodemon)
```
npm run start:dev
```
2. To start the app in production mode (create bundle file with webpack and run it)
```
npm run start:prod
```
3. To start the app in multiple instances mode (run multiple instances of the app with nodemon)
```
npm run start:multi
```
4. To test the app
```
npm run test
```
5. App is running on port, specified in `.env` file.
```
localhost:PORT
```
## API

Implemented endpoint: `api/users`

Methods:

**GET** `api/users` is used to get all users  
Server answers with status code 200 and all users records
  
**GET** `api/users/${userId}` is used to get a specific user
Server answers with status code **200** and record with `id === userId` if it exists  
Server answers with status code **400** and corresponding message if `userId` is invalid (not uuid)  
Server answers with status code **404** and corresponding message if record with `id === userId` doesn't exist  
   
**POST** `api/users` is used to create a record about new user and store it in database  
Server answers with status code **201** and newly created record  
Server answers with status code **400** and corresponding message if request body does not contain required fields  
   
**PUT** `api/users/{userId}` is used to update existing user  
Server answers with status code **200** and updated record  
Server answers with status code **400** and corresponding message if `userId` is invalid (not uuid)  
Server answers with status code **404** and corresponding message if record with `id === userId` doesn't exist  
   
**DELETE** `api/users/${userId}` is used to delete existing user from database  
Server answers with status code **204** if the record is found and deleted  
Server answers with status code **400** and corresponding message if `userId` is invalid (not uuid)  
Server answers with status code **404** and corresponding message if record with `id === userId` doesn't exist 
