export class VideoNaoExiste extends Error {
    constructor(public type:number, message: string) {super(message); this.type = type}
}