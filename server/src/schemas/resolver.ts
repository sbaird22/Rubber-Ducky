import { Bug, User } from '../models/index.js';
import { signToken, AuthenticationError } from '../services/authService.js' 

// Define argument types
interface AddUserArgs {
    input: {
        username: string,
        email: string,
        password: string
    }
}

interface LoginUserArgs {
    email: string,
    password: string
}

interface UserArgs {
    username: string
}

interface BugArgs {
    bugId: string
}

interface AddBugArgs {
    input: {
        title: string,
        bugDescription: string,
        createdBy: string
    }
}

interface AddAttemptArgs {
    bugId: string,
    attemptDescription: string,
    isSuccess: boolean
}

interface RemoveAttemptArgs {
    bugId: string,
    attemptId: String
}

const resolvers = {
    Query: {
        users: async () => {
            return User.find().populate('bugs');
        },
        user: async (_parent: any, { username }: UserArgs) => {
            return User.findOne({username}).populate('bugs');
        },
        bugs: async () => {
            return await Bug.find().sort({createdAt: -1});
        },
        bug: async (_parent: any, { bugId }: BugArgs) => {
            return await Bug.findOne({_id: bugId});
        },
        // Query for the authenticated user's info ('me' query relies on context to verify auth)
        me: async (_parent: any, _args: any, context: any) => {
            // If authenticated, returns info + thoughts
            if(context.user) {
                return User.findOne({_id: context.user._id}).populate('bugs');
            }
            // Throw authentication error if not authenticated
            throw new AuthenticationError('Could not authenticate user.');
        },
    },
    Mutation: {
        addUser: async (_parent: any, { input }: AddUserArgs) => {
            // Create a new user with the provided details
            const user = await User.create({...input});
            // Sign a token with the user's info
            const token = signToken(user.username, user.email, user._id);
            // Return the token and user
            return { token, user };
        },

        login: async (_parent: any, { email, password }: LoginUserArgs) => {
            // Find a user with the provided email
            const user = await User.findOne({email});
            // If none are found, throw an error
            if(!user){
                throw new AuthenticationError('Could not authenticate user.');
            }
            // Check the given password
            const correctPass = await user.isCorrectPassword(password);
            // If incorrect, throw an error
            if(!correctPass){
                throw new AuthenticationError('Could not authenticate user.');
            };
            // Sign a token with user info
            const token = signToken(user.username, user.email, user._id);
            // Return token & user
            return { token, user };
        },
        addBug: async (_parent: any, { input }: AddBugArgs, context: any) => {
            if(context.user){
                const bug = await Bug.create({...input});
                await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$addToSet: {bugs: bug._id}}
                );
                return bug;
            };
            throw AuthenticationError('Log in harder');
        },
        addAttempt: async (_parent: any, { bugId, attemptDescription, isSuccess }: AddAttemptArgs, context: any) => {
            if(context.user){
                return Bug.findOneAndUpdate(
                    {_id: bugId},
                    {
                        $addToSet: {
                            attempts: { attemptDescription, isSuccess, attemptAuthor: context.user.username },
                        },
                    },
                    {
                        new: true,
                        runValidators: true,
                    }
                );
            };
            throw AuthenticationError('You are not logged in?????');
        },
        removeBug: async (_parent: any { bugId }: BugArgs, context: any) => {
            if(context.user){
                const bug = await Bug.findOneAndDelete({
                    _id: bugId,
                    bugAuthor: context.user.username,
                });

                if(!bug){
                    throw AuthenticationError('Could not authenticate');
                };

                await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$pull: {bugs: bug._id}}
                );
                return bug;
            }
            throw AuthenticationError('Auth failed');
        },

        removeAttempt: async (_parent: any { bugId, attemptId }: RemoveAttemptArgs, context: any) => {
            if(context.user){
                return Bug.findOneAndUpdate(
                    {_id: bugId},
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
            throw AuthenticationError('Authentication error');
        },
    },
};

export default resolvers;