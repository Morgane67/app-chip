// const express = require('express');
// const mongoose = require('mongoose');
// const excel = require('exceljs'); // Assure-toi que exceljs est installé

// const app = express();
// const port = process.env.PORT || 5000;

// // Connexion à la base de données MongoDB
// mongoose.connect('mongodb://localhost:27017/animalChips', { useNewUrlParser: true, useUnifiedTopology: true });

// // Schéma de la puce animale
// const chipSchema = new mongoose.Schema({
//     chipNumber: String,
//     animalName: String,
//     ownerName: String,
//     contactInfo: String,
// });

// const Chip = mongoose.model('Chip', chipSchema);

// // Schéma du scan (ajoute les champs requis)
// const scanSchema = new mongoose.Schema({
//     chipNumber: String,
//     date: { type: Date, default: Date.now },
//     position: {
//         latitude: String,
//         longitude: String
//     }
// });

// const Scan = mongoose.model('Scan', scanSchema);

// // Middleware pour gérer les données JSON
// app.use(express.json());

// // Route pour ajouter une puce
// app.post('/api/chips', async (req, res) => {
//     const { chipNumber, animalName, ownerName, contactInfo } = req.body;
//     const chip = new Chip({ chipNumber, animalName, ownerName, contactInfo });
//     try {
//         const newChip = await chip.save();
//         res.status(201).json(newChip);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });

// // Route pour obtenir toutes les puces
// app.get('/api/chips', async (req, res) => {
//     try {
//         const chips = await Chip.find();
//         res.json(chips);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// // Route pour ajouter un scan
// app.post('/api/scans', async (req, res) => {
//     const { chipNumber, date, position } = req.body;
//     const scan = new Scan({ chipNumber, date, position });
//     try {
//         const newScan = await scan.save();
//         res.status(201).json(newScan);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });

// // Route pour récupérer les scans
// app.get('/api/scans', async (req, res) => {
//     try {
//         const scans = await Scan.find();
//         res.json(scans);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// // Route pour récupérer l'historique des scans
// app.get('/api/history', async (req, res) => {
//     try {
//         const history = await Scan.find().select('chipNumber date position');
//         res.json(history);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// // Route pour exporter l'historique en Excel
// app.get('/api/export', async (req, res) => {
//     try {
//         const history = await Scan.find().select('chipNumber date position');
        
//         const workbook = new excel.Workbook();
//         const worksheet = workbook.addWorksheet('Historique');

//         worksheet.columns = [
//             { header: 'Numéro de la puce', key: 'chipNumber', width: 20 },
//             { header: 'Date', key: 'date', width: 20 },
//             { header: 'Position GPS', key: 'position', width: 30 }
//         ];

//         worksheet.addRows(history.map(record => ({
//             chipNumber: record.chipNumber,
//             date: new Date(record.date).toLocaleString(),
//             position: `Latitude ${record.position.latitude}, Longitude ${record.position.longitude}`
//         })));

//         res.setHeader('Content-Disposition', 'attachment; filename=historique_scans.xlsx');
//         res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

//         await workbook.xlsx.write(res);
//         res.end();
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// // Démarre le serveur
// app.listen(port, () => {
//     console.log(`Server running on http://localhost:${port}`);
// });

// backend/src/server.js

// backend/src/server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const exceljs = require('exceljs');

const app = express();
const port = 5000;

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/animal_chip_db').catch(err => {
  console.error('Erreur de connexion à MongoDB:', err.message);
  process.exit(1);
});

// Définition du schéma et du modèle
const chipSchema = new mongoose.Schema({
  chipNumber: String,
  date: Date,
  position: {
    latitude: Number,
    longitude: Number
  }
});

const Chip = mongoose.model('Chip', chipSchema);

// Middleware pour gérer les données JSON
app.use(bodyParser.json());

// Route pour récupérer l'historique des scans
app.get('/api/history', async (req, res) => {
  try {
    const history = await Chip.find({});
    res.json(history);
  } catch (err) {
    console.error('Erreur lors de la récupération des données:', err.message);
    res.status(500).json({ message: 'Erreur lors de la récupération des données' });
  }
});

// Route pour exporter les données en fichier Excel
app.get('/api/export', async (req, res) => {
  try {
    const chips = await Chip.find({});
    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet('Historique');

    worksheet.columns = [
      { header: 'Numéro de la puce', key: 'chipNumber', width: 20 },
      { header: 'Date', key: 'date', width: 20 },
      { header: 'Latitude', key: 'latitude', width: 20 },
      { header: 'Longitude', key: 'longitude', width: 20 }
    ];

    chips.forEach(chip => {
      worksheet.addRow({
        chipNumber: chip.chipNumber,
        date: chip.date.toISOString(),
        latitude: chip.position.latitude,
        longitude: chip.position.longitude
      });
    });

    res.setHeader('Content-Disposition', 'attachment; filename=historique_scans.xlsx');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    console.error('Erreur lors de l\'exportation des données:', err.message);
    res.status(500).json({ message: 'Erreur lors de l\'exportation des données' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
