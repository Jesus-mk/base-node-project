# Base-node-project - **WIP**

This project was created as a learning experience on Node-ts with Express and MySQL.
The idea behind the creation was to create an ORM to use and expands on future projects.

## How It Works
The project contains a group of methods that will access the DB and two basic CRUD with Employees and Users, the CRUDs are just there to give an example of how the methods that access the DB could be used. The usage is designed to use the methods in a way that just by indicating the entity that is calling it, it should be able to construct a working SQL to access the DB and return a typed response or and error according to the operation that was attempted.

* All methods that call the DB are as much generic as possible while being typed to avoid usage errors. 
* The SQL sentences are constructed dinamically, but still escaped.
* All API calls will return an http response = 200 even when an error happens. 
* There is a dynamic structure for returning errors depending on the error type.
* Any error with database is logged in a separate table to debbug it.

### Instalation
The project requires Node v14.17.6 as minimum and MySQL server 8.0.26. Then, create and .env file with the next fields according to your DB configuration.
``` 
PROJECT_HOST='localhost'
PROJECT_USER='root' 
PROJECT_PASSWORD='root'
PROJECT_DATABASE='mydb'
PROJECT_PORT=3050 
```

After that, run ``` npm install ``` and ``` npm start ``` to run the project. The next messages should appear on the cmd:

``` 
Server is listening on {YOUR PORT}
DB connection ok
```

Last but not least, the Schema folder on the root contains an structure of the database.
