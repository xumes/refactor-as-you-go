import { Router, Request, Response } from 'express'
import { userModel, UserRepository } from '../../repository';
import { UserController } from '../../services/user/UserController';

const getAll: Router = Router();
const userRepository = new UserRepository()
const controller = new UserController(userRepository)

getAll.use('/', (req: Request, res: Response): void => {
    const users: userModel[] = controller.getAll()

    if (!users) {
        res.status(204)
        return
    }
    res.json({users})
})

export default getAll