import { LocalStorage } from 'node-localstorage'

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
    localStorage: LocalStorage
    
    constructor() {
        this.localStorage = new LocalStorage('./data')
        this.localStorage.setItem('users', JSON.stringify(this.users))
    }

    add(name: string): number {
        this.users = JSON.parse(this.localStorage.getItem('users'))
        const ids = this.users.map((user) => user.id)
        const nextId = Math.max(...ids) +1

        const newUser = {
            id: nextId,
            name: name
        }
        this.users.push(newUser)
        this.localStorage.setItem('users', JSON.stringify(this.users))

        return nextId
    }

    getAll(): userModel[] {
        this.users = JSON.parse(this.localStorage.getItem('users'))
        return this.users
    }

    get(id: number): userModel {
        this.users = JSON.parse(this.localStorage.getItem('users'))
        
        const found = this.users.find( user => user.id == id)

        if (!found ) {
            return
        }

        return found
    }

    delete(id: number): boolean {
        this.users = JSON.parse(this.localStorage.getItem('users'))

        const found = this.users.find( user => user.id == id)
        
        if (!found ) {
            return false
        }

        this.users = this.users.filter( user => user.id !== id)
        this.localStorage.setItem('users', JSON.stringify(this.users))

        return true
    }

    update(id: number, name: string): userModel {
        this.users = JSON.parse(this.localStorage.getItem('users'))

        const userFound = this.users.find( user => user.id == id)
        if (!userFound ) {
            return
        }

        userFound.name = name
        this.localStorage.setItem('users', JSON.stringify(this.users))

        return userFound
    }
}