# Student Management API

A RESTful API for a Student Management System built with **Node.js**, **Express.js**, **MongoDB**, and **Mongoose**.

## Endpoints

| Method | Route            | Description            |
| ------ | ---------------- | ---------------------- |
| POST   | `/create`        | Create a student       |
| GET    | `/get-all`       | Get all students       |
| GET    | `/get-one/:id`   | Get a single student   |
| PUT    | `/update/:id`    | Update a student       |
| DELETE | `/delete/:id`    | Delete a student       |

All responses follow the shape:

```json
{ "success": true, "message": "...", "data": { } }
```

Errors:

```json
{ "success": false, "message": "..." }
```

## Student fields

| Field      | Type   | Required | Notes                          |
| ---------- | ------ | -------- | ------------------------------ |
| `name`     | String | yes      | 2–100 characters               |
| `email`    | String | yes      | unique, valid format, lowercase|
| `age`      | Number | yes      | 16–100                         |
| `course`   | String | yes      | max 100 characters             |
| `department` | String | no     | defaults to `"General"`        |

`createdAt` / `updatedAt` are added automatically.

## Getting started

### Prerequisites

- Node.js 18+
- MongoDB running locally, a MongoDB Atlas cluster, or Docker

### Installation

```bash
git clone <your-repo-url>
cd student-management-api
npm install
```

### Configuration

```bash
cp .env.example .env
```

Edit `.env` and set `MONGO_URI` (and `PORT` if you want something other than 5000).

### Run

```bash
npm start        # production
npm run dev      # auto-restart on file changes
```

Server starts at `http://localhost:5000`.

### Quick MongoDB with Docker

```bash
docker run -d --name mongo-students -p 27017:27017 mongo:7
```

## Testing with Postman

### 1. Create a student

`POST http://localhost:5000/create`

```json
{
  "name": "Ada Lovelace",
  "email": "ada@example.com",
  "age": 22,
  "course": "Computer Science",
  "department": "Engineering"
}
```

### 2. Get all students

`GET http://localhost:5000/get-all`

### 3. Get one student

`GET http://localhost:5000/get-one/<id>`

### 4. Update a student

`PUT http://localhost:5000/update/<id>`

```json
{
  "course": "Data Science"
}
```

### 5. Delete a student

`DELETE http://localhost:5000/delete/<id>`

## Error responses

| Status | Meaning                                            |
| ------ | -------------------------------------------------- |
| 400    | Validation error / invalid id / malformed JSON     |
| 404    | Student or route not found                         |
| 409    | Duplicate email                                    |
| 500    | Server error                                       |

## Project structure

```
student-management-api/
├── src/
│   ├── app.js                 # Express app + middleware
│   ├── server.js              # DB connection + server bootstrap
│   ├── controllers/
│   │   └── studentController.js
│   ├── models/
│   │   └── Student.js
│   └── routes/
│       └── studentRoutes.js
├── .env.example
├── .gitignore
├── package.json
└── README.md
```
