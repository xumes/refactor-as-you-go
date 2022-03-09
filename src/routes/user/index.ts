import { Router } from 'express'
import getAll from './getAll'

const userRoutes: Router = Router();

userRoutes.use('/all', getAll)


export default userRoutes