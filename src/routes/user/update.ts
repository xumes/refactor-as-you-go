import { Router, Request, Response } from 'express'
import { InvalidParamError } from '../../errors/InvalidParamError';
import { UserNotFoundError } from '../../errors/userNotFoundError';
import { userModel, UserRepository } from '../../repository';
import { UserController } from '../../services/user/UserController';

const update: Router = Router();
const userRepository = new UserRepository()
const controller = new UserController(userRepository)

update.use('/user/id/:id', (req: Request, res: Response): void => {
    const { id } = req.params
    const { name } = req.body

    try {
        controller.updateById(parseInt(id), name)
        res.json({success: true})
    } catch (error) {
        if (error instanceof UserNotFoundError) {
            res.status(404).send({success: false})
            return
        }
        if (error instanceof InvalidParamError) {
            res.status(404).send({success: false})
            return
        }

        res.status(500).json({success: false})        
    }
})

export default update
