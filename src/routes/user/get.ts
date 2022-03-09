import { Router, Request, Response } from 'express'
import { userModel, UserRepository } from '../../repository';
import { UserController } from '../../services/user/UserController';

const get: Router = Router();
const userRepository = new UserRepository()
const controller = new UserController(userRepository)

get.use('/user/id/:id', (req: Request, res: Response): void => {
    const { id } = req.params

    if (isNaN(+id)) {
        res.status(400).json({success: false})
        return
    }

    const userId = parseInt(id)

    try {
        const user: userModel = controller.getById(userId)
        res.json({user})
    } catch (error) {
        res.status(404).send({success: false})
    }
})

export default get