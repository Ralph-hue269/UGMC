const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());

// MongoDB connection setup
mongoose.connect('mongodb://localhost:3000/ugmc', { useNewUrlParser: true, useUnifiedTopology: true });

// Define Patient schema
const submittingSchema = new mongoose.Schema({
  surname: String,
  otherNames: String,
  gender: String,
  phoneNumber: String,
  residentialAddress: String,
  emergencyContact: {
    name: String,
    contact: String,
    relationship: String
  }
});

const Submitting = mongoose.model('Patient', submittingSchema);

app.post('/vitals', async (req, res) => {
    try {

      res.status(201).json({ message: 'Vitals submitted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  