import express from 'express';
import CustomResponse from "../../core/model/customResponse";
import {User} from "../../core/entities/userEntitie";
import UserService from "./loginService";
import {UserValidations} from "./validation/UserValidations";
import {isTokenValid } from '../../core/infra/JWT';
const router = express.Router();
interface UserCredentials {
  id: number,
  email: string;
  username: string,
  password: string
}

const NewUserService:UserService = new UserService();

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
router.get('/getUsers', async (req, res) => {
    try {
        const AllUsers: User[] = await NewUserService.getUsers();
        return res.status(200).json(new CustomResponse(200, "Busca Feita Com Sucesso", AllUsers));
    } catch (error: Error | any) {
        return res.status(error.type).json(new CustomResponse(error.type, error.message, null));
    }
});
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
        await UserValidations.isValidAtributte(userID, userAttribute);
        const valorDoAtributo = await NewUserService.getUserAttributeByID(userID, userAttribute);
        return res.status(200).json(new CustomResponse(200, "Atributo encontrado com sucesso", valorDoAtributo))
    } catch (error: Error | any) {
        return res.status(error.type).json(new CustomResponse(error.type, error.message, null));
    }
})



router.post('/checkCredentials', async (req, res) => {
    try{
        const {username, password } = req.body;
        await UserValidations.isValidCredentials(username,password)
        const token = await NewUserService.isValidCredentials(username, password);
        return res.status(200).json(new CustomResponse(200, "Credenciais Corretas", {token : token}));
    } catch (error: Error | any){
        return res.status(error.type).json(new CustomResponse(error.type, error.message, null));
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
