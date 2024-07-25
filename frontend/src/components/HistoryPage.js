import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fonction pour récupérer l'historique des scans
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch('/api/history');
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        setHistory(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []); // Le tableau vide assure que le fetch se fait uniquement lors du premier rendu

  // Fonction pour télécharger l'historique en format Excel
  const downloadExcel = async () => {
    try {
      const response = await fetch('/api/export');
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'historique_scans.xlsx';
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading Excel file:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="history-page">
      <button onClick={() => navigate(-1)}>← Retour</button>
      <h1>Historique des Scans</h1>
      <button onClick={downloadExcel}>Télécharger l'historique en Excel</button>
      <ul>
        {history.map((record, index) => (
          <li key={index}>
            <p>Numéro de la puce : {record.chipNumber}</p>
            <p>Date : {new Date(record.date).toLocaleString()}</p>
            {/* <p>Position GPS : Latitude {record.position.latitude}, Longitude {record.position.longitude}</p> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryPage;
