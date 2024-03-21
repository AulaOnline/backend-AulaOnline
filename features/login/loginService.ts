import {User} from "../../core/entities/userEntitie";
import {AppDataSource} from "../../app";
import {CustomError} from "./validation/UserErrors";
import CustomResponse from "../../core/model/customResponse";

const bcrypt = require('bcrypt');
export default class UserService {
    async getUsers(): Promise<User[]> {
        return await User.find();
    }

    async registerUser(email: string, username: string, password: string): Promise<User> {
        const hash: string = await bcrypt.hash(password, 13);
        const NewUser: User = new User();
        NewUser.username = username;
        NewUser.password = hash;
        NewUser.email = email;
        try {
            return await AppDataSource.manager.save(NewUser);
        } catch (error) {
            throw CustomError.ErroDeEscrita(500, "Erro ao Registrar Inforacao No Banco De Dados")}
    }
    async getUserByID(userID: string): Promise<User> {
        const id: number = parseInt(userID, 10);
        const user: User | null = await User.findOne({ where: {id: id} });
        if (user === null)
            throw CustomError.IDInvalido(404, "ID Nao Registrado");
        user.password = "";
        return user;
    }
    async getUserIDByUsername(username: string) {
        const user = await User.findOne({ where: { username: username } });
        if (user == null)
            throw CustomError.UsernameInvalido(404, "Nao Existem Usuarios Com Esse Username")
        return {id: user.id};
    }

    async getUserAttributeByID(userID: string, attribute: string){
        const id: number = parseInt(userID, 10);
        try {
            const user = await User.findOne({where: {id:id}})
            if (!user)
                throw CustomError.IDInvalido(404, "ID nao cadastrado no sistema");

            switch (attribute.toLowerCase()){
                case "email":
                    return user.email;
                case "username":
                    return user.username;
                default:
                    throw CustomError.AtributoInvalido(404,"Atributo Invalido");
            }
        }catch (error){
            return error;
        }
    }
    async isValidCredentials(user: User): Promise<boolean> {
        try {
            const existingUser: User | null = await User.findOne({where: {username: user.username}});
            if (!existingUser) {
                return false;
            }
            return await bcrypt.compare(user.password, existingUser.password);
        } catch (error) {
            console.error("Erro ao verificar credenciais do usuário:", error);
            throw new Error("Erro ao verificar credenciais do usuário");
        }
    }
}
