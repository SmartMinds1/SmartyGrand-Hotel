import React, { useEffect, useState } from "react";
import axios from "axios";

const MessagesList = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

//now fetching messages
    const fetchMessages = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/messages");
        setMessages(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching messages:", err);
        setLoading(false);
      }
    };

  
/* The data refresher when the tab is still open and a change is made */
  useEffect(() => {
          fetchMessages(); // Initial load

    // Set up listener
    const handleListChange = () => {
        fetchMessages(); // Re-fetch users
    };

    window.addEventListener("listChange", handleListChange);

    // 🧹 Clean up
    return () => {
      window.removeEventListener("listChange", handleListChange);
    };
  }, []);




  if (loading) return <p>Loading messages...</p>;

  return (
    <div className="admin-section">
      <div className="section-header">
        <h2>Messages</h2>
        <p>Total: <strong>{messages.length}</strong></p>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Email</th>
            <th>Message</th>
            <th>Submitted</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((msg, idx) => (
            <tr key={msg.id}>
              <td>{idx + 1}</td>
              <td>{msg.username}</td>
              <td>{msg.email}</td>
              <td>{msg.message}</td>
              <td>{new Date(msg.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MessagesList;
