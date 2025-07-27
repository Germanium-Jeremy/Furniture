import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import { IError } from '../middleware/error';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import process from 'process';

// Generate JWT Token
const generateToken = (id: string): string => {
    return jwt.sign({ id }, process.env.JWT_SECRET as string, );
};

// Send JWT token and create cookie
const sendTokenResponse = (user: any, statusCode: number, res: Response): void => {
    // Create token
    const token = generateToken(user._id);

    const options = {
        expires: new Date(
            Date.now() + 
            (process.env.JWT_COOKIE_EXPIRE ? parseInt(process.env.JWT_COOKIE_EXPIRE) : 30) * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict' as const,
    };

    // Remove password from output
    user.password = undefined;

    const userResponse = {
        username: user.name,
        useremail: user.email,
        userrole: user.role,
        userId: user._id
    }

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token,
        data: userResponse,
    });
};

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return next({
                message: 'User already exists with this email',
                statusCode: 400,
            } as IError);
        }

        // Create user
        const user = await User.create({
            name,
            email,
            password,
            role: 'user',
        });

        sendTokenResponse(user, 201, res);
    } catch (err: any) {
        next({
            message: err.message || 'Server Error',
            statusCode: 500,
        } as IError);
    }
};

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        // Validate email & password
        if (!email || !password) {
            return next({
                message: 'Please provide an email and password',
                statusCode: 400,
            } as IError);
        }

        // Check for user
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return next({
                message: 'Invalid credentials',
                statusCode: 401,
            } as IError);
        }

        // Check if password matches
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return next({
                message: 'Invalid credentials',
                statusCode: 401,
            } as IError);
        }

        sendTokenResponse(user, 200, res);
    } catch (err: any) {
        next({
            message: err.message || 'Server Error',
            statusCode: 500,
        } as IError);
    }
};

// @desc    Get current logged in user
// @route   GET /api/v1/auth/me
// @access  Private
export const getMe = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findById(req.query.userId);
        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (err: any) {
        next({
            message: err.message || 'Server Error',
            statusCode: 500,
        } as IError);
    }
};

// @desc    Logout user / clear cookie
// @route   GET /api/v1/auth/logout
// @access  Private
export const logout = (req: Request, res: Response, next: NextFunction) => {
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        data: {},
    });
};

// @desc    Forgot password
// @route   POST /api/v1/auth/forgotpassword
// @access  Public
export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return next({
                message: 'There is no user with that email',
                statusCode: 404,
            } as IError);
        }

        // Get reset token
        const resetToken = user.getResetPasswordToken();

        await user.save({ validateBeforeSave: false });

        // Create reset URL
        const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/reset/?resettoken=${resetToken}`;

        // TODO: Send email with reset URL
        console.log(`Password reset token: ${resetToken}`);
        console.log(`Reset URL: ${resetUrl}`);

        res.status(200).json({
            success: true,
            data: 'Email sent',
        });
    } catch (err: any) {
        console.error(err);
        next({
            message: err.message || 'Server Error',
            statusCode: 500,
        } as IError);
    }
};

// @desc    Reset password
// @route   PUT /api/v1/auth/resetpassword/:resettoken
// @access  Public
export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get hashed token
        const resetPasswordToken = crypto
            .createHash('sha256')
            .update(req.query.resettoken as string)
            .digest('hex');
        
        const { newPassword, confirmPassword } = req.body;
        
        if (!newPassword || !confirmPassword) {
            return next({
                message: 'Please provide new Password and confirm it',
                statusCode: 400,
            } as IError);
        }

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            return next({
                message: 'Invalid token or token has expired',
                statusCode: 400,
            } as IError);
        }

        // Set new password
        if (newPassword !== confirmPassword) {
            return next({
                message: 'Password must match',
                statusCode: 400,
            } as IError)
        }

        user.password = newPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        sendTokenResponse(user, 200, res);
    } catch (err: any) {
        next({
            message: err.message || 'Server Error',
            statusCode: 500,
        } as IError);
    }
};
