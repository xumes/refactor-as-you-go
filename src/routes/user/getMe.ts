import { Router, Request, Response } from 'express'
import { UserNotFoundError } from '../../errors/userNotFoundError';
import { userModel, UserRepository } from '../../repository';
import { UserController } from '../../services/user/UserController';

const getMe: Router = Router();
const userRepository: UserRepository = new UserRepository()
const controller = new UserController(userRepository)

getMe.use('/', (req: Request, res: Response): void => {
    const myId = 1

    try {
        const user: userModel = controller.getById(myId)
        res.json({user})
    } catch (error) {
        res.status(500).json({success: false})        
    }
})

export default getMe