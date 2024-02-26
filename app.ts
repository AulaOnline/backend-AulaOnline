import express from 'express'
import cors from 'cors'
const PORT = process.env.PORT || 3000
const HOSTNAME = process.env.HOSTNAME || 'http://localhost'
const app = express()
import customResponse from './core/model/customResponse';
import loginController from './features/login/loginController';
import "reflect-metadata";
import {DataSource} from "typeorm";
import {User} from "./core/entities/userEntitie";
const cookieParser =  require('cookie-parser');

export const AppDataSource = new DataSource({
    type: "mysql",
    database: "AulaOnline-Database",
    username: "root",
    password: "",
    synchronize: false,
    entities: [User]
})

AppDataSource.initialize()
    .then(() => {
        console.log("Conexao estabelecida");
    })
    .catch((error) => console.log(error))

app.use(cookieParser());
app.use(express.urlencoded({extended: true,}))
app.use(express.json());

app.get('/', (req, res) => {res.send('Hello World!')})

app.use(cors({
    origin: ['http://localhost:3000']
}))

app.use('/login', loginController);

app.use((req, res) => {
    return res.status(404).json(new customResponse(404, "Erro 404 Detectado", null));
})

app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso ${HOSTNAME}:${PORT}`)
})
