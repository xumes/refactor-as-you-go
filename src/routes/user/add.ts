import { Router, Request, Response } from 'express'
import { userModel, UserRepository } from '../../repository';
import { UserController } from '../../services/user/UserController';

const add: Router = Router();
const userRepository = new UserRepository()
const controller = new UserController(userRepository)

add.use('/', (req: Request, res: Response) => {
    const { name } = req.body
    if (!name) {
        res.status(400).json({success: false})
        return
    }
    const newUser: userModel = controller.add(name)
    res.json({newUser})
})

export default add