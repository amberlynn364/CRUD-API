/* eslint-disable @typescript-eslint/unbound-method */
import { type IncomingMessage, type ServerResponse, createServer } from 'http';
// import { ContentType, ErrorMessages, StatusCodes } from './types/types';
import UsersController from './controllers/UsersController';

const userController = new UsersController();

// type RouteHandlers = Record<
//   string,
//   (req: IncomingMessage, res: ServerResponse<IncomingMessage>, userId?: string | undefined) => void
// >;

// const routes: RouteHandlers = {
//   'GET/': userController.getWelcomeMessage,
//   'GET/users': userController.getUsers,
//   'POST/users': userController.createUser,
//   'GET/users/': userController.getUserById,
//   'PUT/users/': userController.updateUser,
//   'DELETE/users/': userController.deleteUser
// };

// const server = createServer((req: IncomingMessage, res: ServerResponse) => {
// const { url, method } = req;
// const routeKey = `${method}${url}` in routes ? `${method}${url}` : '';

// const routeHandler = routes[routeKey];

// if (routeHandler) {
//   if (routeKey.includes('users/') && routeKey !== 'GET/users/') {
//     const userId = url?.split('/').pop() ?? '';
//     routeHandler.call(userController, req, res, userId);
//   } else {
//     routeHandler.call(userController, req, res);
//   }
// } else {
//   res.writeHead(StatusCodes.NotFound, { 'Content-Type': ContentType.JSON });
//   res.end(JSON.stringify({ error: ErrorMessages.NotFound }));
// }
// });
const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  const { url, method } = req;

  if (method === 'POST' && (url === '/users' || url === '/users/')) {
    userController.createUser(req, res);
  } else if (method === 'GET' && (url === '/users' || url === '/users/')) {
    userController.getUsers(req, res);
  } else if (method === 'GET' && url === '/') {
    userController.getWelcomeMessage(req, res);
  } else if (method === 'GET' && url?.startsWith('/users/')) {
    const userId = url.split('/').pop() ?? '';
    userController.getUserById(req, res, userId);
  } else if (method === 'PUT' && url?.startsWith('/users/')) {
    const userId = url.split('/').pop() ?? '';
    userController.updateUser(req, res, userId);
  } else if (method === 'DELETE' && url?.startsWith('/users/')) {
    const userId = url.split('/').pop() ?? '';
    userController.deleteUser(req, res, userId);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

export default server;
