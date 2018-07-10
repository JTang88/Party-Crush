import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes';
import './db';

const app = express();
const port = 3112 || process.env.PORT;

app.use(bodyParser.json());
app.use(cors({
  allowedHeaders: 'Content-Type,Authorization',
  methods: ['GET, POST, PUT, DELETE, OPTIONS'],
}));

app.use('/api', router);

app.listen(port, () => console.log(`rest-server listening on port ${port}`));