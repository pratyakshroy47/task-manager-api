# Task Manager API

The Task Manager API is a simple and easy-to-use RESTful API built with Node.js and Express. It enables users to perform CRUD operations on tasks, each consisting of a title, a description, and a completion status. This project uses an in-memory storage solution with the ability to read from and write to a JSON file to persist data across server restarts.

## Features

- **CRUD Operations**: Create, read, update, and delete tasks.
- **Data Persistence**: Uses a JSON file to persist data.
- **Error Handling**: Provides meaningful error messages for incorrect inputs or requests.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/en/) (version 12 or above)
- npm (normally comes with Node.js)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/task-manager-api.git
   cd task-manager-api

2. **Install Dependencies:**

   ```bash
   npm install

3. **Start the sever:**

   ```bash
   node app.js

This will start the local server on http://localhost:3000. The API will be accessible from this URL.

## API Endpoints

Below are the available endpoints in the Task Manager API.

### `GET /tasks`
- **Description**: Retrieve all tasks.
- **Response**: A list of tasks.

### `GET /tasks/:id`
- **Description**: Retrieve a single task by its ID.
- **Response**: A task object.

### `POST /tasks`
- **Description**: Create a new task.
- **Body**:

  ```json
  {
    "title": "Task Title",
    "description": "Task Description",
    "completed": false
  }

- **Response**: A task object.

### `DELETE /tasks`
- **Description**: Delete a task by it's ID.
- **Response**: No content.

## Testing
You can test the API endpoints using Postman or any other API testing tool by accessing http://localhost:3000.

## Contact
- Pratyaksh Roy
- Email: pratyakshroy47@gmail.com
