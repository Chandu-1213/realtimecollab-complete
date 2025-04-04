import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100" 
             style={{ 
                background: 'linear-gradient(135deg, #6a11cb, #2575fc)', 
                color: '#fff',
                textAlign: 'center'
             }}>
            <div className="p-5 rounded-4 shadow-lg" 
                 style={{
                    background: 'rgba(255, 255, 255, 0.15)', 
                    backdropFilter: 'blur(10px)',
                    width: '90%',
                    maxWidth: '600px'
                 }}>
                <h1 className="display-4 fw-bold">🚀 Seamless Collaboration, Anytime, Anywhere</h1>
                <p className="lead text-light">
                    Work together in real-time! Edit documents, share ideas, and stay connected—all in one platform.
                </p>
                <hr className="my-4 border-light" />
                <p className="fs-5">
                    No more endless email threads. Get started today and supercharge your productivity!
                </p>
                <div className="mt-4">
                    <Link to="/register" 
                          className="btn btn-lg px-4 py-2 text-white shadow" 
                          style={{ backgroundColor: '#ff7eb3', borderRadius: '50px' }}>
                        🎉 Get Started for Free
                    </Link>
                    <Link to="/login" 
                          className="btn btn-lg px-4 py-2 ms-3 text-white shadow" 
                          style={{ backgroundColor: '#4acfac', borderRadius: '50px' }}>
                        🔑 Continue to Your Workspace
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
