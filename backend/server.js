const express = require('express');
   const mongoose = require('mongoose');
   const cors = require('cors');
   const dotenv = require('dotenv');
   const authRoutes = require('./routes/auth');
   const chargerRoutes = require('./routes/chargers');

   dotenv.config();
   const app = express();

   // Middleware
   app.use(cors());
   app.use(express.json());

   // Routes
   app.use('/api/auth', authRoutes);
   app.use('/api/chargers', chargerRoutes);

   // MongoDB Connection
   mongoose.connect(process.env.MONGODB_URI, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
   })
     .then(() => console.log('MongoDB connected'))
     .catch((err) => console.error('MongoDB connection error:', err));

   // Start Server
   const PORT = process.env.PORT || 5000;
   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));