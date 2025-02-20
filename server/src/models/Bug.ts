import { Schema, model, Document } from 'mongoose';

// Attempt subdocument Interface
interface IAttempt extends Document {
    attemptDescription: string,
    isSuccess: boolean,
    createdAt: Date,
};

// Bug interface
interface IBug extends Document {
    title: string,
    bugDescription: string,
    createdAt: Date,
    createdBy: string,
    attempts: IAttempt[],
}

// Defining the schema for the Attempt subdocument
const attemptSchema = new Schema<IAttempt>(
    {
        attemptDescription: {
            type: String,
            required: true,
            minLength: 10,
            maxLength: 300,
        },
        isSuccess: {
            type: Boolean,
            required: true,
        },
    },
    {
        _id: false,
        toJSON: { getters: true},
        toObject: { getters: true },
        timestamps: true,
    }
);

// Schema for Bug
const bugSchema = new Schema<IBug>(
    {
        title: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 25,
            trim: true,
        },
        bugDescription: {
            type: String,
            required: true,
            minLength: 10,
            maxLength: 400,
            trim: true,
        },
        createdBy: {
            type: String,
            required: true,
            trim: true,
        },
        attempts: [attemptSchema],
    },
);

const Bug = model<IBug>('Bug', bugSchema);

export default Bug;