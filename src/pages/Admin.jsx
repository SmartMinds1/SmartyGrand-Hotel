import React, { useEffect, useState } from 'react';
import '../styles/admin.css';
import AdminNavIcons from '../components/AdminNavIcons';

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

{/*......................... dashBoard headings ...........................*/}
           <div className="mainBoard">
                   <div className="headerDiv">
                        <h2>DASHBOARD</h2>
                        <h2>smartyGrand</h2>
                   </div>
                    

                    <div className="mainDiv">
                        {/* this is the wrapping div which will tie the icons div and the navDiv */}
                        <div className="wrapper">
                                <div className="iconsDiv">
                                <AdminNavIcons/>
                                </div>
                            
                                <div className="navDiv">
                                    <ul>
                                        <li>Users</li>
                                        <li>Bookings</li>
                                        <li>Messsages</li>
                                        <li>Payments</li>
                                        <li>complains</li>
                                        <li>Admins</li>
                                        <li></li>
                                    </ul>
                                </div>
                        </div>

                       {/* this is the main content div that will display the data retrieved from the database */}
                        <div className="contentDiv">
                          <div className="contentHeader">
                                   <div className="box">
                                        Box1
                                    </div>
                                    <div className="box">
                                        Box2
                                    </div>
                                    <div className="box">
                                        Box3
                                    </div>
                                    <div className="box">
                                        Box4
                                    </div>
                                    <div className="box">
                                        Box5
                                    </div>
                          </div>

                          <div className="dbContentHeader">
                                <div className="nameOfContentDisplayed"></div>
                                <div className="sortBy"></div>     
                                <div className="searchBox"></div>
                          </div>
                          
                          <div className="dbContent">
                                
                          </div>

                        </div>  
                    </div>
            </div>

        
{/*.............................. End of the dashBoard ............................... */}



{/* This is the logical output part to be implemented later */}

                {/*     {loading ? (
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
                    )} */}

                </div>
    );
}

export default Admin;