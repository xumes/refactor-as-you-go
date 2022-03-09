export type userModel = {
    id: number,
    name: string
}

export interface userRepoInterface {
    add(name: string): number
    getAll(): userModel[]
    get(id: number): userModel | boolean
    delete(id: number): boolean
    update(id: number, name: string): userModel | boolean
}

export class UserRepository implements userRepoInterface {
    users: userModel[] = [{
        id: 1,
        name: 'Reginaldo'
    }]

    add(name: string): number {
        const nextId = this.users.length + 1
        const newUser = {
            id: nextId,
            name: name
        }
        this.users.push(newUser)

        return nextId
    }

    getAll(): userModel[] {
        return this.users
    }

    get(id: number): userModel | boolean {
        console.log("all users", this.users)
        console.log("my id", id)
        const found = this.users.find( user => user.id == id)
        console.log("found", found)
        if (!found ) {
            return false
        }

        return found
    }

    delete(id: number): boolean {
        const found = this.users.find( user => user.id == id)
        if (!found ) {
            return false
        }

        this.users = this.users.filter( user => user.id !== id)
        return true
    }

    update(id: number, name: string): userModel | boolean {
        const userFound = this.users.find( user => user.id == id)
        if (!userFound ) {
            return false
        }

        console.log("found", userFound)

        userFound.name = name

        return userFound
    }
}