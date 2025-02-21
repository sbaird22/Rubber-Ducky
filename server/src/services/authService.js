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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const jwtUtil_1 = require("../utils/jwtUtil");
const registerUser = (username, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield User_1.default.findOne({ email });
    if (existingUser)
        throw new Error('User already exists');
    const newUser = new User_1.default({ username, email, password });
    yield newUser.save();
    return {
        id: String(newUser._id),
        username: newUser.username,
        email: newUser.email,
        token: (0, jwtUtil_1.generateToken)(String(newUser._id)),
    };
});
exports.registerUser = registerUser;
/**
 * Logs in a user and returns a JWT.
 */
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findOne({ email });
    if (!user || !(yield user.isCorrectPassword(password)))
        throw new Error('Invalid credentials');
    return {
        id: String(user._id),
        username: user.username,
        email: user.email,
        token: (0, jwtUtil_1.generateToken)(String(user._id)),
    };
});
exports.loginUser = loginUser;
// Handles register and login and account verification
