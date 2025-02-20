import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import chatRoutes from './routes/chatRoutes'; 
import { typeDefs, resolvers } from './schemas';  // Ensure correct import for typeDefs and resolvers
import db from './config/db';  // Ensure the correct MongoDB connection import

dotenv.config();

// Setup the server
const PORT = process.env.PORT || 3001;
const app = express();

// Initialize ApolloServer with GraphQL schema
const server = new ApolloServer({
  typeDefs,    // Correctly named 'typeDefs' for the Apollo server
  resolvers,   // Correctly named 'resolvers'
});

// Start Apollo Server
const startApolloServer = async () => {
  // Start the Apollo server
  await server.start();

  // Middleware for handling requests
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Enable CORS (with specific options if needed)
  app.use(cors({
    origin: '*',  // Adjust according to your frontend's domain in production
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

  // Apollo Server Middleware (attaching Apollo server to Express)
  server.applyMiddleware({ app });

  // Use custom chat API route
  app.use('./routes/chatRoutes', chatRoutes);

  // Handle production environment (serving static files)
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  // MongoDB connection error handling
  db.on('error', console.error.bind(console, 'MongoDB connection error'));

  // Start the server
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}.`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    console.log(`REST API endpoint: http://localhost:${PORT}/api/chat`);
  });
};

// Start the server
startApolloServer();
