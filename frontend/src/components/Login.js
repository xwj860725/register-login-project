import React, { useState } from 'react';
import '../App.css'; // 确保路径正确
import { useNavigate } from 'react-router-dom'; // 导入 useNavigate 钩子

const Login = ({ setUsername }) => { // 从父组件接收 setUsername 函数
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [message, setMessage] = useState(''); // 用于显示反馈消息
    const navigate = useNavigate(); // 初始化 navigate 函数

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // 阻止默认表单提交行为

        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData), // 将表单数据转为 JSON 字符串
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message); // 登录成功消息
                setUsername(formData.username); // 保存用户名到父组件状态
                navigate('/profil'); // 跳转到 Profil 页面
            } else {
                setMessage(data.message); // 登录失败消息
            }
        } catch (error) {
            console.error('登录请求失败:', error);
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
            {/* 显示反馈消息 */}
            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;
