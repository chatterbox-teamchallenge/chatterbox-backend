# Chat TeamChallenge Node&TypeScript App
## CRUD RESTful API

At this very point the app has the following endpoints:

- [/users/signup](#signup)
- [/users/login](#login)
- [/users/updatePassword](#updatePassword)

To start the app simply type the:

```
tsc
npm start
```

In order to create user you will need to add the URL of your local Mongo DataBase and set the port in .env file. The payload of data to add to the DB as following:

POST /signup:
```
{
    "email": "some@email.com",
    "username": "example",
    "password": "some_password"
}
```
POST /login:
```
{
    "username": "example",
    "password": "some_password"
}
```
PUT /updatePassword
```
{
    "username": "example211",
    "oldPassword": "simple_pass_updated",
    "newPassword": "simple_pass_"
}
```
