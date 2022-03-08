import { Router } from 'express'

const router: Router = Router();

const users = [];

router.all('/user/:action/:id?', (req, res) => {
    const { action, id } = req.params
    if (action === 'all') {
        res.json({users})
    }
    else if (action === 'me') {
        res.json({user: {name: 'Reginaldo'}})
    }
    else if (action === 'id' ) {
        if (id !== null && id !== undefined) {
            res.json({user: {id}})
        }
        else {
            console.log("error", id)
            res.json({ success: false})
        }
    }
    else if (action === 'add') {
        const {name} = req.body.user
        res.json({user: {name}})
    }
    else if (action === 'delete' ) {
        if (id !== null && id !== undefined) {
            if (parseInt(id) == 4) {
                res.json({success: true})
            }
            else {
                res.status(404).send({success: false})
            }
            
        }
        else {
            console.log("error", id)
            res.json({ success: false})
        }
    }
    else {
        res.json({ success: false})
    }
})

export default router