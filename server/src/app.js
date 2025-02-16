import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import recipeRoute from './routes/recipeRouter.js';
import UserRouter from './routes/UserRouter.js'
import SearchRouter from './routes/SearchRouter.js'
dotenv.config();

const app = express();
app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:5173', // כתובת הלקוח שלך
    methods: 'GET,POST,PUT,DELETE', // שיטות HTTP מותרות
    allowedHeaders: 'Content-Type, Authorization', // כותרות מותרים
    credentials: true, // חשוב להוסיף את זה כדי לאפשר שליחה של cookies
};

app.use(cors(corsOptions));


app.use("/api/recipe", recipeRoute);
app.use("/api/user", UserRouter);
app.use("/api/search", SearchRouter);


(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to MongoDB');
        const port = process.env.PORT;
        app.listen(port, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        });
    } catch (err) {
        console.error("Error connecting to MongoDB", err);
    }
})();

export default app;