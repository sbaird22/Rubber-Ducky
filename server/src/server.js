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
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const chatRoutes_1 = __importDefault(require("./routes/chatRoutes"));
const schemas_1 = require("./schemas"); // Ensure correct import for typeDefs and resolvers
const db_1 = __importDefault(require("./config/db")); // Ensure the correct MongoDB connection import
dotenv_1.default.config();
// Setup the server
const PORT = process.env.PORT || 3001;
const app = (0, express_1.default)();
// Initialize ApolloServer with GraphQL schema
const server = new apollo_server_express_1.ApolloServer({
    typeDefs: schemas_1.typeDefs, // Correctly named 'typeDefs' for the Apollo server
    resolvers: // Correctly named 'typeDefs' for the Apollo server
    schemas_1.resolvers, // Correctly named 'resolvers'
});
// Start Apollo Server
const startApolloServer = () => __awaiter(void 0, void 0, void 0, function* () {
    // Start the Apollo server
    yield server.start();
    // Middleware for handling requests
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.json());
    // Enable CORS (with specific options if needed)
    app.use((0, cors_1.default)({
        origin: '*', // Adjust according to your frontend's domain in production
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    }));
    // Apollo Server Middleware (attaching Apollo server to Express)
    server.applyMiddleware({ app });
    // Use custom chat API route
    app.use('./routes/chatRoutes', chatRoutes_1.default);
    // Handle production environment (serving static files)
    if (process.env.NODE_ENV === 'production') {
        app.use(express_1.default.static(path_1.default.join(__dirname, '../client/dist')));
        app.get('*', (_req, res) => {
            res.sendFile(path_1.default.join(__dirname, '../client/dist/index.html'));
        });
    }
    // MongoDB connection error handling
    db_1.default.on('error', console.error.bind(console, 'MongoDB connection error'));
    // Start the server
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}.`);
        console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
        console.log(`REST API endpoint: http://localhost:${PORT}/api/chat`);
    });
});
// Start the server
startApolloServer();
