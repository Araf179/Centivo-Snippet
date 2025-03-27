import express, { Request, Response } from 'express';
import { MongoClient } from 'mongodb';
import UserController from './controllers/UserController';
import UserService from './services/UserService';

const app = express();
app.use(express.json());

const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'test';
const collectionName = 'users';

let client: MongoClient;
let db: any;
let collection: any;

async function connectToMongo() {
    client = new MongoClient(mongoUrl);
    await client.connect();
    db = client.db(dbName);
    collection = db.collection(collectionName);
  }
  
  async function startServer() {
    await connectToMongo(); 
    const userService = new UserService(client, db, collection);
    const userController = new UserController(userService);
  
    app.post('/users', (req, res) => userController.createUser(req, res));
    app.get('/users/:id', (req, res) => userController.getUser(req, res));
    app.get('/users', (req, res) => userController.getUsers(req, res));
    app.put('/users/:id', (req, res) => userController.updateUser(req, res));
    app.delete('/users/:id', (req, res) => userController.deleteUser(req, res));
  
    app.listen(3000, () => {
      console.log('Server listening on port 3000');
    });
  }
  
  startServer();