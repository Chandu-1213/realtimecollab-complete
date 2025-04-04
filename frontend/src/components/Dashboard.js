import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
    const [documents, setDocuments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                const token = user ? user.token : null;
                const { data } = await axios.get('http://localhost:5000/api/documents', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setDocuments(data);
            } catch (error) {
                console.error('Failed to fetch documents:', error);
                navigate('/');
            }
        };
        fetchDocuments();
    }, [navigate]);

    // Logout Function
    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="container py-4">
            {/* Header with Logout Button */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold text-primary">📄 Your Documents</h2>
                <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            </div>

            {/* Show a message if there are no documents */}
            {documents.length === 0 ? (
                <div className="text-center text-muted">
                    <p>No documents found. Start by creating a new one!</p>
                    <button className="btn btn-success mt-2" onClick={() => navigate('/document/new')}>
                        ➕ Create New Document
                    </button>
                </div>
            ) : (
                <div className="row">
                    {documents.map((doc) => (
                        <div key={doc._id} className="col-md-4 mb-4">
                            <div className="card shadow-lg border-0 h-100" style={{ background: '#f8f9fa', borderRadius: '15px' }}>
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title fw-bold text-primary">{doc.title}</h5>
                                    <p className="card-text text-muted">
                                        📅 Created: {new Date(doc.createdAt).toLocaleDateString()}
                                    </p>
                                    {/* Optional: Show preview of document content */}
                                    <p className="card-text text-truncate text-dark">
                                        {doc.content ? doc.content.substring(0, 50) + '...' : 'No preview available'}
                                    </p>
                                    <Link to={`/document/${doc._id}`} className="btn btn-primary mt-auto">
                                        🔍 Open Document
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Create New Document Button */}
            <div className="text-center mt-4">
                <button className="btn btn-success px-4 py-2" onClick={() => navigate('/document/new')}>
                    ➕ Create New Document
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
