import express, { Application, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import dotenv from 'dotenv';
import AuthRouter from './routes/authRoutes';
import FurnitureRouter from './routes/furnitureRoutes';

// Load env vars
if (process.env.NODE_ENV !== 'production') {
    dotenv.config({ path: '.env' });
}

// Create Express server
const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Auth routes
app.use(AuthRouter)
app.use(FurnitureRouter)

// Basic route
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: 'Furniture Shop API is running',
        version: '1.0.0'
    });
});

// Connect to MongoDB
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI || '');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

// Error handling middleware
interface ErrorWithStatus extends Error {
    statusCode?: number;
    code?: number;
}

app.use((err: ErrorWithStatus, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Server Error',
        stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
    });
});

// Start server
const PORT = process.env.PORT || 5000;

// const startServer = async () => {
//     try {
//         await connectDB();
//             const server = app.listen(PORT, () => {
//             console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
//         });

//         // Handle unhandled promise rejections
//         process.on('unhandledRejection', (err: Error, promise) => {
//             console.log(`Error: ${err.message}`);
//             // Close server & exit process
//             server.close(() => process.exit(1));
//         });
//     } catch (error) {
//         console.error('Failed to start server:', error);
//         process.exit(1);
//     }
// };

// startServer();

export default app;
