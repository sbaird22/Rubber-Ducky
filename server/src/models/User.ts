import mongoose, { Schema, Document, model } from 'mongoose';
import bcrypt from 'bcrypt';


export interface IUser extends Document {
    _id: mongoose.Types.ObjectId; 
    username: string;
    email: string;
    password: string;
    isCorrectPassword(password: string): Promise<boolean>;
}


const userSchema = new Schema<IUser>(
    {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 8 },
    },
    { timestamps: true }
);


userSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});


userSchema.methods.isCorrectPassword = async function (password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
};


const User = model<IUser>('User', userSchema);
export default User;
