import React, { useState } from 'react';
import './Signup.css'; // Custom styles
import { useNavigate } from 'react-router-dom';
const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const navigate=useNavigate();
  const [isUsernameUnique, setIsUsernameUnique] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false); // For loading state

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    let errors = {};

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords don't match";
    }

    if (!formData.username) {
      errors.username = 'Username is required';
    }

    if (!formData.email) {
      errors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errors.email = 'Invalid email format';
      }
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    return errors;
  };

  const checkUsernameUnique = async (username) => {
    try {
      const response = await fetch(`http://localhost:8080/api/users/check-username?username=${username}`);
      if (!response.ok) throw new Error('Failed to check username uniqueness');
      const isUnique = await response.json();
      return isUnique;
    } catch (error) {
      console.error(error);
      return false; // Assuming username is not unique on error
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      const isUnique = await checkUsernameUnique(formData.username);
      setIsUsernameUnique(isUnique);

      if (!isUnique) {
        setErrors({ username: 'Username is already taken' });
        setIsSubmitting(false);
        return;
      }

      // Proceed with signup
      try {
        const response = await fetch('http://localhost:8080/api/users/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password
          })
        });

        if (response.ok) {
          alert('Signup successful!');
         navigate('/Login');
        } else {
          alert('Signup failed. Please try again.');
        }
      } catch (error) {
        alert('An error occurred during signup. Please try again.');
        console.error(error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={errors.username ? 'input-error' : ''}
              disabled={isSubmitting}
            />
            {errors.username && <small className="error-text">{errors.username}</small>}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'input-error' : ''}
              disabled={isSubmitting}
            />
            {errors.email && <small className="error-text">{errors.email}</small>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'input-error' : ''}
              disabled={isSubmitting}
            />
            {errors.password && <small className="error-text">{errors.password}</small>}
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? 'input-error' : ''}
              disabled={isSubmitting}
            />
            {errors.confirmPassword && <small className="error-text">{errors.confirmPassword}</small>}
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
