import { Router, Request, Response } from 'express'
import { userModel, UserRepository } from '../../repository';
import { UserController } from '../../services/user/UserController';

const remove: Router = Router();
const userRepository = new UserRepository()
const controller = new UserController(userRepository)

remove.use('/user/id/:id', (req: Request, res: Response): void => {
    const { id } = req.params

    if (isNaN(+id)) {
        res.status(400).json({success: false})
        return
    }

    const userId = parseInt(id)

    try {
        controller.deleteById(parseInt(id))
        res.json({success: true})
    } catch (error) {
        res.status(404).send({success: false})
    }
})

export default remove
