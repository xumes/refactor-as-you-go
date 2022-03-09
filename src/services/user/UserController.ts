import { userModel, UserRepository } from "../../repository";

export class UserController {
    repository: UserRepository

    constructor(userRepository: UserRepository) {
        this.repository = userRepository
    }

    add(name: string): userModel {
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
        const user = this.repository.get(id)

        if (!user) {
            throw new Error('User Not Found')
            return
        }

        return user
    }

    deleteById(id: number): void {
        const success = this.repository.delete(id)

        if (!success) {
            throw new Error('User Not Found')
            return
        }
    }

    updateById(id: number, name: string): userModel {
        const updatedUser = this.repository.update(id, name)

        if (!updatedUser){
            throw new Error('User Not Found')
            return
        }

        return updatedUser
    }
}