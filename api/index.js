import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoute.js'
import authRoutes from './routes/authRoute.js'

const app = express();
// Allow JSON as input to backend
app.use(express.json());
dotenv.config();


app.listen("3000", () => {
    console.log("App is Listening port 3000")
})

mongoose.connect(process.env.MONGO)
   .then(() => {
      console.log('Connected to MongoDB');
   })
   .catch((err) => {
      console.error('Error connecting to MongoDB:', err.message);
   });

app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)

app.use((err, req, res, next) => {
   const statusCode = err.statusCode || 500;
   const message = err.message || 'Internal Server Error';
   return res.status(statusCode).json({
      success: false,
      message,
      statusCode
   })
})