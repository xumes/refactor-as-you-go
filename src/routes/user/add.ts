import { Router, Request, Response } from 'express'
import { InvalidParamError } from '../../errors/InvalidParamError';
import { userModel, UserRepository } from '../../repository';
import { UserController } from '../../services/user/UserController';

const add: Router = Router();
const userRepository = new UserRepository()
const controller = new UserController(userRepository)

add.use('/', (req: Request, res: Response) => {
    const { name } = req.body

    try {
        const newUser: userModel = controller.add(name)
        res.json({newUser})
    } catch (error) {
        if (error instanceof InvalidParamError) {
            res.status(400).send({success: false})
            return
        }

        res.status(500).json({success: false})      }
})

export default add