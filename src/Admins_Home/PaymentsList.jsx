import React, { useEffect, useState } from "react";
import axios from "axios";
import useSearch from "../utils/useSearch";

const PaymentsList = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

    const fetchPayments = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/payments");
        setPayments(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching payments, Try agin Later", err);
        setLoading(false);
      }
    };

//HANDLING DELETE
    const handleDelete = ()=>{
      //logic to handle delete
     }
    
/* The data refresher when the tab is still open and a change is made */
    useEffect(() => {
      // Initial load
        fetchPayments(); 
    
      // Set up listener
        const handleListChange = () => {
          fetchPayments(); // Re-fetch payments
        };
    
        window.addEventListener("listChange", handleListChange);
    
      // Clean up
        return () => {
          window.removeEventListener("listChange", handleListChange);
        };
      }, []);

    // Reusable search hook. Passing payments for search
       const { query, setQuery, filteredData } = useSearch(payments, ["username", "phone"]);

    //displaying the loading message
        if (loading) return <p>Loading Payments...</p>;

  return (
    <div>
    {/* This si the db Header. It is different across all lists due to search and order of items */}
    <div className="dbContentHeader">
            <div className="nameOfContentDisplayed">
               <h3>Payments</h3>
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
                <input
                  type="text"
                  placeholder="username or phone"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
            </div>
      </div>

  <div className="admin-section">
      <table className="admin-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>phone</th>
            <th>payment_code</th>
            <th>received_at</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((payment, idx) => (
            <tr key={payment.id}>
              <td>{idx + 1}</td>
              <td>{payment.username}</td>
              <td>{payment.phone}</td>
              <td>{payment.payment_code}</td>
              <td>{new Date(payment.created_at).toLocaleString()}</td>
              <td className="actionBtn">
                <p>...</p>
                  <ul className="actionList">
                    <li  onClick={()=>handleDelete(payment.id)}>delete</li>
                    <li>forget</li>
                  </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

       {/* response message if the table is empty or failed to retrieve */}
       {filteredData.length===0 ? <p className="emptyTable">No Payments found!</p> : ""}
  </div>    
    </div>
  );
};

export default PaymentsList;
