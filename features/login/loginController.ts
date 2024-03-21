import express from 'express';
import CustomResponse from "../../core/model/customResponse";
import {User} from "../../core/entities/userEntitie";
import UserService from "./loginService";
import {UserValidations} from "./validation/UserValidations";
import { createTokens, isTokenValid } from '../../core/infra/JWT';
const router = express.Router();
const bcrypt = require('bcrypt');
interface UserCredentials {
  id: number,
  email: string;
  username: string,
  password: string
}

const NewUserService:UserService = new UserService();

//100%
router.post('/createUser', async (req, res) => {
    const { email, username, password }: UserCredentials = req.body;
    try {
        await UserValidations.isValidUser(email, username, password);
        const userRegistrado: User = await NewUserService.registerUser(email, username, password);
        userRegistrado.password = "";
        return res.status(200).json(new CustomResponse(200, "Usuário registrado com sucesso", userRegistrado));
    } catch (error: Error | any) {
        return res.status(error.type).json(new CustomResponse(error.type, error.message, error));
    }
});
//100%
router.get('/getUsers', async (req, res) => {
    try {
        const AllUsers: User[] = await NewUserService.getUsers();
        return res.status(200).json(new CustomResponse(200, "Busca Feita Com Sucesso", AllUsers));
    } catch (error: Error | any) {
        return res.status(error.type).json(new CustomResponse(error.type, error.message, null));
    }
});
//100%
router.get('/getUserById/:userID', async (req, res) => {
    const userID : string = req.params.userID;
    try {
        await UserValidations.isValidID(userID);
        const user: User | null = await NewUserService.getUserByID(userID);
        return res.status(200).json( new CustomResponse(200, "Usuario Encontrado", user));
    }
    catch (error: Error | any){
        return res.status(error.type).json( new CustomResponse(error.type, error.message, null));
    }
})

//100%
router.get('/getUserID/:username', async (req, res) => {
    const username = req.params.username;
    try {
        await UserValidations.isValidUsername(username)
        const userID = await NewUserService.getUserIDByUsername(username);
        return res.status(200).json( new CustomResponse(200, "Usuario Encontrado", userID));
    } catch (error: Error | any){
        return res.status(error.type).json(new CustomResponse(error.type, error.message, null));
    }
});

router.get('/getUserAttributeByID/:userID', async (req, res) => {
    const userAttribute: string = req.body.attribute;
    const userID: string = req.params.userID;
    try {
        const valorDoAtributo = await NewUserService.getUserAttributeByID(userID, userAttribute);
        return res.status(200).json(new CustomResponse(200, "Atributo encontrado com sucesso", valorDoAtributo))
    } catch (error: Error | any){
        if (error.type === 404)
            return res.status(404).json(new CustomResponse(404, error.message, error));
        else
            return res.status(500).json(new CustomResponse(500, "Internal Server Error", error))
    }
})
router.post('/checkCredentials', async (req, res) => {
    try{
        const {username, password } = req.body;
        const user: User = new User();
        user.username = username;
        user.password = password;
        if (await NewUserService.isValidCredentials(user)){
            const token = createTokens(user)
            return res.status(200).json(new CustomResponse(200, "Credenciais Corretas", {token : token}));
        }
        else
            return res.status(400).json(new CustomResponse(400, "Credencias Inorretas", null));

    } catch (err){
    }
});

router.post('/verificar-token', (req, res) => {
    const token = req.body.token; // Acessa o token no corpo da requisição

    if (!token) {
        return res.status(401).json({ success: false, message: 'Token não fornecido' });
    }

    const result = isTokenValid(token);

    if (result.valid) {
        return res.status(200).json({ success: true, message: 'Token válido', decoded: result.decoded });
    } else {
        return res.status(403).json({ success: false, message: 'Token inválido' });
    }
});

export default router;
