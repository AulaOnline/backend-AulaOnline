import express from 'express';
import CustomResponse from "../../core/model/customResponse";
import {User} from "../../core/entities/userEntitie";
import UserService from "./loginService";
const router = express.Router();
const bcrypt = require('bcrypt');
interface UserCredentials {
  id: number,
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
router.get('/userById/:id', async (req, res) => {
    const NewUserService: UserService = new UserService();
    const userID : string = req.params.id;
    try {
        const user: User = await NewUserService.getUserByID(userID);
        return res.status(200).json( new CustomResponse(200, "Usuario Encontrado", user));
    }
    catch (error){
        console.error("Erro ao Buscar Usuario", error);
        return res.status(500).json( new CustomResponse(500, "Internar Server Error", null));
    }
})
router.post('/checkCredentials', async (req, res) => {
    try{
        const {username, password } = req.body;
        const user: User = new User();
        user.username = username;
        user.password = password;
        const NewUserService: UserService = new UserService();
        if (await NewUserService.isValidCredentials(user)){
            return res.status(200).json(new CustomResponse(200, "Credenciais Corretas", null));
        }
        else
            return res.status(400).json(new CustomResponse(400, "Credencias Inorretas", null));

    } catch (err){

    }
});
export default router;
