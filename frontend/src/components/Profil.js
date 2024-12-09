import React from 'react';
import '../App.css'; // 引入全局样式

const Profil = ({ username }) => {
    return (
        <div className="container">
            {/* 用户头像 */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <img
                    src={require('../assets/images/u3.jpg')} // 引入头像图片
                    alt="Profil"
                    style={{
                        width: '150px',
                        height: '150px',
                        borderRadius: '50%', // 圆形样式
                        objectFit: 'cover', // 保持图片内容完整
                    }}
                />
            </div>

            {/* 欢迎信息 */}
            <h1 style={{ textAlign: 'center', fontWeight: 'bold' }}>
                Welcome back {username}!
            </h1>
        </div>
    );
};

export default Profil;
