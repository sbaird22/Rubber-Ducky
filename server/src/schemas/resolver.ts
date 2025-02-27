import { Bug, User } from '../models/index.js';
import { signToken, AuthenticationError } from '../utils/auth.js';

// Define argument types
interface AddUserArgs {
    input: {
        username: string;
        email: string;
        password: string;
    };
}

interface LoginUserArgs {
    email: string;
    password: string;
}

interface UserArgs {
    username: string;
}

interface BugArgs {
    bugId: string; // Make sure to use string for IDs in resolvers
}

interface AddBugArgs {
    input: {
        title: string;
        bugDescription: string;
        createdBy: string;
    };
}

interface AddAttemptArgs {
    bugId: string;
    attemptDescription: string;
    isSuccess: boolean;
}

interface RemoveAttemptArgs {
    bugId: string;
    attemptId: string; // Use string for the attemptId field
}

const resolvers = {
    Query: {
        users: async () => {
            return User.find().populate('bugs');
        },
        user: async (_parent: any, { username }: UserArgs) => {
            return User.findOne({ username }).populate('bugs');
        },
        bugs: async () => {
            return await Bug.find().sort({ createdAt: -1 });
        },
        bug: async (_parent: any, { bugId }: BugArgs) => {
            return await Bug.findOne({ _id: bugId });
        },
    },
    Mutation: {
        addUser: async (_parent: any, { input }: AddUserArgs) => {
            // Create a new user with the provided details
            const user = await User.create({ ...input });
            // Sign a token with the user's info
            const token = signToken(user.username, user.email, String(user._id));
            // Return the token and user
            return { token, user };
        },

        login: async (_parent: any, { email, password }: LoginUserArgs) => {
            // Find a user with the provided email
            const user = await User.findOne({ email });
            // If none are found, throw an error
            if (!user) {
                throw new AuthenticationError('Could not authenticate user.');
            }
            // Check the given password
            const correctPass = await user.isCorrectPassword(password);
            // If incorrect, throw an error
            if (!correctPass) {
                throw new AuthenticationError('Could not authenticate user.');
            }
            // Sign a token with user info
            const token = signToken(user.username, user.email, String(user._id));
            // Return token & user
            return { token, user };
        },

        addBug: async (_parent: any, { input }: AddBugArgs, context: any) => {
            if (context.user) {
                const bug = await Bug.create({ ...input });
                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { bugs: bug._id } }
                );
                return bug;
            }
            throw new AuthenticationError('You must be logged in to add a bug.');
        },

        addAttempt: async (
            _parent: any,
            { bugId, attemptDescription, isSuccess }: AddAttemptArgs,
            context: any
        ) => {
            if (context.user) {
                return Bug.findOneAndUpdate(
                    { _id: bugId },
                    {
                        $addToSet: {
                            attempts: {
                                attemptDescription,
                                isSuccess,
                                attemptAuthor: context.user.username,
                            },
                        },
                    },
                    { new: true, runValidators: true }
                );
            }
            throw new AuthenticationError('You must be logged in to add an attempt.');
        },

        removeBug: async (_parent: any, { bugId }: BugArgs, context: any) => {
            if (context.user) {
                const bug = await Bug.findOneAndDelete({
                    _id: bugId,
                    bugAuthor: context.user.username,
                });

                if (!bug) {
                    throw new AuthenticationError('Bug not found or unauthorized.');
                }

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { bugs: bug._id } }
                );
                return bug;
            }
            throw new AuthenticationError('You must be logged in to remove a bug.');
        },

        removeAttempt: async (
            _parent: any,
            { bugId, attemptId }: RemoveAttemptArgs,
            context: any
        ) => {
            if (context.user) {
                return Bug.findOneAndUpdate(
                    { _id: bugId },
                    {
                        $pull: {
                            attempts: {
                                _id: attemptId,
                                attemptAuthor: context.user.username,
                            },
                        },
                    },
                    { new: true }
                );
            }
            throw new AuthenticationError('You must be logged in to remove an attempt.');
        },
    },
};

export default resolvers;
