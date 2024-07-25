const express = require('express');
const router = express.Router();

// Endpoint de test pour récupérer des données fictives
router.get('/test', async (req, res) => {
  try {
    // Données fictives
    const testData = [
      {
        chipNumber: '1234567890',
        date: new Date(),
        position: {
          latitude: 48.8566,
          longitude: 2.3522
        }
      },
      {
        chipNumber: '0987654321',
        date: new Date(),
        position: {
          latitude: 34.0522,
          longitude: -118.2437
        }
      }
    ];
    res.json(testData);
  } catch (err) {
    console.error('Erreur lors de la récupération des données:', err.message);
    res.status(500).json({ message: 'Erreur lors de la récupération des données' });
  }
});

module.exports = router;
