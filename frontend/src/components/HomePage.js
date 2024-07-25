
import React from 'react';
import { Link } from 'react-router-dom';
import "../css/HomePage.css"
import img1 from '../assets/image/img1.jpg';

 

const HomePage = () => {
    return (
        <div className="home-page">
            <div className="img-container">
            <img src={img1} alt="Animal Chip" className="img1" />
            </div>
            
            <h1>Animal Chip App</h1>
            <div className="buttons">
                <Link to="/connect">
                    <button>Connexion</button>
                </Link>
                <Link to="/history">
                    <button>Historiques des scans</button>
                </Link>
                <Link to="/database">
                    <button>Base de données</button>
                </Link>
            </div>
        </div>
    );
}

export default HomePage;
