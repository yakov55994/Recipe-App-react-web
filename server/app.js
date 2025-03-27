import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import recipeRoute from './src/routes/recipeRouter.js';
import UserRouter from './src/routes/UserRouter.js'
import SearchRouter from './src/routes/SearchRouter.js'
dotenv.config();

const app = express();
app.use(express.json());

const corsOptions = {
    origin: ['http://localhost:5173', 'https://recipe-app-server-ycy3.onrender.com'],
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
};


app.use(cors());


app.use("/api/recipe", recipeRoute);
app.use("/api/user", UserRouter);
app.use("/api/search", SearchRouter);


(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to MongoDB 🫙');
        const port = process.env.PORT;
        app.listen(port, () => {
            console.log(`Server running on port ${process.env.PORT} 🚀`);
        });
    } catch (err) {
        console.error("Error connecting to MongoDB", err);
    }
})();

export default app;