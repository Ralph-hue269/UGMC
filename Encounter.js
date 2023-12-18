import {Router} from "express"


app.post('/encounters', async (req, res) => {
    try {

      res.status(201).json({ message: 'Encounter started successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  