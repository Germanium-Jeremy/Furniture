import mongoose, { Document, Schema, Model, Types } from 'mongoose';

export interface IOrderItem {
    name: string;
    quantity: number;
    image: string;
    price: number;
    furniture: Types.ObjectId;
    isCustom: boolean;
    customSpecs?: {
        dimensions?: {
            length: number;
            width: number;
            height: number;
            unit: 'cm' | 'm' | 'in' | 'ft';
        };
        material?: string;
        color?: string;
        notes?: string;
    };
}

export interface IOrder extends Document {
    user: Types.ObjectId;
    orderItems: IOrderItem[];
    shippingAddress: {
        fullName: string;
        address: string;
        city: string;
        postalCode: string;
        country: string;
        phone: string;
        email: string;
    };
    paymentMethod: string;
    paymentResult?: {
        id: string;
        status: string;
        update_time: string;
        email_address: string;
    };
    itemsPrice: number;
    shippingPrice: number;
    taxPrice: number;
    totalPrice: number;
    isPaid: boolean;
    paidAt?: Date;
    isDelivered: boolean;
    deliveredAt?: Date;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}

const OrderSchema: Schema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        orderItems: [
            {
                name: { type: String, required: true },
                quantity: { type: Number, required: true, min: 1 },
                image: { type: String, required: true },
                price: { type: Number, required: true, min: 0 },
                furniture: {
                    type: Schema.Types.ObjectId,
                    ref: 'Furniture',
                    required: true,
                },
                isCustom: { type: Boolean, default: false },
                customSpecs: {
                    dimensions: {
                        length: Number,
                        width: Number,
                        height: Number,
                        unit: { type: String, enum: ['cm', 'm', 'in', 'ft'], default: 'cm' },
                    },
                    material: String,
                    color: String,
                    notes: String,
                },
            },
        ],
        shippingAddress: {
            fullName: { type: String, required: true },
            address: { type: String, required: true },
            city: { type: String, required: true },
            postalCode: { type: String, required: true },
            country: { type: String, required: true },
            phone: { type: String, required: true },
            email: { type: String, required: true },
        },
        paymentMethod: {
            type: String,
            required: true,
            enum: ['paypal', 'momo', 'bank_transfer'],
        },
        paymentResult: {
            id: String,
            status: String,
            update_time: String,
            email_address: String,
        },
        itemsPrice: { type: Number, required: true, default: 0.0 },
        shippingPrice: { type: Number, required: true, default: 0.0 },
        taxPrice: { type: Number, required: true, default: 0.0 },
        totalPrice: { type: Number, required: true, default: 0.0 },
        isPaid: { type: Boolean, required: true, default: false },
        paidAt: Date,
        isDelivered: { type: Boolean, required: true, default: false },
        deliveredAt: Date,
        status: {
            type: String,
            enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
            default: 'pending',
        },
        notes: String,
    },
    {
        timestamps: true,
    }
);

// Calculate total price before saving
OrderSchema.pre<IOrder>('save', async function (next) {
    // Calculate items price
    const itemsPrice = this.orderItems.reduce(
        (acc, item) => acc + item.price * item.quantity, 0
    );
    this.itemsPrice = itemsPrice;

    // Calculate tax (10% of items price)
    this.taxPrice = Number((this.itemsPrice * 0.1).toFixed(2));

    // Calculate total price
    this.totalPrice = Number(
        (this.itemsPrice + this.shippingPrice + this.taxPrice).toFixed(2)
    );

    next();
});

// Create and export the model
const Order: Model<IOrder> = mongoose.model<IOrder>('Order', OrderSchema);

export default Order;
