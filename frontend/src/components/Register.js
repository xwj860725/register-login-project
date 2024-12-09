import React, { useState } from 'react';
import '../App.css'; // 确保路径正确
import { useNavigate } from 'react-router-dom';  // 通过 React Router 的 useNavigate 方法跳转到 Login 页面

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const [message, setMessage] = useState(''); // 用于显示反馈消息
    const navigate = useNavigate(); // 使用 useNavigate 钩子

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
                setMessage(data.message); // 显示成功消息
                // 注册成功后跳转到 Login 页面
                setTimeout(() => navigate('/login'), 2000); // 2秒后跳转到登录页面
            } else if (data.redirectToLogin) {
                // 如果是已注册用户，显示提示并跳转到 Login 页面
                setMessage(data.message);
                setTimeout(() => navigate('/login'), 2000); // 2秒后跳转到登录页面
            } else {
                // 其他错误
                setMessage(data.message);
            }
        } catch (error) {
            console.error('注册请求失败:', error);
            setMessage('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="container">
            <h2>Register</h2>
            {message && <p>{message}</p>} {/* 显示消息 */}
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