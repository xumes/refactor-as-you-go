import { Router, Request, Response } from 'express'
import { InvalidParamError } from '../../errors/InvalidParamError';
import { UserNotFoundError } from '../../errors/userNotFoundError';
import { userModel, UserRepository } from '../../repository';
import { UserController } from '../../services/user/UserController';

const get: Router = Router();
const userRepository = new UserRepository()
const controller = new UserController(userRepository)

get.use('/user/id/:id', (req: Request, res: Response): void => {
    const { id } = req.params

    try {
        const user: userModel = controller.getById(parseInt(id))
        res.json({user})
    } catch (error) {
        if (error instanceof UserNotFoundError) {
            res.status(404).send({success: false})
            return
        }
        if (error instanceof InvalidParamError) {
            res.status(400).send({success: false})
            return
        }

        res.status(500).json({success: false})        
    }
})

export default get