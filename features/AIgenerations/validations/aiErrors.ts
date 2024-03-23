export class CustomAIErrors extends Error {
    constructor(public type: number, message: string) {
        super(message);
        this.type = type;
    }

    static videoisToBigTogenerate(type: number, message: string) {
        return new CustomAIErrors(type, message);
    }

    static erroAoObterInformacoes(type: number, message: string) {
        return new CustomAIErrors(type, message);
    }

    static erroAoGerarQuestoes(type: number, message: string) {
        return new CustomAIErrors(type, message);
    }
}