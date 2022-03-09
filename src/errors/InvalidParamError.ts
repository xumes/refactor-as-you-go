export class InvalidParamError extends Error {
    constructor() {
        super('Invalid param')
        this.name = 'InvalidParamError'
    }
}