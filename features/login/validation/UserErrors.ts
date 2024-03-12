export class UsernameInvalido extends Error {
    constructor(public type: number, message: string) {
        super(message);
        this.type = type;
    }
}
export class SenhaInvalida extends Error {
    constructor(public type:number, message: string) {super(message); this.type = type}
}
export class AtributoInvalido extends Error {
    constructor(public type:number, message: string) {super(message); this.type = type}
}
export class IDInvalido extends Error {
    constructor(public type:number, message: string) {super(message); this.type = type}
}
export class UsuarioJaExistente extends Error {
    constructor(public type:number, message: string) {super(message); this.type = type}
}
export class UsuarioNaoExiste extends Error {
    constructor(public type:number, message: string) {super(message); this.type = type}
}