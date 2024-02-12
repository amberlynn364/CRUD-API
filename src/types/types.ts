export interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

export enum StatusCodes {
  NotFound = 404,
  Success = 200,
  Created = 201,
  Accepted = 202,
  NoContent = 204,
  BadRequest = 400,
  InternalServerError = 500
}

export enum ContentType {
  JSON = 'application/json'
}

export enum ErrorMessages {
  RequiredFields = 'Username and age are required fields',
  UserNotFound = 'User not found',
  NotFound = 'Not found',
  InvalidUserID = 'Invalid userID format',
  InternalServerError = 'Internal Server Error'
}

export enum HTTPMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

export enum Urls {
  Users = '/users'
}
