"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../models/index.js");
const auth_js_1 = require("../utils/auth/auth.js");
const resolvers = {
    Query: {
        users: () => __awaiter(void 0, void 0, void 0, function* () {
            return index_js_1.User.find().populate('bugs');
        }),
        user: (_parent_1, _a) => __awaiter(void 0, [_parent_1, _a], void 0, function* (_parent, { username }) {
            return index_js_1.User.findOne({ username }).populate('bugs');
        }),
        bugs: () => __awaiter(void 0, void 0, void 0, function* () {
            return yield index_js_1.Bug.find().sort({ createdAt: -1 });
        }),
        bug: (_parent_1, _a) => __awaiter(void 0, [_parent_1, _a], void 0, function* (_parent, { bugId }) {
            return yield index_js_1.Bug.findOne({ _id: bugId });
        }),
        // Query for the authenticated user's info ('me' query relies on context to verify auth)
        me: (_parent, _args, context) => __awaiter(void 0, void 0, void 0, function* () {
            // If authenticated, returns info + thoughts
            if (context.user) {
                return index_js_1.User.findOne({ _id: context.user._id }).populate('bugs');
            }
            // Throw authentication error if not authenticated
            throw new auth_js_1.AuthenticationError('Could not authenticate user.');
        }),
    },
    Mutation: {
        addUser: (_parent_1, _a) => __awaiter(void 0, [_parent_1, _a], void 0, function* (_parent, { input }) {
            // Create a new user with the provided details
            const user = yield index_js_1.User.create(Object.assign({}, input));
            // Sign a token with the user's info
            const token = (0, auth_js_1.signToken)(user.username, user.email, user._id);
            // Return the token and user
            return { token, user };
        }),
        login: (_parent_1, _a) => __awaiter(void 0, [_parent_1, _a], void 0, function* (_parent, { email, password }) {
            // Find a user with the provided email
            const user = yield index_js_1.User.findOne({ email });
            // If none are found, throw an error
            if (!user) {
                throw new auth_js_1.AuthenticationError('Could not authenticate user.');
            }
            // Check the given password
            const correctPass = yield user.isCorrectPassword(password);
            // If incorrect, throw an error
            if (!correctPass) {
                throw new auth_js_1.AuthenticationError('Could not authenticate user.');
            }
            ;
            // Sign a token with user info
            const token = (0, auth_js_1.signToken)(user.username, user.email, user._id);
            // Return token & user
            return { token, user };
        }),
        addBug: (_parent_1, _a, context_1) => __awaiter(void 0, [_parent_1, _a, context_1], void 0, function* (_parent, { input }, context) {
            if (context.user) {
                const bug = yield index_js_1.Bug.create(Object.assign({}, input));
                yield index_js_1.User.findOneAndUpdate({ _id: context.user._id }, { $addToSet: { bugs: bug._id } });
                return bug;
            }
            ;
            throw (0, auth_js_1.AuthenticationError)('Log in harder');
        }),
        addAttempt: (_parent_1, _a, context_1) => __awaiter(void 0, [_parent_1, _a, context_1], void 0, function* (_parent, { bugId, attemptDescription, isSuccess }, context) {
            if (context.user) {
                return index_js_1.Bug.findOneAndUpdate({ _id: bugId }, {
                    $addToSet: {
                        attempts: { attemptDescription, isSuccess, attemptAuthor: context.user.username },
                    },
                }, {
                    new: true,
                    runValidators: true,
                });
            }
            ;
            throw (0, auth_js_1.AuthenticationError)('You are not logged in?????');
        }),
        removeBug: (_parent_1, _a, context_1) => __awaiter(void 0, [_parent_1, _a, context_1], void 0, function* (_parent, { bugId }, context) {
            if (context.user) {
                const bug = yield index_js_1.Bug.findOneAndDelete({
                    _id: bugId,
                    bugAuthor: context.user.username,
                });
                if (!bug) {
                    throw (0, auth_js_1.AuthenticationError)('Could not authenticate');
                }
                ;
                yield index_js_1.User.findOneAndUpdate({ _id: context.user._id }, { $pull: { bugs: bug._id } });
                return bug;
            }
            throw (0, auth_js_1.AuthenticationError)('Auth failed');
        }),
        removeAttempt: (_parent_1, _a, context_1) => __awaiter(void 0, [_parent_1, _a, context_1], void 0, function* (_parent, { bugId, attemptId }, context) {
            if (context.user) {
                return index_js_1.Bug.findOneAndUpdate({ _id: bugId }, {
                    $pull: {
                        attempts: {
                            _id: attemptId,
                            attemptAuthor: context.user.username,
                        },
                    },
                }, { new: true });
            }
            throw (0, auth_js_1.AuthenticationError)('Authentication error');
        }),
    },
};
exports.default = resolvers;
