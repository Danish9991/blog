import express from 'express';
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import connectDB from './config/db.js';
import userRoutes from './router/userRouter.js'
import tourRoutes from './router/tourRouter.js'
import { errorMiddleware } from './middlewares/errorMiddleware.js'

const app = express();
dotenv.config()
connectDB();

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(morgan('combined'))
app.use(cors({origin: 'http://localhost:3000'}))


//apis
app.use('/api/users', userRoutes)
app.use('/api/tours', tourRoutes)

//error middleware
app.use(errorMiddleware)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
})

