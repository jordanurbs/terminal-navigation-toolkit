import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Challenge from '../src/models/Challenge.js';
import Progress from '../src/models/Progress.js';
import { challenges } from '../src/data/challenges.js';
import challengeController from './controllers/challengeController.js';

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Configure MongoDB Memory Server
const startServer = async () => {
  try {
    const mongod = await MongoMemoryServer.create({
      instance: {
        port: 27017,
        dbName: 'terminal_toolkit',
      },
      binary: {
        version: '5.0.18',
        downloadDir: './.cache/mongodb-binaries',
        checkMD5: false,
      }
    });
    
    const mongoUri = mongod.getUri();
    
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log('Connected to MongoDB Memory Server');
    await seedDatabase();
    
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    // Cleanup on process termination
    process.on('SIGINT', async () => {
      await mongod.stop();
      process.exit(0);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

// API key validation middleware
const validateApiKey = async (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  
  if (!apiKey) {
    return res.status(401).json({ error: 'API key is required' });
  }
  
  try {
    const validationEndpoint = 'https://toolkit.ai-captains.com/.netlify/functions/validate';
    
    const response = await fetch(validationEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey
      }
    });

    if (!response.ok) {
      return res.status(401).json({ error: 'Invalid API key' });
    }

    const data = await response.json();
    if (!data.valid) {
      return res.status(401).json({ error: 'Invalid API key' });
    }

    req.user = {
      id: data.userId || apiKey, // Fallback to using API key as userId if not provided
      apiKey: apiKey
    };
    return next();
  } catch (error) {
    console.error('Error validating API key:', error);
    // If validation server is unreachable, fall back to local validation
    // This allows offline usage if the key was previously validated
    if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
      console.log('Validation server unreachable, falling back to local validation');
      req.user = {
        id: apiKey,
        apiKey: apiKey
      };
      return next();
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Challenge Routes
app.get('/api/challenges', validateApiKey, challengeController.getChallenges);

// Legacy Routes
app.get('/api/challenges/:day', validateApiKey, async (req, res) => {
  try {
    const challenge = await Challenge.findOne({ day: req.params.day });
    if (!challenge) {
      return res.status(404).json({ error: 'Challenge not found' });
    }
    res.json(challenge);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Progress tracking endpoints (local)
app.post('/api/progress', validateApiKey, async (req, res) => {
  const { day, completed, tasks } = req.body;
  const userId = req.user.id;
  
  if (!day) {
    return res.status(400).json({ error: 'Day parameter is required' });
  }
  
  try {
    // Update progress in local MongoDB
    const progress = await Progress.findOneAndUpdate(
      { userId, day },
      {
        userId,
        day,
        completed: completed || false,
        tasks: tasks || {},
        updatedAt: new Date()
      },
      { upsert: true, new: true }
    );
    
    res.json({
      success: true,
      message: 'Progress updated successfully',
      data: progress
    });
  } catch (error) {
    console.error('Error updating progress:', error);
    res.status(500).json({ error: 'Failed to update progress' });
  }
});

app.get('/api/progress', validateApiKey, async (req, res) => {
  const userId = req.user.id;
  
  try {
    const progress = await Progress.find({ userId }).sort('day');
    res.json({
      success: true,
      data: progress
    });
  } catch (error) {
    console.error('Error fetching progress:', error);
    res.status(500).json({ error: 'Failed to fetch progress' });
  }
});

app.post('/api/challenges/:day/tasks/:taskId', validateApiKey, async (req, res) => {
  try {
    const challenge = await Challenge.findOne({ day: req.params.day });
    if (!challenge) {
      return res.status(404).json({ error: 'Challenge not found' });
    }
    
    const task = challenge.tasks.id(req.params.taskId);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    task.isCompleted = req.body.completed;
    await challenge.save();
    
    // Update progress in local storage
    await Progress.findOneAndUpdate(
      { userId: req.user.id, day: req.params.day },
      {
        $set: {
          [`tasks.${req.params.taskId}`]: req.body.completed
        },
        updatedAt: new Date()
      },
      { upsert: true }
    );
    
    res.json(challenge);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Database seeding function
async function seedDatabase() {
  try {
    const count = await Challenge.countDocuments();
    if (count === 0) {
      console.log('Seeding database...');
      await Challenge.insertMany(challenges);
      console.log('Database seeded successfully');
    } else {
      console.log('Database already contains data, skipping seed');
    }
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}

startServer();