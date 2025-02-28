import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import { typeDefs, resolvers } from './schemas/index.js';
import connectDB from './config/db.js';
import bugRoutes from './routes/bugRoutes.js';

dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();

// Connect to MongoDB
connectDB();

// Initialize ApolloServer with GraphQL schema
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());  // Middleware to parse JSON bodies
  
  app.use(cors({
    origin: 'http://localhost:4173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));
  
  app.use('/api/bugs', bugRoutes); // Mount the bug routes
  app.use('/api/auth', authRoutes);  // Mount the authentication routes
  app.use('/api/generateText', chatRoutes);

  // Apollo Server Middleware
  server.applyMiddleware({ app });

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    console.log(`REST API endpoint: http://localhost:${PORT}/generateText`);
  });
};

startApolloServer();
