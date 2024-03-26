import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { User } from "./core/entities/userEntitie";
import { Video } from './core/entities/videoEntitie';
import { Annotation } from './core/entities/AnnotationEntitie';
import { Summary } from "./core/entities/summaryEntitie";
import customResponse from './core/model/customResponse';
import loginController from './features/login/loginController';
import videoController from './features/video/VideoController';
import aiController from "./features/AIgenerations/aiController";
import annotationController from "./features/annotation/annotationController";
const cookieParser = require('cookie-parser');
dotenv.config();

const app = express();
const PORT = process.env.PORT;
const USERNAME = process.env.DB_USER;
const HOSTNAME = process.env.HOSTNAME;
const PASSWORD = process.env.DB_PASSWORD;

export const AppDataSource = new DataSource({
    type: "mysql",
    database: "AulaOnline-Database",
    username: USERNAME,
    password: PASSWORD,
    synchronize: false,
    entities: [User, Video, Annotation, Summary]
});

AppDataSource.initialize()
    .then(() => {
        console.log("Conexão estabelecida");
    })
    .catch((error) => console.log(error));

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => { res.send('Hello World!') });

app.use(cors({
    origin: ['http://localhost:3000']
}));

app.use('/login', loginController);
app.use('/video', videoController);
app.use('/annotation', annotationController);
app.use('/generate', aiController);

app.use((req, res) => {
    return res.status(404).json(new customResponse(404, "Erro 404 Detectado", null));
});

app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso ${HOSTNAME}:${PORT}`);
});
