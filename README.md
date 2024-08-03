API Documentation
User Routes
1. Sign Up
Endpoint: POST /users/signup
Description: Registers a new user.
Request Body:
json

{
  "username": "string",
  "email": "string",
  "password": "string"
}
Responses:
Success (200):
json

{
  "id": "user-id",
  "token": "jwt-token",
  "message": "Signup successful"
}
Error (400):
json

{
  "error": "Username not available, try another username"
}
2. Login
Endpoint: POST /users/login
Description: Authenticates a user and returns a JWT token.
Request Body:
json

{
  "username": "string",
  "password": "string"
}
Responses:
Success (200):
json

{
  "token": "jwt-token",
  "message": "Successful login"
}
Error (401):
json

{
  "error": "Invalid username or password"
}
3. Change Password
Endpoint: PUT /users/changepassword
Description: Allows a logged-in user to change their password.
Request Body:
json

{
  "username": "string",
  "oldPassword": "string",
  "newPassword": "string"
}
Responses:
Success (200):
json

{
  "message": "Password changed"
}
Error (401):
json

{
  "error": "Incorrect password"
}
Error (400):
json

{
  "message": "New password cannot be the same as old password"
}
Error (404):
json

{
  "error": "User not found"
}
Error (500):
json

{
  "error": "Internal error occurred"
}
4. Delete Account
Endpoint: DELETE /users/delete
Description: Deletes a user account.
Request Body:
json

{
  "username": "string"
}
Responses:
Success (200):
json

{
  "message": "Successfully deleted"
}
Error (500):
json

{
  "error": "Error occurred"
}
Task Routes
1. Create Task
Endpoint: POST /tasks
Description: Creates a new task.
Request Body:
json

{
  "title": "string",
  "description": "string"
}
Responses:
Success (200):
json

{
  "response": {
    "_id": "task-id",
    "title": "string",
    "description": "string",
    "createdAt": "YYYY-MM-DDTHH:MM:SSZ",
    "owner": "user-id"
  }
}
Error (500):
json

{
  "error": "Internal server error"
}
2. Get All Tasks
Endpoint: GET /tasks
Description: Retrieves all tasks for the authenticated user.
Responses:
Success (200):
json

[
  {
    "_id": "task-id",
    "title": "string",
    "description": "string",
    "createdAt": "YYYY-MM-DD HH:MM"  // Formatted in Asia/Kathmandu timezone
  }
]
Error (500):
json

{
  "error": "Internal server error"
}
3. Get Task by ID
Endpoint: GET /tasks/:id
Description: Retrieves a task by its ID.
Responses:
Success (200):
json

{
  "_id": "task-id",
  "title": "string",
  "description": "string",
  "createdAt": "YYYY-MM-DDTHH:MM:SSZ",
  "owner": "user-id"
}
Error (500):
json

{
  "error": "Internal server error"
}
4. Update Task
Endpoint: PUT /tasks/:id
Description: Updates a task by its ID.
Request Body:
json

{
  "title": "string",
  "description": "string"
}
Responses:
Success (200):
json

{
  "_id": "task-id",
  "title": "string",
  "description": "string",
  "createdAt": "YYYY-MM-DDTHH:MM:SSZ",
  "owner": "user-id"
}
Error (404):
json

{
  "error": "Task not found"
}
Error (500):
json

{
  "error": "Invalid ID or internal server error"
}
5. Delete Task
Endpoint: DELETE /tasks/:id
Description: Deletes a task by its ID.
Responses:
Success (200):
json

{
  "message": "Task deleted"
}
Error (403):
json

{
  "error": "Unauthorized to delete this task"
}
Error (500):
json

{
  "error": "Internal server error"
}
Authentication Middleware
jwtVerify: Middleware to ensure routes are accessed by authenticated users.
