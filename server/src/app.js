import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import recipeRoute from './routes/recipeRouter.js';
import UserRouter from './routes/UserRouter.js'
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());



app.use("/api/recipe", recipeRoute);
app.use("/api/user",UserRouter );


    (async () => {
        try {
            await mongoose.connect(process.env.MONGO_URL);
            console.log('Connected to MongoDB');
            const port = process.env.PORT;
            app.listen(port, () => {
                console.log(`Server running on port ${process.env.PORT}`);
            });
        }  catch (err) {
            console.error("Error connecting to MongoDB", err);
        }
    })();

    export default app;