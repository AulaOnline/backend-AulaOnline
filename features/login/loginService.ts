import {User} from "../../core/entities/userEntitie";
import {AppDataSource} from "../../app";
import {CustomUserError} from "./validation/UserErrors";
import CustomResponse from "../../core/model/customResponse";
import {createTokens} from "../../core/infra/JWT";

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
            throw CustomUserError.ErroDeEscrita(500, "Erro ao Registrar Inforacao No Banco De Dados")}
    }
    async getUserByID(userID: string): Promise<User> {
        const id: number = parseInt(userID, 10);
        const user: User | null = await User.findOne({ where: {id: id} });
        if (user === null)
            throw CustomUserError.IDInvalido(404, "ID Nao Registrado");
        user.password = "";
        return user;
    }
    async getUserIDByUsername(username: string) {
        const user = await User.findOne({ where: { username: username } });
        if (user == null)
            throw CustomUserError.UsernameInvalido(404, "Nao Existem Usuarios Com Esse Username")
        return {id: user.id};
    }

    async getUserAttributeByID(userID: string, attribute: string){
        const id: number = parseInt(userID, 10);
            const user = await User.findOne({where: {id:id}})
            if (user == null)
                throw CustomUserError.IDInvalido(404, "ID nao cadastrado no sistema");
            if (attribute.toLowerCase() === "username")
                return user.username;
            if (attribute.toLowerCase() === "email")
                return user.email;
    }
    async isValidCredentials(username: string, password: string) {
        const user: User = new User();
        user.username = username;
        user.password = password;

        const existingUser: User | null = await User.findOne({where: {username: user.username}});
        if (!existingUser)
            throw CustomUserError.IDInvalido(404, "Credencias Incorretas");

        if(!await bcrypt.compare(user.password, existingUser.password))
            throw CustomUserError.SenhaInvalida(404, "Credencias Incorretas")
        let token: string;
        if (await bcrypt.compare(user.password, existingUser.password)) {
            token = createTokens(existingUser)
            return token;
        }
    }
}
