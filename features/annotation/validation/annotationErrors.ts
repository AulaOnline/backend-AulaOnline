// validation/annotationErrors.ts

export class AnnotationNaoExiste extends Error {
    constructor(public type: number, message: string) {
        super(message);
        this.type = type;
    }

}
