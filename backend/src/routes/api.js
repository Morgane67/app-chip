// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const exceljs = require('exceljs');

// const router = express.Router();

// // Connexion à MongoDB
// mongoose.connect('mongodb://localhost:27017/animal_chip_db', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

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

// router.use(bodyParser.json());

// // Route pour ajouter une puce
// router.post('/chips', async (req, res) => {
//   const { chipNumber, date, position, gender, weight, size, comments } = req.body;
//   const chip = new Chip({ chipNumber, date: new Date(date), position, gender, weight, size, comments });
//   try {
//     const newChip = await chip.save();
//     res.status(201).json(newChip);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // Route pour obtenir toutes les puces
// router.get('/chips', async (req, res) => {
//   try {
//     const chips = await Chip.find();
//     res.json(chips);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Route pour récupérer l'historique des puces
// router.get('/history', async (req, res) => {
//   try {
//     const history = await Chip.find({});
//     res.json(history);
//   } catch (err) {
//     console.error('Error:', err);
//     res.status(500).json({ message: 'Erreur lors de la récupération des données' });
//   }
// });

// // Route pour exporter l'historique en Excel
// router.get('/export', async (req, res) => {
//   try {
//     const chips = await Chip.find({});
//     const workbook = new exceljs.Workbook();
//     const worksheet = workbook.addWorksheet('Historique');

//     worksheet.columns = [
//       { header: 'Numéro de la puce', key: 'chipNumber', width: 20 },
//       { header: 'Date', key: 'date', width: 20 },
//       { header: 'Latitude', key: 'latitude', width: 20 },
//       { header: 'Longitude', key: 'longitude', width: 20 },
//       { header: 'Genre', key: 'gender', width: 10 },
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
//     console.error('Error:', err);
//     res.status(500).json({ message: 'Erreur lors de l\'exportation des données' });
//   }
// });

// // Route pour rechercher une puce par son numéro
// router.get('/chips/:chipNumber', async (req, res) => {
//   const { chipNumber } = req.params;
//   try {
//     const chip = await Chip.findOne({ chipNumber });
//     if (chip) {
//       res.json(chip);
//     } else {
//       res.status(404).json({ message: 'Puce non trouvée' });
//     }
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// module.exports = router;

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const exceljs = require('exceljs');

const router = express.Router();

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/animal_chip_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Définition du schéma et du modèle
const chipSchema = new mongoose.Schema({
  chipNumber: String,
  date: Date,
  position: {
    latitude: Number,
    longitude: Number
  },
  gender: String,
  weight: Number,
  size: Number,
  comments: String
});

const Chip = mongoose.model('Chip', chipSchema);

router.use(bodyParser.json());

// Route pour ajouter une puce
router.post('/chips', async (req, res) => {
  const { chipNumber, date, position, gender, weight, size, comments } = req.body;
  const chip = new Chip({ chipNumber, date: new Date(date), position, gender, weight, size, comments });
  try {
    const newChip = await chip.save();
    res.status(201).json(newChip);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route pour obtenir toutes les puces
router.get('/chips', async (req, res) => {
  try {
    const chips = await Chip.find();
    res.json(chips);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route pour récupérer l'historique des puces
router.get('/history', async (req, res) => {
  try {
    const history = await Chip.find({});
    res.json(history);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Erreur lors de la récupération des données' });
  }
});

// Route pour exporter l'historique en Excel
router.get('/export', async (req, res) => {
  try {
    const chips = await Chip.find({});
    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet('Historique');

    worksheet.columns = [
      { header: 'Numéro de la puce', key: 'chipNumber', width: 20 },
      { header: 'Date', key: 'date', width: 20 },
      { header: 'Latitude', key: 'latitude', width: 20 },
      { header: 'Longitude', key: 'longitude', width: 20 },
      { header: 'Genre', key: 'gender', width: 10 },
      { header: 'Poids', key: 'weight', width: 10 },
      { header: 'Taille', key: 'size', width: 10 },
      { header: 'Commentaires', key: 'comments', width: 30 }
    ];

    chips.forEach(chip => {
      worksheet.addRow({
        chipNumber: chip.chipNumber,
        date: chip.date.toISOString(),
        latitude: chip.position.latitude,
        longitude: chip.position.longitude,
        gender: chip.gender,
        weight: chip.weight,
        size: chip.size,
        comments: chip.comments
      });
    });

    res.setHeader('Content-Disposition', 'attachment; filename=historique_scans.xlsx');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Erreur lors de l\'exportation des données' });
  }
});

// Route pour rechercher une puce par son numéro
router.get('/chips/:chipNumber', async (req, res) => {
  const { chipNumber } = req.params;
  try {
    const chip = await Chip.findOne({ chipNumber });
    if (chip) {
      res.json(chip);
    } else {
      res.status(404).json({ message: 'Puce non trouvée' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;





