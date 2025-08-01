import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

export interface IError extends Error {
    statusCode?: number;
    code?: number;
    errors?: any;
    isOperational?: boolean;
}

export const errorHandler = (err: IError, req: Request, res: Response, next: NextFunction) => {
    // Default error status code
    err.statusCode = err.statusCode || 500;
    
    // Handle specific error types
    let error = { ...err };
    error.message = err.message;
    
    // Log the error for development
    logger.error(`${err.statusCode} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    logger.error(err.stack);
    
    // Handle Mongoose bad ObjectId
    if (err.name === 'CastError') {
        const message = `Resource not found`;
        error = new Error(message);
        error.statusCode = 404;
    }
    
    // Handle Mongoose duplicate key
    if (err.code === 11000) {
        const message = 'Duplicate field value entered';
        error = new Error(message);
        error.statusCode = 400;
    }
  
    // Handle Mongoose validation error
    if (err.name === 'ValidationError') {
        const message = Object.values((err as any).errors).map((val: any) => val.message);
        error = new Error(message.join(', '));
        error.statusCode = 400;
    }
    
    // Handle JWT errors
    if (err.name === 'JsonWebTokenError') {
        const message = 'Invalid token';
        error = new Error(message);
        error.statusCode = 401;
    }
    
    if (err.name === 'TokenExpiredError') {
        const message = 'Token expired';
        error = new Error(message);
        error.statusCode = 401;
    }
  
    // Send response
    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error',
        stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
    });
};

// Handle 404 Not Found
export const notFound = (req: Request, res: Response, next: NextFunction) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};
