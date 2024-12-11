import React, { useState } from 'react';
import '../App.css'; 
import { useNavigate } from 'react-router-dom';  // Go to the Login page via React Router's useNavigate method

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const [message, setMessage] = useState(''); // Display feedback messages
    const navigate = useNavigate(); // use useNavigate hook

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message); // display success messsage
                // After successful registration, go to the Login page
                setTimeout(() => navigate('/login'), 2000); // Go to login page after 2 seconds
            } else if (data.redirectToLogin) {
                // If registered user , go to the Login page
                setMessage(data.message);
                setTimeout(() => navigate('/login'), 2000); //  Go to login page after 2 seconds
            } else {
                // Other errors
                setMessage(data.message);
            }
        } catch (error) {
            console.error('Registration request failed:', error);
            setMessage('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="container">
            <h2>Register</h2>
            {message && <p>{message}</p>} {/* Display message */}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Enter your username"
                        className="form-control"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        className="form-control"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;
