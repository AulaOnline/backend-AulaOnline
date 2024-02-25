import express from 'express';
import CustomResponse from "../../core/model/customResponse";
import {User} from "../../core/entities/userEntitie";
import {AppDataSource} from "../../app";
import UserService from "./loginService";
const router = express.Router();
const bcrypt = require('bcrypt');
interface UserCredentials {
  username: string,
  password: string
}

router.get('/getUsers', async (req, res) => {
    try {
        const NewUserService = new UserService();
        const AllUsers: User[] = await NewUserService.getUsers();
        return res.status(200).json(new CustomResponse(200, "Busca Feita Com Sucesso", AllUsers));
    } catch (error) {
        console.error("Erro ao buscar", error);
        return res.status(500).json(new CustomResponse(500, "Erro Interno Do Servidor", null));
    }
});

router.post('/register', async (req, res) => {
    const NewUserService:UserService = new UserService();
    const { username, password }: UserCredentials = req.body;
    try {
        const hash: string = await bcrypt.hash(password, 13);
        const NewUser: User = new User();
        NewUser.username = username;
        NewUser.password = hash;
        const userRegistrado: User = await NewUserService.registerUser(NewUser);
        return res.status(200).json(new CustomResponse(200, "Usuário registrado com sucesso", userRegistrado));
    } catch (error) {
        console.error("Erro ao registrar usuário:", error);
        return res.status(500).json(new CustomResponse(500, "Internal Server Error", null));
    }
});
export default router;
