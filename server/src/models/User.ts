import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

// User interface
interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    bugs: Schema.Types.ObjectId[];
    isCorrectPassword(password: string): Promise<boolean>;
}

// User schema
const userSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            minLength: 5,
        },
        bugs: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Bug',
            },
        ],
    },
    {
        timestamps: true,
        toJSON: { getters: true},
        toObject: { getters: true },
    }
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