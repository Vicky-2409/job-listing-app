import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import jobRoutes from './routes/jobRoutes.js';
import { HttpStatusCodes } from './constants/HttpStatusCodes.js';
import morgan from 'morgan';

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Morgan for logging HTTP requests
// if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
// }

// Routes
app.use('/api/jobs', jobRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Job Listing API is running');
});

app.get('/api/health', (req, res) =>{ res.send('OK')});


// Global Error Handling Middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(err.status || HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
    message: err.message || 'Something went wrong!',
    stack: err.stack || null,
  });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  console.log('Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
