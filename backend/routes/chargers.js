const express = require('express');
   const authMiddleware = require('../middleware/auth');
   const Charger = require('../models/Charger');
   const router = express.Router();

   // Create Charger
   router.post('/', authMiddleware, async (req, res) => {
     try {
       const charger = new Charger(req.body);
       await charger.save();
       res.status(201).json(charger);
     } catch (err) {
       res.status(400).json({ message: err.message });
     }
   });

   // Read All Chargers
   router.get('/', async (req, res) => {
     try {
       const chargers = await Charger.find();
       res.json(chargers);
     } catch (err) {
       res.status(500).json({ message: err.message });
     }
   });

   // Update Charger
   router.put('/:id', authMiddleware, async (req, res) => {
     try {
       const charger = await Charger.findByIdAndUpdate(req.params.id, req.body, { new: true });
       if (!charger) {
         return res.status(404).json({ message: 'Charger not found' });
       }
       res.json(charger);
     } catch (err) {
       res.status(400).json({ message: err.message });
     }
   });

   // Delete Charger
   router.delete('/:id', authMiddleware, async (req, res) => {
     try {
       const charger = await Charger.findByIdAndDelete(req.params.id);
       if (!charger) {
         return res.status(404).json({ message: 'Charger not found' });
       }
       res.json({ message: 'Charger deleted' });
     } catch (err) {
       res.status(500).json({ message: err.message });
     }
   });

   module.exports = router;