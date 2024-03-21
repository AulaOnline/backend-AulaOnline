import {CustomError} from "./UserErrors";

function isValidCharacters(string: string): boolean {
    //devolve falso se a string nao tiver pelo menos uma letras ou no maximo numeros, nenhum outro caractere eh valido
    return /^(?=.*[a-zA-Z])[a-zA-Z0-9]+$/.test(string)
}
function isValidPassword(string: string): boolean {
    return /\d/.test(string);
}

function isValidEmail(string: string): boolean {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/.test(string);
}
function isOnlyNumbers(string: string): boolean {
    return /^\d+$/.test(string);
}

export class UserValidations {
    public static async isValidUser(email: string, username: string, password: string): Promise<void> {
        this.validateEmail(email);
        this.validateUsername(username);
        this.validatePassword(password);
    }
    public static async isValidID(id: string): Promise<void> {
        this.isOnlyNumbers(id);
        this.isNegative(id);
    }
    public static async isValidUsername(username: string): Promise<void> {
        this.validateUsername(username);
    }

    private static validateUsername(username: string): void {
        if (username.length < 3 || username.length > 20 || !isValidCharacters(username)) {
            throw CustomError.UsuarioJaExistente(400, "Nome do Usuario Invalido");
        }

        if (!isValidCharacters(username)) {
            throw CustomError.UsernameInvalido(400, "Formato Do Nome do Usuario Invalido");
        }
    }

    private static validatePassword(password: string): void {
        console.log(password.length);
        if (password.length <= 3 || password.length > 20) {
            throw CustomError.SenhaInvalida(400, "Tamanho Da Senha Invalido");
        }

        if (!isValidPassword(password)) {
            throw CustomError.SenhaInvalida(400, "A senha deve ter Pelo menos um Numero");
        }
    }

    private static validateEmail(email: string): void {
        if (email.length < 2 || !isValidEmail(email)) {
            throw CustomError.EmailInvalido(400, "Email do Usuario Eh Invalido");
        }
    }

    private static isOnlyNumbers(id: string): void {
        if (!isOnlyNumbers(id))
            throw CustomError.IDInvalido(400, "ID do Usuario Nao Pode Ser nao Numerico");
    }
    private static isNegative(id: string): void {
        const NumberID = parseInt(id)
        if (NumberID <= 0)
            throw CustomError.IDInvalido(400, "ID do Usuario Nao Pode Ser Negativo");
    }
}

