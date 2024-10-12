import 'dotenv/config';
import express from "express";
import cors from 'cors';
import adicionarRota from './rotas.js';
import con from './repository/connection.js';

const servidor = express();
servidor.use(cors());
servidor.use(express.json());

adicionarRota(servidor);

servidor.listen(process.env.PORTA, () => console.log(`--> API rodando <--`));