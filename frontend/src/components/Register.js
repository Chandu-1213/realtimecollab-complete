import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const { data } = await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
            localStorage.setItem('token', data.token);
            navigate('/login');
        } catch (error) {
            setError(error.response?.data?.message || 'An unexpected error occurred.');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: "#f8f9fa" }}>
            <div className="p-4 bg-white shadow-lg rounded" style={{ width: "350px" }}>
                <h2 className="text-center mb-4">Create an Account</h2>
                <form onSubmit={handleRegister}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label fw-bold">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label fw-bold">Email Address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label fw-bold">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Register</button>
                </form>
                {error && <p className="text-danger mt-3 text-center">{error}</p>}
                <p className="mt-3 text-center">
                    Already have an account? <a href="/" className="text-primary fw-bold">Login</a>
                </p>
            </div>
        </div>
    );
};

export default Register;
