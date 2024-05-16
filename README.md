# Chat TeamChallenge Node&TypeScript App
## CRUD RESTful API

At this very point the app has only two endpoints:

- [/users/signup](#signup)
- [/users/login](#login)

To start the app simply type the:

```
npm start
```

In order to create user you will need to add the URL of your local Mongo DataBase and set the port in .env file. The payload of data to add to the DB as following:

/signup:
```
{
    "email": "some@email.com",
    "username": "example",
    "password": "some_password"
}
```
/login:
```
{
    "username": "example",
    "password": "some_password"
}
```
