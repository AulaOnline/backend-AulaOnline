export class CustomError extends Error {
    public type: number;

    constructor(type: number, message: string) {
        super(message);
        this.type = type;
    }

    static UsernameInvalido(type: number, message: string): CustomError {
        return new CustomError(type, message);
    }

    static SenhaInvalida(type: number, message: string): CustomError {
        return new CustomError(type, message);
    }

    static AtributoInvalido(type: number, message: string): CustomError {
        return new CustomError(type, message);
    }

    static IDInvalido(type: number, message: string): CustomError {
        return new CustomError(type, message);
    }

    static UsuarioJaExistente(type: number, message: string): CustomError {
        return new CustomError(type, message);
    }

    static UsuarioNaoExiste(type: number, message: string): CustomError {
        return new CustomError(type, message);
    }
    static EmailInvalido(type: number, message: string): CustomError {
        return new CustomError(type, message);
    }
    static ErroDeEscrita(type: number, message: string): CustomError {
        return new CustomError(type, message);
    }
}
