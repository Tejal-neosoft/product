import express from 'express';
import cors from 'cors';
import productsRoutes from './routes/productsRoutes.js'
import { connectdb } from './config/connection.js';
import errorMiddleware from './middleware/error.js';
const PORT = 5000

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use("../frontend/public/images/", express.static("public"));

app.use("/products", productsRoutes)

app.use(errorMiddleware)

connectdb();

app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`working on ${PORT}`)
}) 