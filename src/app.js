import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

import { signUp, signIn, getCredentials } from './controller/authController.js';
import { newIn } from './controller/newInController.js';
import { getRecords } from './controller/recordsController.js';

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;
mongoClient.connect(() => {
  db = mongoClient.db("db_my_wallet");
});

const app = express();
app.use(express.json());
app.use(cors());

app.post("/sign-up", signUp);
app.post("/sign-in", signIn);
app.get("/meus-dados", getCredentials);
app.post("/newIn", newIn);
app.get("/getRecords", getRecords);



app.listen(process.env.PORT, () => {
  console.log('Server is listening on port 5000.');
});
