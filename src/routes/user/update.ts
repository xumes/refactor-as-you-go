import { Router, Request, Response } from 'express'
import { userModel, UserRepository } from '../../repository';
import { UserController } from '../../services/user/UserController';

const update: Router = Router();
const userRepository = new UserRepository()
const controller = new UserController(userRepository)

update.use('/user/id/:id', (req: Request, res: Response): void => {
    const { id } = req.params

    if (isNaN(+id)) {
        res.status(400).json({success: false})
        return
    }

    const { name } = req.body

    if (!name) {
        res.status(400).json({success: false})
        return
    }

    const userId = parseInt(id)

    try {
        controller.updateById(parseInt(id), name)
        res.json({success: true})
    } catch (error) {
        res.status(404).send({success: false})
    }
})

export default update
