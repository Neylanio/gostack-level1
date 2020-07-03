import { Request, Response } from 'express';
import createUser from './services/CreateUser';

export function helloWorld(request: Request, response: Response) {
  const user = createUser({
    email: 'neylaniogomes@gmail.com',
    password: '4546',
    techs: [
      "NodeJS",
      "ReactJS",
      "React Native",
      { title: "JSccript", experience: 100},
    ],
  });
  return response.json(user);
}