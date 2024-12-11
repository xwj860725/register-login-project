import React from 'react';
import '../App.css'; 

const Profil = ({ username }) => {
    return (
        <div className="container">
            {/* user avatar */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <img
                    src={require('../assets/images/u3.jpg')} // Introducing avatar images
                    alt="Profil"
                    style={{
                        width: '150px',
                        height: '150px',
                        borderRadius: '50%', // Circle Style
                        objectFit: 'cover', // Keep the image content intact
                    }}
                />
            </div>

            {/* Welcome Message */}
            <h1 style={{ textAlign: 'center', fontWeight: 'bold' }}>
                Welcome back {username}!
            </h1>
        </div>
    );
};

export default Profil;
