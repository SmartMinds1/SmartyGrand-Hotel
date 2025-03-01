import React, { useEffect, useState } from 'react';
import '../styles/admin.css';
import SocialIcons from '../components/SocialIcons';

//The UI part
const Admin = () => {
            const [submissions, setSubmissions] = useState([]);
            const [loading, setLoading] = useState(true);
            const [error, setError] = useState('');
        
            useEffect(() => {
                const fetchSubmissions = async () => {
                    try {
                        const response = await fetch('http://localhost:5000/get-submissions');
                        if (response.ok) {
                            const data = await response.json();
                            setSubmissions(data);
                            setLoading(false);
                        } else {
                            throw new Error('Failed to fetch submissions');
                        }
                    } catch (err) {
                        setError(err.message);
                        setLoading(false);
                    }
                };
        
                fetchSubmissions();
            }, []);
        
            return (
                <div>
                    <h1>Admin Page</h1>
                    <div className="dashBoard">
                        <div className="iconsBar">
                            <div className="dashIcons">
                               <SocialIcons/>
                            </div>
                        </div>
                        <div className="sidenav">

                        </div>

                        <div className="mainNav">

                        </div>
                        <div className="clear"></div>
                        <div className="div1mainColorShade"></div>
                        <div className="div2mainColorShade"></div>
                        <div className="div3mainColorShade"></div>
                       
                    </div>

                    {/* This is the logical output part */}
                    {loading ? (
                        <p>Loading submissions...</p>
                    ) : error ? (
                        <p>Error: {error}</p>
                    ) : (
                        <table border="1" style={{ width: '100%', textAlign: 'left' }}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Message</th>
                                    <th>Submitted At</th>
                                </tr>
                            </thead>
                            <tbody>
                                {submissions.map((submission) => (
                                    <tr key={submission.id}>
                                        <td>{submission.id}</td>
                                        <td>{submission.name}</td>
                                        <td>{submission.email}</td>
                                        <td>{submission.message}</td>
                                        <td>{submission.submitted_at}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
    );
}

export default Admin;