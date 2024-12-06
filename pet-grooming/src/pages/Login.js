import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();
 const [loggedInUser] = useState(JSON.parse(localStorage.getItem('user')));
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check both groomers and owners
    Promise.all([
      fetch('http://localhost:5000/owners').then((res) => res.json()),
      fetch('http://localhost:5000/groomers').then((res) => res.json()),
    ])
      .then(([groomers, owners]) => {
        const user =
          groomers.find(
            (groomer) =>
              groomer.email === credentials.email &&
              groomer.password === credentials.password
          ) ||
          owners.find(
            (owner) =>
              owner.email === credentials.email &&
              owner.password === credentials.password
          );

        if (user) {
          // Store user data and ID in localStorage for later use
          localStorage.setItem('user', JSON.stringify(user));

          // Redirect based on user role (owner or groomer)
          if (user.role === 'owner') {
            navigate(`/profile-owner/${loggedInUser.id}`);
          } else if (user.role === 'groomer') {
            navigate(`/profile-groomer/${user.id}`); // Use dynamic URL for groomer profile
          }
        } else {
          alert('Invalid credentials. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={credentials.email}
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
            value={credentials.password}
            onChange={handleChange}
            className="form-control"
            required
            
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
