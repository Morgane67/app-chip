
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ConnectPage = () => {
  const [devices, setDevices] = useState([]);
  const [connectedDevice, setConnectedDevice] = useState(null);
  const [server, setServer] = useState(null);
  const [chipNumber, setChipNumber] = useState('');
  const [error, setError] = useState('');
  const [gpsPosition, setGpsPosition] = useState(null);
  const navigate = useNavigate();

  // Fonction pour obtenir la position GPS
  const getGpsPosition = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
          },
          error => reject(error)
        );
      } else {
        reject('Géolocalisation non supportée');
      }
    });
  };

  const requestDevice = async () => {
    if (!navigator.bluetooth) {
      setError('L\'API Web Bluetooth n\'est pas disponible dans ce navigateur.');
      return;
    }

    try {
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ['battery_service']
      });

      setConnectedDevice(device);
      setDevices([...devices, device]);

      console.log('Device selected:', device);

      const gattServer = await device.gatt.connect();
      setServer(gattServer);
      console.log('Connected to GATT Server:', gattServer);

      const services = await gattServer.getPrimaryServices();
      for (const service of services) {
        console.log('Service:', service.uuid);
        const characteristics = await service.getCharacteristics();
        for (const characteristic of characteristics) {
          console.log('Characteristic:', characteristic.uuid);

          // Remplace 'YOUR_CHARACTERISTIC_UUID' par l'UUID de la caractéristique contenant le numéro de la puce
          if (characteristic.uuid === 'YOUR_CHARACTERISTIC_UUID') {
            const value = await characteristic.readValue();
            const decoder = new TextDecoder('utf-8');
            const chipNumber = decoder.decode(value);
            setChipNumber(chipNumber);
            console.log('Chip Number:', chipNumber);

            // Obtenir la position GPS
            const position = await getGpsPosition();
            setGpsPosition(position);

            // Envoyer les données au backend
            await fetch('/api/history', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                chipNumber,
                date: new Date().toISOString(),
                position
              }),
            });
          }
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Erreur lors de la recherche d\'appareils Bluetooth.');
    }
  };

  const disconnectDevice = () => {
    if (server) {
      server.disconnect();
      setConnectedDevice(null);
      setServer(null);
      setChipNumber('');
      setGpsPosition(null);
      console.log('Device disconnected');
    } else {
      setError('Aucun appareil connecté à déconnecter.');
    }
  };

  return (
    <div className="connect-page">
       <button onClick={() => navigate(-1)}>← Retour</button>
      <h1>Connexion aux appareils Bluetooth</h1>
      <button onClick={requestDevice}>Rechercher des appareils Bluetooth</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {connectedDevice && (
        <div>
          <h2>Appareil connecté :</h2>
          <p>{connectedDevice.name || 'Appareil sans nom'}</p>
          <p>ID de l'appareil : {connectedDevice.id}</p>
          <button onClick={disconnectDevice}>Déconnecter l'appareil</button>
          {chipNumber && (
            <div>
              <h2>Numéro de la puce :</h2>
              <p>{chipNumber}</p>
              {gpsPosition && (
                <div>
                  <h2>Position GPS :</h2>
                  <p>Latitude : {gpsPosition.latitude}</p>
                  <p>Longitude : {gpsPosition.longitude}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
      <h2>Appareils détectés :</h2>
      <ul>
        {devices.map((device, index) => (
          <li key={index}>
            Nom : {device.name || 'Appareil sans nom'} <br />
            ID : {device.id}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConnectPage;
