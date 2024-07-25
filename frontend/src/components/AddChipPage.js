
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddChipPage = () => {
  const [chipNumber, setChipNumber] = useState('');
  const [date, setDate] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [gender, setGender] = useState('');
  const [weight, setWeight] = useState('');
  const [size, setSize] = useState('');
  const [comments, setComments] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newChip = {
      chipNumber,
      date,
      position: {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      },
      gender,
      weight: parseFloat(weight),
      size: parseFloat(size),
      comments
    };

    try {
      const response = await fetch('/api/add-chip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newChip),
      });

      if (response.ok) {
        alert('Enregistrement ajouté avec succès');
        navigate('/database');
      } else {
        alert('Erreur lors de l\'ajout de l\'enregistrement');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Erreur lors de l\'ajout de l\'enregistrement');
    }
  };

  return (
    <div className="add-chip-page">
      <button onClick={() => navigate(-1)}>← Retour</button>
      <h1>Ajouter une nouvelle puce</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Numéro de la puce:</label>
          <input type="text" value={chipNumber} onChange={(e) => setChipNumber(e.target.value)} required />
        </div>
        <div>
          <label>Date d'implantation:</label>
          <input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <div>
          <label>Latitude:</label>
          <input type="text" value={latitude} onChange={(e) => setLatitude(e.target.value)} required />
        </div>
        <div>
          <label>Longitude:</label>
          <input type="text" value={longitude} onChange={(e) => setLongitude(e.target.value)} required />
        </div>
        <div>
          <label>Sexe:</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)} required>
            <option value="">Sélectionner</option>
            <option value="Male">Mâle</option>
            <option value="Female">Femelle</option>
          </select>
        </div>
        <div>
          <label>Poids:</label>
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} required />
        </div>
        <div>
          <label>Taille:</label>
          <input type="number" value={size} onChange={(e) => setSize(e.target.value)} required />
        </div>
        <div>
          <label>Commentaires:</label>
          <textarea value={comments} onChange={(e) => setComments(e.target.value)}></textarea>
        </div>
        <div>
          <button type="button" onClick={() => navigate('/database')}>Annuler</button>
          <button type="submit">Valider et Enregistrer</button>
        </div>
      </form>
    </div>
  );
};

export default AddChipPage;
