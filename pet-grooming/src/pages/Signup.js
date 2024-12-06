import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'owner',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Determine the correct API endpoint based on user role
    const endpoint =
      user.role === 'owner'
        ? 'http://localhost:5000/owners'
        : 'http://localhost:5000/groomers';

    // Create user object to send to the server
    const newUser = {
      ...user,
      notifications: [],
      requests: [],
    };

    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to signup');
        }
        return response.json();
      })
      .then((data) => {
        alert('Signup successful');
        if (user.role === 'owner') {
          navigate('/profile-owner'); // Navigate to the owner profile page
        } else {
          navigate('/profile-groomer'); // Navigate to the groomer profile page
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred during signup');
      });
  };

  return (
    <div className="signup">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Role</label>
          <select
            name="role"
            value={user.role}
            onChange={handleChange}
            className="form-control"
          >
            <option value="owner">Pet Owner</option>
            <option value="groomer">Groomer</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
