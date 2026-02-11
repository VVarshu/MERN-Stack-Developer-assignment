const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Routes
const authRoutes = require('./routes/auth');
const agentRoutes = require('./routes/agent');

app.use('/api/auth', authRoutes);
app.use('/api/agents', agentRoutes);

const uploadRoutes = require('./routes/upload');
app.use('/api/upload', uploadRoutes);
app.use('/api/tasks', uploadRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

