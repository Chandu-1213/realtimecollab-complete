import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
            <div className="container">
                <Link className="navbar-brand fw-bold text-primary" to="/dashboard">
                    CollabTool
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link text-light" to="/dashboard">
                                Dashboard
                            </Link>
                        </li>
                    </ul>
                    {user ? (
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <span className="nav-link text-light fw-bold">{user.username}</span>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
                                    Logout
                                </button>
                            </li>
                        </ul>
                    ) : (
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link text-light" to="/login">
                                    Login
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light" to="/register">
                                    Register
                                </Link>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
