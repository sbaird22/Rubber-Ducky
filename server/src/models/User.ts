import { Schema, Document, model } from 'mongoose';
import bcrypt from 'bcrypt';

// Creating a subdocument for Testimonials
/* Since testimonials should have a timestamp, and they're tied to users, this makes the most sense between
    1) a property on User, 2) Subdocument on User, 3) Its own model/schema*/

interface ITestimonial extends Document {
    testimonialContent: string;
    createdAt: Date;
}

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    bugs: Schema.Types.ObjectId[];
    testimonials: ITestimonial[];
    isCorrectPassword(password: string): Promise<boolean>;
}

const testimonialSchema = new Schema<ITestimonial>(
    {
        testimonialContent: {
            type: String,
            required: false,
            minlength: 25,
            maxlength: 300,
        },
    },
    {
        _id: false,
        toJSON: {getters: true},
        toObject: {getters: true},
        timestamps: true,
    }
);

const userSchema = new Schema<IUser>(
    {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, match: [/.+@.+\..+/, 'Must match an email address!'] },
    password: { type: String, required: true, minlength: 8 },
    bugs: [ {type: Schema.Types.ObjectId, ref: 'Bug', } ],
    testimonials: [testimonialSchema],
    },
    {
        timestamps: true,
        toJSON: {getters: true},
        toObject: {getters: true},
    },
);


userSchema.pre<IUser>('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});


userSchema.methods.isCorrectPassword = async function (password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
};


const User = model<IUser>('User', userSchema);
export default User;
