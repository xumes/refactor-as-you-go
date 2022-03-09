import { Router } from 'express'
import { UserRepository } from './repository';

const router: Router = Router();

const userRepository = new UserRepository()
const myUserId = 1

router.all('/user/:action/:id?', (req, res) => {
    const { action, id } = req.params
    const { method } = req
    
    res.status(400).send({success: false})
})

export default router