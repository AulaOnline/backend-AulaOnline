import {
    AtributoInvalido,
    SenhaInvalida,
    UsernameInvalido,
} from "./UserErrors";


export class UserValidations {
    public static async isValidUser(email: string, username: string, password: string): Promise<void> {
        if (username.length === 0)
            throw new UsernameInvalido(404, "Nome Do Usuario Invalido");

        if (password.length === 0)
            throw new SenhaInvalida(404,"Senha do Usuario Nao Pode Ser Nula")
    }

    public static async isValidAttribute(attribute: string):Promise<void>{
        if (!/^[a-zA-Z]+$/.test(attribute)) {
            throw new AtributoInvalido(404, "O atributo " + attribute + " nao pode ser numerico");
        }
        if(attribute.toLowerCase().toString() != "email" && attribute.toLowerCase().toString() != "username"){
            throw new AtributoInvalido(404, "Atributo " + attribute + " Nao eh valido");
        }
    }

}