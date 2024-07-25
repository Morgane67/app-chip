

// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const exceljs = require('exceljs');
// const cors = require('cors'); // Importer le module CORS

// const app = express();
// const port = 5000;

// // Connexion à MongoDB
// mongoose.connect('mongodb://localhost:27017/animal_chip_db').catch(err => {
//   console.error('Erreur de connexion à MongoDB:', err.message);
//   process.exit(1);
// });

// // Définition du schéma et du modèle
// const chipSchema = new mongoose.Schema({
//   chipNumber: String,
//   date: Date,
//   position: {
//     latitude: Number,
//     longitude: Number
//   }
// });

// const Chip = mongoose.model('Chip', chipSchema);

// // Middleware pour gérer les données JSON
// app.use(bodyParser.json());

// // Middleware CORS
// app.use(cors()); // Ajoutez cette ligne pour permettre les requêtes CORS

// // Route pour récupérer l'historique des scans
// app.get('/api/history', async (req, res) => {
//   try {
//     const history = await Chip.find({});
//     res.json(history);
//   } catch (err) {
//     console.error('Erreur lors de la récupération des données:', err.message);
//     res.status(500).json({ message: 'Erreur lors de la récupération des données' });
//   }
// });

// // Route pour exporter les données en fichier Excel
// app.get('/api/export', async (req, res) => {
//   try {
//     const chips = await Chip.find({});
//     const workbook = new exceljs.Workbook();
//     const worksheet = workbook.addWorksheet('Historique');

//     worksheet.columns = [
//       { header: 'Numéro de la puce', key: 'chipNumber', width: 20 },
//       { header: 'Date', key: 'date', width: 20 },
//       { header: 'Latitude', key: 'latitude', width: 20 },
//       { header: 'Longitude', key: 'longitude', width: 20 }
//     ];

//     chips.forEach(chip => {
//       worksheet.addRow({
//         chipNumber: chip.chipNumber,
//         date: chip.date.toISOString(),
//         latitude: chip.position.latitude,
//         longitude: chip.position.longitude
//       });
//     });

//     res.setHeader('Content-Disposition', 'attachment; filename=historique_scans.xlsx');
//     res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
//     await workbook.xlsx.write(res);
//     res.end();
//   } catch (err) {
//     console.error('Erreur lors de l\'exportation des données:', err.message);
//     res.status(500).json({ message: 'Erreur lors de l\'exportation des données' });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });




//------------------------------------------------------------------TEST-----------------------------------------------------------------------

// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const exceljs = require('exceljs');
// const apiRoutes = require('./routes/api');

// const app = express();
// const port = 5000;

// // Connexion à MongoDB
// mongoose.connect('mongodb://localhost:27017/animal_chip_db')
//   .catch(err => {
//     console.error('Erreur de connexion à MongoDB:', err.message);
//     process.exit(1);
//   });


// // Définition du schéma et du modèle
// const chipSchema = new mongoose.Schema({
//   chipNumber: String,
//   date: Date,
//   position: {
//     latitude: Number,
//     longitude: Number
//   },
//   gender: String,
//   weight: Number,
//   size: Number,
//   comments: String
// });

// const Chip = mongoose.model('Chip', chipSchema);

// // Middleware pour gérer les données JSON et CORS
// app.use(bodyParser.json());
// app.use(cors()); // Assurez-vous que CORS est activé

// // Endpoint de test pour récupérer des données fictives
// app.get('/api/test', async (req, res) => {
//   try {
//     // Données fictives
//     const testData = [
//       {
//         chipNumber: '1234567890',
//         date: new Date(),
//         position: {
//           latitude: 48.8566,
//           longitude: 2.3522
//         },
//         gender: 'Male',
//         weight: 5.4,
//         size: 25.0,
//         comments: 'Commentaire exemple 1'
//       },
//       {
//         chipNumber: '0987654321',
//         date: new Date(),
//         position: {
//           latitude: 34.0522,
//           longitude: -118.2437
//         },
//         gender: 'Female',
//         weight: 6.7,
//         size: 30.0,
//         comments: 'Commentaire exemple 2'
//       }
//     ];
//     res.json(testData);
//   } catch (err) {
//     console.error('Erreur lors de la récupération des données:', err.message);
//     res.status(500).json({ message: 'Erreur lors de la récupération des données' });
//   }
// });

// // Route pour récupérer l'historique des scans
// app.get('/api/history', async (req, res) => {
//   try {
//     const history = await Chip.find({});
//     res.json(history);
//   } catch (err) {
//     console.error('Erreur lors de la récupération des données:', err.message);
//     res.status(500).json({ message: 'Erreur lors de la récupération des données' });
//   }
// });

// // Route pour exporter les données en fichier Excel
// app.get('/api/export', async (req, res) => {
//   try {
//     const chips = await Chip.find({});
//     const workbook = new exceljs.Workbook();
//     const worksheet = workbook.addWorksheet('Historique');

//     worksheet.columns = [
//       { header: 'Numéro de la puce', key: 'chipNumber', width: 20 },
//       { header: 'Date', key: 'date', width: 20 },
//       { header: 'Latitude', key: 'latitude', width: 20 },
//       { header: 'Longitude', key: 'longitude', width: 20 },
//       { header: 'Sexe', key: 'gender', width: 10 },
//       { header: 'Poids', key: 'weight', width: 10 },
//       { header: 'Taille', key: 'size', width: 10 },
//       { header: 'Commentaires', key: 'comments', width: 30 }
//     ];

//     chips.forEach(chip => {
//       worksheet.addRow({
//         chipNumber: chip.chipNumber,
//         date: chip.date.toISOString(),
//         latitude: chip.position.latitude,
//         longitude: chip.position.longitude,
//         gender: chip.gender,
//         weight: chip.weight,
//         size: chip.size,
//         comments: chip.comments
//       });
//     });

//     res.setHeader('Content-Disposition', 'attachment; filename=historique_scans.xlsx');
//     res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
//     await workbook.xlsx.write(res);
//     res.end();
//   } catch (err) {
//     console.error('Erreur lors de l\'exportation des données:', err.message);
//     res.status(500).json({ message: 'Erreur lors de l\'exportation des données' });
//   }
// });

// // Route pour récupérer toutes les puces
// app.get('/api/chips', async (req, res) => {
//   try {
//     const chips = await Chip.find({});
//     res.json(chips);
//   } catch (error) {
//     console.error('Erreur lors de la récupération des puces:', error.message);
//     res.status(500).json({ message: 'Erreur lors de la récupération des puces' });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');  // Import cors
const apiRoutes = require('./routes/api');

const app = express();
const port = 5000;

// Configuration de CORS pour autoriser les requêtes provenant de votre application React
app.use(cors({ origin: 'http://localhost:3000' }));  // Assurez-vous que l'origine est correcte

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/animal_chip_db')
  .catch(err => {
    console.error('Erreur de connexion à MongoDB:', err.message);
    process.exit(1);
  });

// Middleware pour gérer les données JSON et CORS
app.use(bodyParser.json());

// Utilisation des routes définies dans api.js
app.use('/api', apiRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


