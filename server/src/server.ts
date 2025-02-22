import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import chatRoutes from './routes/chatRoutes'; 
import { typeDefs, resolvers } from './schemas';  // Ensure correct import for typeDefs and resolvers
import connectDB from './config/db';  // Import your connectDB function

dotenv.config();

// Setup the server
const PORT = process.env.PORT || 3001;
const app = express();

// Connect to MongoDB
connectDB();  // Call connectDB() to establish a connection

// Initialize ApolloServer with GraphQL schema
const server = new ApolloServer({
  typeDefs,    // Corrected to lowercase 'typeDefs'
  resolvers,   // Corrected to lowercase 'resolvers'
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
  app.use('/generateText', chatRoutes);  // Corrected route to '/api/chat'

  // Handle production environment (serving static files)
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  // Start the server
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}.`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    console.log(`REST API endpoint: http://localhost:${PORT}/generateText`);  // Corrected route to '/generateText'
  });
};

// Start the server
startApolloServer();
