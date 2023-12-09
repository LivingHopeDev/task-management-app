# INTRODUCTION

This API is a simple and user-friendly application programming interface designed to perform basic CRUD (Create, Read, Update, Delete) operations. This API serves as a fundamental building block for managing and maintaining users' tasks and it uses MYSQL database.

The API functionalities includes:

1. Display tasks - Stored tasks in the database can be accessed. An endpoint that shows all the tasks which will include the title,description,dueDate,status and id.
2. Delete task.
3. Add task.
4. Update task.
5. Update task status

## Getting started

### Installation

Developers who are interested in using this API should have node installed on their local machines if not already installed.

### Clone the repository

```
git clone https://github.com/LivingHopeDev/task-management-app

```

- move into the cloned directory

```
cd task-management-app
```

To install all dependencies, run `npm install`

### Configuration

Create a `.env` file in the project's root directory and define the following environment variables

```
HOST = your_host_name
PASSWORD = your_database_password
USER = your_database_user
DATABASE = your_database_name
PORT = 5000
JWT_SECRET = your_jwt_secret
```

Replace the above with with your actual database connection credentials.

### Limitation

`The script for creating the database and the tables automatically hasn't been implemented because i couldn't get the mysql client on the CMD to run it as at the point of writing this readme file`.
To use this API, you can use the following commands to generate the tables

To create the user table

```
CREATE TABLE user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);
```

To create the task table

```
CREATE TABLE task (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  dueDate DATE,
  completed BOOLEAN DEFAULT false,
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES user(id)
);
```

To run the application, run any of the commands

```
nodemon app
npm start
```

The application will run on `http://127.0.0.1:5000/`.

## API Reference

### Endpoints

To test for the endpoints, the developer should have installed Postman or thunder client or any other application with similar capability or use curl.

#### POST

This endpoint registers a new user. It returns a success message.
sample: `localhost:5000/api/user/register`

- body (JSON)

```
{
  "name": "Adetayo",
  "email":"adetayo@mail.com",
  "password":"test12"
}
```

```

{
  "message": "Registration completed: Login now!"
}

```

#### POST

This endpoint logs in a user. It returns the users details when the login is successful.
sample: `localhost:5000/api/user/login`

- body (JSON)

```
{
 "email":"adetayo@mail.com",
  "password":"test12"
}
```

```

{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": 2,
    "name": "Adetayo",
    "email": "adetayo@mail.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzAyMDk0MTM1LCJleHAiOjE3MDI1MjYxMzV9.qTg3UP4_dWOjIlUyrdJZEpyDsWlmi8DDsOHtuqQTGMk"
}

```

### GET

This is a protected endpoint which would require the user to be logged in. The token generated during the login must be passed to the authorization header starting with the word "Bearer". It updates the user's task by passing the id of the task to be updated. It returns a success message if a correct task id is passed. Also the user is only allowed to update the task created by him/her. Else, an error message will be returned.

sample: `localhost:5000/api/task`

- response (JSON)

```
{
  "success": true,
  "message": [
    {
      "id": 17,
      "title": "Read book",
      "description": "this is the description",
      "dueDate": "2023-12-22T23:00:00.000Z",
      "completed": 0,
      "user_id": 1
    }
  ]
}
```

if the task id passed is not correct:

```
{
  "message": "Task not found"
}

```

if no task has been created:

```
{
  "success": true,
  "message": "No task yet:create one now!"
}
```

### PUT /id

This is a protected endpoint. It updates a user's task with the id passed as a params. It also verify if the id requested for was created by such user before updating it. It returns a success message if no error occurs.
sample: `localhost:5000/api/task/1`

```
{
  "success": true,
  "message": "Task updated"
}
```

If the user try to update a task not created by him/her:

```
{ "success": false,
 "message": "Unauthorized to access this task"
}
```

### DELETE /id

This is a protected endpoint. It removes a user's task with the id passed as a params and returns a success message.
sample: `localhost:5000/api/task/1`

```
{
    "success": true,
    "message": "Task deleted"
 }
```

### PUT /id

This endpoint toggle the task's status. For instance, if the status of a task is pending and this endpoint is hit on that task id, the status of the task will be changed to completed.

sample: `localhost:5000/api/task/1/set-completed`

```
{
  "message": "Task completed"
}

```

### Error codes in the API

- 404: Not found
- 500: Internal server error
- 200: ok
