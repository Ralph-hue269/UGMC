const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());

// MongoDB connection setup
mongoose.connect('mongodb://localhost:27017/ugmc', { useNewUrlParser: true, useUnifiedTopology: true });

// Define Patient schema
const patientSchema = new mongoose.Schema({
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

const Patient = mongoose.model('Patient', patientSchema);

// Define Encounter schema
const encounterSchema = new mongoose.Schema({
  patientID: String,
  dateTime: Date,
  encounterType: String
});

const Encounter = mongoose.model('Encounter', encounterSchema);

// Define Vitals schema
const vitalsSchema = new mongoose.Schema({
  patientID: String,
  bloodPressure: String,
  temperature: String,
  pulse: String,
  spO2: String
});

const Vitals = mongoose.model('Vitals', vitalsSchema);

// Endpoint for registering patients
app.post('/patients', async (req, res) => {
  try {
    const patient = new Patient(req.body);
    const savedPatient = await patient.save();
    res.status(201).json(savedPatient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint for starting an encounter
app.post('/encounters', async (req, res) => {
  try {
    const encounter = new Encounter(req.body);
    const savedEncounter = await encounter.save();
    res.status(201).json(savedEncounter);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint for submitting patient vitals
app.post('/vitals', async (req, res) => {
  try {
    const vitals = new Vitals(req.body);
    const savedVitals = await vitals.save();
    res.status(201).json(savedVitals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint for viewing list of patients
app.get('/patients', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint for viewing details of a specific patient
app.get('/patient)
