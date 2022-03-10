import { Router } from 'express'
import { UserRepository } from './repository';

const router: Router = Router();

const userRepository = new UserRepository()
const myUserId = 1

router.all('/user/:action/:id?', (req, res) => {
    const { action, id } = req.params
    const { method } = req

    if (action === 'all') {
        if (method == 'GET') {
            const users = userRepository.getAll()
            res.json({users})
        }
        else {
            res.status(405).send({success: false})
        }
    }
    else if (action === 'me') {
        if (method == 'GET') {
            const user = userRepository.get(myUserId)
            res.json({user})
        }
        else {
            res.status(405).send({success: false})
        }
    }
    else if (action === 'id' ) {
        if (method == 'GET') {
            if (id !== null && id !== undefined) {
                const user = userRepository.get(parseInt(id))
                if (user) {
                    res.json({user})
                }
                else {
                    res.status(404).send({success: false})
                }
            }
            else {
                res.json({ success: false})
            }
        }
        else if (method == 'DELETE') {
            if (id !== null && id !== undefined) {
                const isSuccess = userRepository.delete(parseInt(id))
                if (isSuccess == true) {
                    res.json({success: true})
                }
                else {
                    res.status(404).send({success: false})
                }
            }
            else {
                res.json({ success: false})
            }
        }
        else if (method == 'PUT' || method == 'PATCH') {
            if (id !== null && id !== undefined) {
                const {name} = req.body
                const changedUser = userRepository.update(parseInt(id), name)
                if (changedUser) {
                    const {name} = req.body
                    res.json({changedUser})
                }
                else {
                    res.status(404).send({success: false})
                }
                
            }
            else {
                res.json({ success: false})
            }
        }
        else {
            res.status(405).send({success: false})
        }
    }
    else if (action === 'add') {
        if (method == 'POST') {
            const {name} = req.body
            const newUser = userRepository.add(name)
            res.json({newUser})
        }
        else {
            res.status(405).send({success: false})
        }
    }
    else {
        res.status(400).send({success: false})
    }
})

export default router