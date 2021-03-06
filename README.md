
<p align='center'>
  <a href="https://www.linkedin.com/in/aymeric-fisselier/">
    <img src="https://img.shields.io/badge/linkedin-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white" />
  </a>&nbsp;&nbsp;
  <a href="https://www.instagram.com/aymbcn/">
    <img src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white" />
  </a>&nbsp;&nbsp;
</p>

# EpyTodo

The project idea is to build a Todo List.
The project mainly focuses on the “backend” side of the project,
making the routes of the API, handling the database, and all the actions that a Todo App is supposed to have.

# Objectives

Within this project, we had to develop:
1. A MySQL database.
2. A web server using Node.js
This was my first project doing web development, and experiencing with Node.js and MySQL. In the end we managed to get the highest grade.

# Requests

Route | Method | Protected | Description
| :---: | :---: | :---: | :---:
/register | POST | No | Register a new user
/login | POST | No | Connect a user
/user | GET | Yes | View all user information
/user/todos | GET | Yes | View all user tasks
/users/:id or :email | GET | Yes | View user information
/users/:id | PUT | Yes | Update user information
/user/:id | DELETE | Yes | Delete user
/todos | GET | Yes | View all the todos
/todos:id | GET | Yes | View the todo
/todos | POST | Yes | Create a todo
/todos:id | PUT | Yes | Update a todo
/todos:id | DELETE | Yes | Delete a todo
