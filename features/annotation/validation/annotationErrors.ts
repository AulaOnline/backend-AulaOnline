export class CustomNotationError extends Error {
    constructor(public type: number, message: string) {
        super(message);
        this.type = type;
    }
    static campoVazio(type: number,message: string) {
        return new CustomNotationError(type, message);
    }
    static campoNaoPodeSerSomenteNumerico(type: number, message: string){
        return new CustomNotationError(type, message);
    }


    static campoMuitoGrande(type: number, message: string) {
        return new CustomNotationError(type, message);
    }

    static erroInterno(type: number, message: string) {
        return new CustomNotationError(type, message);
    }
}
