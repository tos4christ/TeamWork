import { config } from 'dotenv';
import express from 'express';
import { v2 as cloudinary } from 'cloudinary';
import routeAdmin from '../Routers/routeAdmin';
import cors from 'cors';

config();
cloudinary.config({
  cloud_name: process.env.CCN,
  api_key: process.env.CAK,
  api_secret: process.env.CAS,
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/test', (req, res) => {
  res.status(200).send('Request received');
});

app.use('/api/v1', routeAdmin);

app.use((req, res, next) => {
  res.status(404).send({
    status: 'error',
    error: 'Not Found: Route does not exist',
  });
});

app.use((err, req, res) => {
  const status = err.status ? err.status : 500;
  res.status(status).send({
    'status': 'error',
    'Server Error': err.message,
  });
});

export default app;
