import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import ConnectPage from './components/ConnectPage';
import HistoryPage from './components/HistoryPage';
import DatabasePage from './components/DatabasePage';
import AddChipPage from './components/AddChipPage';
import './App.css';

function App() {

  return (
    

    
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/connect" element={<ConnectPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/database" element={<DatabasePage />} />
          <Route path="/add-chip" element={<AddChipPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
