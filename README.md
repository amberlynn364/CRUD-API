# CRUD API

This API enables you to execute CRUD operations on user data. User information is stored as objects with unique identifiers created by the server.

## Technical requirements

- The task implemented TypeScript.
- Only the following dependencies are allowed: `nodemon`, `dotenv`, `cross-env`, `typescript`, `ts-node`, `ts-node-dev`, `eslint` and its plugins, `webpack-cli`, `webpack` and its plugins, `prettier`, `uuid`, `@types/*`, and libraries used for testing.
- Node.js 20 LTS version.
- Asynchronous API.

## Installation

1. **Clone this repository to your local machine:**

   ```bash
   git clone <repository_url>
   ```

2. **Navigate to the project directory:**

   ```bash
   cd CRUD-API
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Create a `.env` file in the root directory and define the port:**

   ```plaintext
   for example "PORT=1000"
   ```

## Usage

### Running the Application

#### Development Mode

To run the application in development mode using nodemon or ts-node-dev, execute:

```bash
npm run start:dev
```

#### Production Mode

To run the application in production mode, execute:

```bash
npm start:prod
```

### Endpoints

- **GET `/api/users`**: Get all users.
  
- **GET `/api/users/{userId}`**: Get user by ID.
  
- **POST `/api/users`**: Create a new user.
  
- **PUT `/api/users/{userId}`**: Update user by ID.
  
- **DELETE `/api/users/{userId}`**: Delete user by ID.

### Request and Response Examples

#### GET /api/users

**Request:**

```bash
GET http://localhost:1000/api/users
```

**Response (200 OK):**

```json
[
    {
        "id": "1",
        "username": "Name",
        "age": 20,
        "hobbies": ["education", "coding"]
    },
    {
        "id": "2",
        "username": "Name2",
        "age": 15,
        "hobbies": ["gaming"]
    }
]
```

#### GET /api/users/{userId}

**Request:**

```bash
GET http://localhost:3000/api/users/{userID}
```

**Response (200 OK):**

```json
{
    "id": "123",
    "username": "Name",
    "age": 20,
    "hobbies": ["education", "coding"]
}
```

#### POST /api/users

**Request:**

```bash
POST http://localhost:3000/api/users 
    {
        "username": "NewUser",
        "age": 22,
        "hobbies": ["cooking", "traveling"]
    }
```

**Response (201 Created):**

```json
{
    "username": "NewUser",
    "age": 22,
    "hobbies": ["cooking", "traveling"]
}
```

#### PUT /api/users/{userId}

**Request:**

```bash
PUT http://localhost:3000/api/users/{userID} 
    {
        "username": "UpdatedName",
        "age": 24,
        "hobbies": ["traveling"]
    }
```

**Response (200 OK):**

```json
{
    "id": "123",
    "username": "UpdatedName",
    "age": 24,
    "hobbies": ["traveling"]
}
```

#### DELETE /api/users/{userId}

**Request:**

```bash
DELETE http://localhost:3000/api/users/{userID}
```

**Response (204 No Content)**

