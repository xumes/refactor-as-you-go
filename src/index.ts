import express from 'express'
import routerGateway from './routes/route.gateway';

const app: express.Application = express();

app.use(express.json({ limit: '300kb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/', routerGateway)

const PORT = 5050;

app
  .listen(+PORT, () => {
    console.log('info', `Server started at http://localhost:${PORT}`);
  })


export default app;