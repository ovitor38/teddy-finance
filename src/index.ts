import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json()); // Para analisar corpos de requisições em JSON

export default app;
