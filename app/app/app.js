import { config } from 'dotenv';
import express from 'express';
import { v2 as cloudinary } from 'cloudinary';
import routeAdmin from '../Routers/routeAdmin';

config();
cloudinary.config({
  cloud_name: 'tos4christ',
  api_key: '594949515392786',
  api_secret: 'N0E0H0bfxGI_4CEFvgWfwNBjJWY',
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/test', (req, res) => {
  res.status(200).send('Request received');
});

app.use('/api/v1', routeAdmin);

app.use((req, res, next) => {
  const err = new Error('Not Found at all');
  err.status = 404;
  next(err);
});

app.use((err, req, res) => {
  const status = err.status ? err.status : 500;
  res.status(status).send({
    'Server Error': err.message,
  });
});

export default app;
