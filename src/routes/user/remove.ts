import { Router, Request, Response } from 'express'
import { ForbiddenError } from '../../errors/ForbiddenError';
import { InvalidParamError } from '../../errors/InvalidParamError';
import { UserNotFoundError } from '../../errors/userNotFoundError';
import { userModel, UserRepository } from '../../repository';
import { UserController } from '../../services/user/UserController';

const remove: Router = Router();
const userRepository = new UserRepository()
const controller = new UserController(userRepository)

remove.use('/user/id/:id', (req: Request, res: Response): void => {
    const { id } = req.params

    try {
        controller.deleteById(parseInt(id))
        res.json({success: true})
    } catch (error) {
        if (error instanceof UserNotFoundError) {
            res.status(404).send({success: false})
            return
        }
        if (error instanceof ForbiddenError) {
            res.status(403).send({success: false})
            return
        }
        if (error instanceof InvalidParamError) {
            res.status(400).send({success: false})
            return
        }

        res.status(500).json({success: false})        
    }
})

export default remove
