
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DatabasePage = () => {
  const [chips, setChips] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/chips')
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok ' + res.statusText);
        }
        return res.json();
      })
      .then(data => setChips(data))
      .catch(error => console.error('There was a problem with your fetch operation:', error));
  }, []);

  return (
    <div className="database-page">
      <button onClick={() => navigate(-1)}>← Retour</button>
      <h1>Base de données des puces</h1>
      <ul>
        {chips.map(chip => (
          <li key={chip._id}>
            <strong>Numéro de puce :</strong> {chip.chipNumber} <br />
            <strong>Nom de l'animal :</strong> {chip.animalName} <br />
            <strong>Nom du propriétaire :</strong> {chip.ownerName} <br />
            <strong>Contact :</strong> {chip.contactInfo}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DatabasePage;
