export class VideoNaoExiste extends Error {
    constructor(public type:number, message: string) {super(message); this.type = type}
}

export class LinkNaoExiste extends Error {
    constructor(public type:number, message: string) {super(message); this.type = type}
}

export class DuracaoVideoInvalida extends Error {
    constructor(public type:number, message: string) {super(message); this.type = type}
}

export class UsarioSemHistorico extends Error {
    constructor(public type:number, message: string) {super(message); this.type = type}
}