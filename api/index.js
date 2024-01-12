import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const app = express();
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
