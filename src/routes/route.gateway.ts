import { Router } from 'express'
import routes from './../routes'
import add from './user/add';
import remove from './user/remove';
import get from './user/get';
import getAll from './user/getAll';
import getMe from './user/getMe';
import update from './user/update';

const routerGateway: Router = Router();

routerGateway.get('/user/all', getAll)
routerGateway.get('/user/me', getMe)
routerGateway.get('/user/id/:userId', get)
routerGateway.post('/user/add', add)
routerGateway.delete('/user/id/:id', remove)
routerGateway.put('/user/id/:id', update)
routerGateway.patch('/user/id/:id', update)

routerGateway.use('/', routes)


export default routerGateway