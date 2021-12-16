import express, { json } from 'express'
import Connection from './database/db.js';
import cors from 'cors'
import router from './routes/route.js';

// app config
const app = express();
const port = process.env.PORT || 8000;

// middlewares
app.use(express.json());
app.use(cors());
app.use(express.static("public/build"));

// db config
Connection();

// api routes
app.use('/',router);

// listen
app.listen(port, () =>
{
    console.log(`server listening on localhost:${port}`);
})