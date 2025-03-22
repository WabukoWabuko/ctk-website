import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Rotas = () => {
  const [rotas, setRotas] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/rotas/')
      .then(response => setRotas(response.data))
      .catch(error => console.error('Error fetching rotas:', error));
  }, []);

  return (
    <div className="container my-5">
      <div className="hero">
        <h1>Service Rotas</h1>
        <p>Who’s serving in our worship this week.</p>
      </div>
      <div className="row">
        {rotas.map(rota => (
          <div className="col-md-4 mb-4" key={rota.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{rota.title}</h5>
                <p>{new Date(rota.date).toLocaleDateString()}</p>
                <p>{rota.details}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rotas;
