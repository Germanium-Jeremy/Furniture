import mongoose, { Document, Schema, Model, Types } from 'mongoose';

export interface IPayment extends Document {
    order: Types.ObjectId;
    user: Types.ObjectId;
    paymentMethod: 'momo' | 'paypal' | 'bank_transfer';
    amount: number;
    status: 'pending' | 'completed' | 'failed' | 'refunded' | 'cancelled';
    transactionId?: string;
    paymentDetails?: {
        // MoMo payment details
        momoTransactionId?: string;
        momoNumber?: string;
        
        // PayPal payment details
        paypalOrderId?: string;
        paypalPayerId?: string;
        
        // Bank transfer details
        bankName?: string;
        bankAccountNumber?: string;
        bankTransactionId?: string;
        
        // Common details
        paymentDate?: Date;
        currency: string;
    };
    refundDetails?: {
        amount: number;
        reason: string;
        processedAt: Date;
        processedBy: Types.ObjectId;
    };
    createdAt: Date;
    updatedAt: Date;
}

const PaymentSchema: Schema = new Schema(
    {
        order: {
            type: Schema.Types.ObjectId,
            ref: 'Order',
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        paymentMethod: {
            type: String,
            required: true,
            enum: ['momo', 'paypal', 'bank_transfer'],
        },
        amount: {
            type: Number,
            required: true,
            min: 0,
        },
        status: {
            type: String,
            required: true,
            enum: ['pending', 'completed', 'failed', 'refunded', 'cancelled'],
            default: 'pending',
        },
        transactionId: String,
        paymentDetails: {
            // MoMO
            momoTransactionId: String,
            momoNumber: String,
            
            // PayPal
            paypalOrderId: String,
            paypalPayerId: String,
            
            // Bank Transfer
            bankName: String,
            bankAccountNumber: String,
            bankTransactionId: String,
            
            // Common
            paymentDate: Date,
            currency: {
                type: String,
                default: 'USD',
            },
        },
        refundDetails: {
            amount: Number,
            reason: String,
            processedAt: Date,
            processedBy: {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        },
    },
    {
        timestamps: true,
    }
);

// Indexes for faster queries
PaymentSchema.index({ order: 1 });
PaymentSchema.index({ user: 1 });
PaymentSchema.index({ status: 1 });
PaymentSchema.index({ 'paymentDetails.paymentDate': 1 });

// Create and export the model
const Payment: Model<IPayment> = mongoose.model<IPayment>('Payment', PaymentSchema);

export default Payment;
