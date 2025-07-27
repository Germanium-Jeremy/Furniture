import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IFurniture extends Document {
    name: string;
    description: string;
    price: number;
    category: string[];
    material: string[];
    dimensions: {
        length: number;
        width: number;
        height: number;
        unit: 'cm' | 'm' | 'in' | 'ft';
    };
    color: string[];
    stock: number;
    images: string[];
    status: 'available' | 'out_of_stock' | 'sold' | 'delivering' | 'delivered';
    isCustomizable: boolean;
    averageRating?: number;
    numReviews?: number;
    createdAt: Date;
    updatedAt: Date;
}

const FurnitureSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name'],
            trim: true,
            maxlength: [100, 'Name cannot be more than 100 characters'],
        },
        description: {
            type: String,
            required: [true, 'Please add a description'],
            maxlength: [1000, 'Description cannot be more than 1000 characters'],
        },
        price: {
            type: Number,
            required: [true, 'Please add a price'],
            min: [0, 'Price cannot be negative'],
        },
        category: {
            type: [String],
            required: [true, 'Please add at least one category'],
            enum: [
                'sofa',
                'chair',
                'table',
                'bed',
                'wardrobe',
                'desk',
                'shelf',
                'cabinet',
                'dining',
                'office',
                'outdoor',
                'other',
            ],
        },
        material: {
            type: [String],
            required: [true, 'Please add at least one material'],
            enum: [
                'wood',
                'metal',
                'glass',
                'plastic',
                'fabric',
                'leather',
                'marble',
                'rattan',
                'bamboo',
                'other',
            ],
        },
        dimensions: {
            length: { type: Number, required: true },
            width: { type: Number, required: true },
            height: { type: Number, required: true },
            unit: {
                type: String,
                required: true,
                enum: ['cm', 'm', 'in', 'ft'],
                default: 'cm',
            },
        },
        color: {
            type: [String],
            required: [true, 'Please add at least one color'],
        },
        stock: {
            type: Number,
            required: [true, 'Please add stock quantity'],
            min: [0, 'Stock cannot be negative'],
            default: 0,
        },
        images: {
            type: [String],
            required: [true, 'Please add at least one image URL'],
        },
        status: {
            type: String,
            enum: ['available', 'out_of_stock', 'sold', 'delivering', 'delivered'],
            default: 'available',
        },
        isCustomizable: {
            type: Boolean,
            default: false,
        },
        averageRating: {
            type: Number,
            min: [1, 'Rating must be at least 1'],
            max: [5, 'Rating cannot be more than 5'],
        },
        numReviews: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

// Create a text index for search functionality
FurnitureSchema.index({ 
    name: 'text', 
    description: 'text',
    category: 'text',
    material: 'text',
    color: 'text'
}, {
    weights: {
        name: 10,
        description: 5,
        category: 3,
        material: 2,
        color: 1
    },
    name: 'furniture_search_index'
});

// Create and export the model
const Furniture: Model<IFurniture> = mongoose.model<IFurniture>('Furniture', FurnitureSchema);

export default Furniture;
