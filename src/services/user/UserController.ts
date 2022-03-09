import { ForbiddenError } from "../../errors/ForbiddenError";
import { InvalidParamError } from "../../errors/InvalidParamError";
import { UserNotFoundError } from "../../errors/userNotFoundError";
import { userModel, UserRepository } from "../../repository";
export class UserController {
    repository: UserRepository

    constructor(userRepository: UserRepository) {
        this.repository = userRepository
    }

    add(name: string): userModel {
        if (!name) {
            throw new InvalidParamError
            return
        }

        const newUserId = this.repository.add(name)

        return {
            name,
            id: newUserId
        }
    }

    getAll(): userModel[] {
        return this.repository.getAll()
    }

    getById(id: number): userModel {
        if (isNaN(+id)) {
            throw new InvalidParamError
            return
        }

        const user = this.repository.get(id)

        if (!user) {
            throw new UserNotFoundError
            return
        }

        return user
    }

    deleteById(id: number): void {
        if (isNaN(+id)) {
            throw new InvalidParamError
            return
        }

        const userLoggedId = 1
        if ( id === userLoggedId) {
            throw new ForbiddenError
        }

        const success = this.repository.delete(id)

        if (!success) {
            throw new UserNotFoundError
            return
        }
    }

    updateById(id: number, name: string): userModel {
        if (isNaN(+id)) {
            throw new InvalidParamError
            return
        }

        if (!name) {
            throw new InvalidParamError
            return
        }

        const updatedUser = this.repository.update(id, name)

        if (!updatedUser){
            throw new UserNotFoundError
            return
        }

        return updatedUser
    }
}