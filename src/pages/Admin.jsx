/* import React, { useEffect, useState } from 'react'; */
import '../styles/admin.css';
import AdminNavIcons from '../components/AdminNavIcons';

//The UI part
const Admin = () => {
       /*      const [submissions, setSubmissions] = useState([]);
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
            }, []); */
        
            return (
                <div>

{/*......................... dashBoard headings ...........................*/}
           <div className="mainBoard">
                   <div className="headerDiv">
                        <h2> <span>&#9776;</span> DASHBOARD</h2>
                        <h1><span>smarty</span>Grand</h1>
                        <div className="adminDiv">
                            <div className="adminProfile"></div>
                            <p>Admin Name</p>
                        </div>
                        
                   </div>
                    

                    <div className="mainDiv">
                        {/* this is the wrapping div which will tie the icons div and the navDiv */}
                        <div className="wrapper">
                                <div className="iconsDiv">
                                <AdminNavIcons/>
                                </div>

                               
                        {/* This is the nav links div and the profile pic */}
                                <div className="navDiv">
                                        <div className='hello'>
                                            <div className="profile"> </div>
                                            <p><span>Hi</span> Smart!</p>
                                        </div>
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

                        {/*  this displays the number of different items from the database */}
                             <div className="contentHeader">
                                   <div className="box">
                                    <p>
                                        <span id="userCount">25</span> <br />
                                        Users
                                    </p>
                                        <i class="fas fa-user"></i>
                                        {/*  Font Awesome multiple users icon */}
                                    </div>


                                    <div className="box">
                                        <p>
                                            <span id="messageCount">120</span> <br />
                                            Messages
                                        </p>
                                          <i class="fas fa-comments"></i>
                                            {/* Font Awesome messages icon */} 
                                    </div>


                                    <div className="box">
                                        <p>
                                            <span id="bookingCount">87</span> <br />
                                            Bookings
                                        </p>
                                            <i class="fas fa-calendar-check"></i>
                                            {/* Font Awesome bookings icon */} 
                                    </div>


                                    <div className="box">
                                        <p><span id="paymentCount">93</span> <br />
                                            Payments
                                        </p>
                                            <i class="fas fa-money-check"></i>
                                            {/* Font Awesome payments icon  */}
                                    </div>


                                    <div className="box">
                                        <p><span id="paymentCount">62</span> <br />
                                            Testimonials
                                        </p>
                                            <i class="fas fa-money-check"></i>
                                            {/* Font Awesome payments icon  */}
                                    </div>


                                    <div className="box">
                                        <p><span id="paymentCount">3</span> <br />
                                            Admins
                                        </p>
                                            <i class="fas fa-money-check"></i>
                                            {/* Font Awesome payments icon  */}
                                    </div>

                              </div>



                         {/*  DB DATA DISPLAY */}
                          <div className="dbContentHeader">
                                <div className="nameOfContentDisplayed">
                                 <p> Users</p>
                                </div>
                                <div className="sortBy">
                                  <p> Sort by</p>
                                  <select name="nameOfContent" id="nameOfContent">
                                        <option value="Latest selected">Latest</option>
                                        <option value="Oldest">Oldest</option>
                                        <option value="Frequent">Frequent</option>
                                  </select>
                                </div>     
                                <div className="searchBox">
                                    <p>search</p>
                                </div>
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