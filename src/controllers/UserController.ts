import express, { Request, Response } from 'express';
import UserService from '../services/UserService';

class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async createUser(req: Request, res: Response) {
    try {
      const user = req.body;
      const createdUser = await this.userService.createUser(user);
      res.status(201).send(createdUser);
    } catch (error: any) {
      if(error.message === 'Missing required fields: name, email, or age.' || error.message === 'Age must be a non-negative number.'){
        res.status(400).send({ message: error.message });
      }else{
        res.status(500).send({ message: 'Internal Server Error' });
      }
    }
  }

  async getUser(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const user = await this.userService.getUser(id);
      if (!user) {
        res.status(404).send({ message: 'User not found' });
      } else {
        res.send(user);
      }
    } catch (error: any) {
        if (error.message === 'Invalid ObjectId') {
          res.status(400).send({ message: 'Invalid ObjectId' });
        } else {
          res.status(500).send({ message: 'Internal Server Error' });
        }
      }
  }

  async getUsers(req: Request, res: Response) {
    try {
      const users = await this.userService.getUsers();
      res.send(users);
    } catch (error) {
      res.status(500).send({ message: 'Internal Server Error' });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const user = req.body;
      const updatedUser = await this.userService.updateUser(id, user);
      if (!updatedUser) {
        res.status(404).send({ message: 'User not found' });
      } else {
        res.send(updatedUser);
      }
    } catch (error: any) {
        if (error.message === 'Invalid ObjectId') {
          res.status(400).send({ message: 'Invalid ObjectId' });
        } else {
          res.status(500).send({ message: 'Internal Server Error' });
        }
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const deleted = await this.userService.deleteUser(id);
      if (!deleted) {
        res.status(404).send({ message: 'User not found' });
      } else {
        res.status(204).send();
      }
    } catch (error: any) {
        if (error.message === 'Invalid ObjectId') {
          res.status(400).send({ message: 'Invalid ObjectId' });
        } else {
          res.status(500).send({ message: 'Internal Server Error' });
        }
    }
  }
}

export default UserController;