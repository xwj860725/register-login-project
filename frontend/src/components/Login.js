import React, { useState } from 'react';
import '../App.css'; 
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

const Login = ({ setUsername }) => { 
    const [formData, setFormData] = useState({ // Receive the setUsername function from the parent component.
        username: '',
        password: '',
    });

    const [message, setMessage] = useState(''); // Display feedback messages
    const navigate = useNavigate(); // Initialize the navigate function

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Block default form submission behavior

        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData), // Convert the form data to a JSON string
            });

            const data = await response.json();

            if (response.ok) {                 // Login Success Message
                setMessage(data.message); 
                setUsername(formData.username); // Save username to parent component state
                navigate('/profil');             // Go to Profil page
            } else {
                setMessage(data.message);   // Failure messages
            }
        } catch (error) {
            console.error('Login request failed:', error);
            setMessage('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="container">
            <h2>Login</h2>
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
                    Login
                </button>
            </form>
            {/* Display feedback messages */}
            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;
