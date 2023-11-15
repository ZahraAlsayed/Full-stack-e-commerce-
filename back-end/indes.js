import express from "express";
import {dev} from './config/index.js';
import cors from 'cors';
import morgan from 'morgan';
import { rateLimit } from 'express-rate-limit';
import fs from 'fs/promises';
import router from "./routes/productsRoutes.js";

const app = express();
const port = dev.app.port || 8080;
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});
app.use(morgan("dev"));
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 15 minutes
    limit: 5, // Limit each IP to 5 requests per `window` (here, per 15 minutes).
    massege: "to many requst in 1 min"
});
// Apply the rate limiting middleware to all requests.
//app.use(limiter);

app.use(express.urlencoded({ extended: false }));
app.use('/products',router);
// let products = [
//     { "id": 1, "name": "laptop", "price": 3222 },
//     { "id": 2, "name": "Webcap", "price": 1233 }
// ];
// handel ايرر الكلاينت في حال الريكوست غير موجود 
app.use((req, res, next) => {
    res.status(404).json({
        massege: 'not found '
    });
});
//srver err
app.use((err,req, res, next) => {
    res.status(err.status || 500).json({
        massege: err.massege || 'server err'
    });
});

app.get('/', limiter,(req, res) => {
    res.status(200).json({
        message: 'Hello, World!'
    });
});



app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});