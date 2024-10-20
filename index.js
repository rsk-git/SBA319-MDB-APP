import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import postsRouter from './routes/posts.js';
import commentsRouter from './routes/comments.js'
import usersRouter from './routes/users.js';
import morgan from 'morgan';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 1008;

// Connect to DB
const connectToDatabase = async()=>{
try {
    await mongoose.connect (process.env.MONGODB_URI);
    console.log('connected');
}catch (e){ console.error (e)

}}

connectToDatabase();

// middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

// routes
app.use('/api/posts',postsRouter);
app.use('/api/users', usersRouter);
app.use('/api/comments', commentsRouter);



app.get('/', (req,res) => {
    res.json({ msg: 'Welcome to my api'})
})



app.listen(PORT ,() => console.log (`Server running on port : $ {PORT`));