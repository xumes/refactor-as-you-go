export class ForbiddenError extends Error {
    constructor() {
        super('Forbidden action')
        this.name = 'ForbiddenError'
    }
}