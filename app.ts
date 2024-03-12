import express from 'express'
import cors from 'cors'
const PORT = process.env.PORT || 3001
const HOSTNAME = process.env.HOSTNAME || 'http://localhost'
const app = express()
import customResponse from './core/model/customResponse';

import loginController from './features/login/loginController';
import historicController from './features/historic/historicController';


import "reflect-metadata";
import { DataSource } from "typeorm";


import { User } from "./core/entities/userEntitie";
import { Historic } from "./core/entities/historicEntitie";
import { Video } from './core/entities/videoEntitie';
import { Annotation } from './core/entities/annotationEntitie';

const cookieParser = require('cookie-parser');
import dotenv from 'dotenv';
dotenv.config();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;


export const AppDataSource = new DataSource({
    type: "mysql",
    database: "AulaOnline-Database",
    username: dbUser,
    password: dbPassword,
    //1º uso mudar para true:
    synchronize: false,
    entities: [User, Historic, Video, Annotation]
})

AppDataSource.initialize()
    .then(() => {
        console.log("Conexao estabelecida");
    })
    .catch((error) => console.log(error))

app.use(cookieParser());
app.use(express.urlencoded({ extended: true, }))
app.use(express.json());

app.get('/', (req, res) => { res.send('Hello World!') })

app.use(cors({
    origin: ['http://localhost:3000']
}))

//Adcione suas rotas, senão apesar de criadas não vão ser usadas...
app.use('/login', loginController);
app.use('/historic', historicController);


app.use((req, res) => {
    return res.status(404).json(new customResponse(404, "Erro 404 Detectado", null));
})

app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso ${HOSTNAME}:${PORT}`)
})


