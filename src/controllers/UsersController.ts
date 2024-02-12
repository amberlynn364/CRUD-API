import { type IncomingMessage, type ServerResponse } from 'http';
import { v4 as uuidv4, validate } from 'uuid';
import { ContentType, ErrorMessages, StatusCodes, type User } from '../types/types';

export default class UsersController {
  private readonly inMemoryUsers: User[] = [];

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, class-methods-use-this
  getWelcomeMessage(req: IncomingMessage, res: ServerResponse) {
    try {
      res.writeHead(StatusCodes.Success, { 'Content-type': ContentType.JSON });
      res.end('Welcome to the server!');
    } catch (error) {
      console.error('Error processing request:', error);
      res.writeHead(StatusCodes.InternalServerError, { 'Content-Type': ContentType.JSON });
      res.end(JSON.stringify({ error: ErrorMessages.InternalServerError }));
    }
  }

  createUser(req: IncomingMessage, res: ServerResponse): void {
    let data = '';

    req.on('data', (chunk) => {
      data += chunk;
    });

    req.on('end', () => {
      try {
        const body: User = JSON.parse(data);

        if (!body.username || !body.age) {
          res.writeHead(StatusCodes.BadRequest, { 'Content-Type': ContentType.JSON });
          res.end(JSON.stringify({ error: ErrorMessages.RequiredFields }));
          return;
        }

        const id = uuidv4();
        const user: User = {
          id,
          username: body.username,
          age: body.age,
          hobbies: body.hobbies || []
        };

        this.inMemoryUsers.push(user);

        res.writeHead(StatusCodes.Created, { 'Content-Type': ContentType.JSON });
        res.end(JSON.stringify(user));
      } catch (error) {
        console.error('Error processing request:', error);
        res.writeHead(StatusCodes.InternalServerError, { 'Content-Type': ContentType.JSON });
        res.end(JSON.stringify({ error: ErrorMessages.InternalServerError }));
      }
    });
  }

  getUsers(req: IncomingMessage, res: ServerResponse): void {
    try {
      const users = this.inMemoryUsers;
      res.writeHead(StatusCodes.Success, { 'Content-type': ContentType.JSON });
      res.end(JSON.stringify(users));
    } catch (error) {
      console.error('Error processing request:', error);
      res.writeHead(StatusCodes.InternalServerError, { 'Content-Type': ContentType.JSON });
      res.end(JSON.stringify({ error: ErrorMessages.InternalServerError }));
    }
  }

  getUserById(req: IncomingMessage, res: ServerResponse, userId: string | undefined): void {
    try {
      if (!userId || !validate(userId)) {
        res.writeHead(StatusCodes.BadRequest, { 'Content-Type': ContentType.JSON });
        res.end(JSON.stringify({ error: ErrorMessages.InvalidUserID }));
        return;
      }
      const user = this.inMemoryUsers.find((u) => u.id === userId);

      if (user) {
        res.writeHead(StatusCodes.Success, { 'Content-Type': ContentType.JSON });
        res.end(JSON.stringify(user));
      } else {
        res.writeHead(StatusCodes.NotFound, { 'Content-Type': ContentType.JSON });
        res.end(JSON.stringify({ error: ErrorMessages.UserNotFound }));
      }
    } catch (error) {
      console.error('Error processing request:', error);
      res.writeHead(StatusCodes.InternalServerError, { 'Content-Type': ContentType.JSON });
      res.end(JSON.stringify({ error: ErrorMessages.InternalServerError }));
    }
  }

  updateUser(req: IncomingMessage, res: ServerResponse, userId: string | undefined): void {
    let data = '';

    req.on('data', (chunk) => {
      data += chunk;
    });

    req.on('end', () => {
      try {
        if (!userId || !validate(userId)) {
          res.writeHead(StatusCodes.BadRequest, { 'Content-Type': ContentType.JSON });
          res.end(JSON.stringify({ error: ErrorMessages.InvalidUserID }));
          return;
        }

        const body = JSON.parse(data);
        const index = this.inMemoryUsers.findIndex((u) => u.id === userId);

        if (index !== -1) {
          const updatedUser: User = {
            id: userId,
            username: body.username || this.inMemoryUsers[index].username,
            age: body.age || this.inMemoryUsers[index].age,
            hobbies: body.hobbies || this.inMemoryUsers[index].hobbies
          };

          this.inMemoryUsers[index] = updatedUser;

          res.writeHead(StatusCodes.Success, { 'Content-Type': ContentType.JSON });
          res.end(JSON.stringify(updatedUser));
        } else {
          res.writeHead(StatusCodes.NotFound, { 'Content-Type': ContentType.JSON });
          res.end(JSON.stringify({ error: ErrorMessages.UserNotFound }));
        }
      } catch (error) {
        console.error('Error processing request:', error);
        res.writeHead(StatusCodes.InternalServerError, { 'Content-Type': ContentType.JSON });
        res.end(JSON.stringify({ error: ErrorMessages.InternalServerError }));
      }
    });
  }

  deleteUser(req: IncomingMessage, res: ServerResponse, userId: string | undefined): void {
    try {
      if (!userId || !validate(userId)) {
        res.writeHead(StatusCodes.BadRequest, { 'Content-Type': ContentType.JSON });
        res.end(JSON.stringify({ error: ErrorMessages.InvalidUserID }));
        return;
      }

      const index = this.inMemoryUsers.findIndex((u) => u.id === userId);

      if (index !== -1) {
        this.inMemoryUsers.splice(index, 1);
        res.writeHead(StatusCodes.NoContent);
        res.end();
      } else {
        res.writeHead(StatusCodes.NotFound, { 'Content-Type': ContentType.JSON });
        res.end(JSON.stringify({ error: ErrorMessages.UserNotFound }));
      }
    } catch (error) {
      console.error('Error processing request:', error);
      res.writeHead(StatusCodes.InternalServerError, { 'Content-Type': ContentType.JSON });
      res.end(JSON.stringify({ error: ErrorMessages.InternalServerError }));
    }
  }
}
