"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
// Defining the schema for the Attempt subdocument
const attemptSchema = new mongoose_1.Schema({
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
}, {
    _id: false,
    toJSON: { getters: true },
    toObject: { getters: true },
    timestamps: true,
});
// Schema for Bug
const bugSchema = new mongoose_1.Schema({
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
});
const Bug = (0, mongoose_1.model)('Bug', bugSchema);
exports.default = Bug;
