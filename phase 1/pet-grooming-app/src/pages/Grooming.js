import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Grooming() {
  const [groomingServices, setGroomingServices] = useState([]);

  useEffect(() => {
    // Fetching data from the mock API
    axios.get('http://localhost:3000/groomingServices')
      .then(response => {
        setGroomingServices(response.data);
      })
      .catch(error => console.error('Error fetching grooming services:', error));
  }, []);

  return (
    <div className="container">
      <h1>Grooming Services</h1>
      <p>We offer a variety of grooming services for your furry friends!</p>
      <ul>
        {groomingServices.map(service => (
          <li key={service.id}>
            <strong>{service.name}</strong>: {service.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Grooming;
