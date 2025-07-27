import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { IError } from './error';

// Extend Express Request interface to include user property
declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

// Protect routes
export const protect = async (req: Request, res: Response, next: NextFunction) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        // Set token from Bearer token in header
        token = req.headers.authorization.split(' ')[1];
        console.log("token: ", token)
    }
    // Set token from cookie
    else if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    }

  // Make sure token exists
    if (!token) {
        return next({
            message: 'Not authorized to access this route',
            statusCode: 401,
        } as IError);
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };

        // Check if user still exists
        const user = await User.findById(decoded.id);
        
        if (!user) {
            return next({
                message: 'The user belonging to this token no longer exists',
                statusCode: 401,
            } as IError);
        }

        // Grant access to protected route
        req.user = user;
        next();
    } catch (err) {
        return next({
            message: 'Not authorized to access this route',
            statusCode: 401,
        } as IError);
    }
};

// Grant access to specific roles
export const authorize = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!roles.includes(req.user.role)) {
            return next({
                message: `User role ${req.user.role} is not authorized to access this route`,
                statusCode: 403,
            } as IError);
        }
        next();
    };
};

// Check if user is the owner of the resource or admin
export const isOwnerOrAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // If user is admin, grant access
        if (req.user.role === 'admin') {
            return next();
        }

        // Check if user is the owner of the resource
        if (req.params.userId && req.params.userId !== req.user.id) {
            return next({
                message: 'Not authorized to access this resource',
                statusCode: 403,
            } as IError);
        }

        next();
    } catch (err) {
        return next({
            message: 'Error verifying ownership',
            statusCode: 500,
        } as IError);
    }
};
