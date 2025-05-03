import React, { useEffect, useState } from "react";
import axios from "axios";
import Confirm from "../components/popUps/Confirm";
import DeleteModal from "../components/popUps/DeleteModal";
import useSearch from "../utils/useSearch";


const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  //setting up feedback message using a popUp
      const [showModal, setShowModal] = useState(false);
      const [user_ID, setUser_ID] = useState("");

  //fetching users
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users");
        setUsers(res.data);
        setLoading(false);

      } catch (err) {
        console.error("Error fetching users:", err);
        setLoading(false);
      }
    };

//handle confirm sets given ID to a state variable
    const handleConfirm=(userId)=>{
      setUser_ID(userId);
    }

//This handles closing of confirm Modal
    const onCloseConfirm=() => {setShowModal(false);}
 
   /* The data refresher when the tab is still open and a change is made */
    useEffect(() => {
      // Initial load
        fetchUsers(); 
    
      // Set up listener
        const handleListChange = () => {
          fetchUsers(); // Re-fetch users
        };
    
        window.addEventListener("listChange", handleListChange);
    
      // Clean up
        return () => {
          window.removeEventListener("listChange", handleListChange);
        };
      }, []);

 // Reusable search hook. This is all we need for our users, search
  const { query, setQuery, filteredData } = useSearch(users, ["username", "email"]);

  if (loading) return <p>Loading users...</p>;

  return (
    <div>

  {/* This si the db Header. It is different across all lists due to search and order of items */}
      <div className="dbContentHeader">
            <div className="nameOfContentDisplayed">
               <h3>Users</h3>
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
                  placeholder="username or email"
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
            <th>Email</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((user, idx) => (
            <tr key={user.id}>
              <td>{idx + 1}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td className="actionBtn">
                <p>...</p>
                  <ul className="actionList">
                   {/*  This opens the confirm popUp  */}
                    <li onClick={()=>{setShowModal(true); handleConfirm(user.id);}}>delete</li>
                    <li>block</li>
                  </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

       {/* response message if the table is empty or failed to retrieve */}
       {filteredData.length===0 ? <p className="emptyTable">No Users found!</p> : ""}
    </div>

{/*  Displaying the response messsage using a popUP. This is when deleting or updating within  the list */}
       <DeleteModal isOpen={showModal}  fetchData={()=>fetchUsers()} onCloseConfirm={() => onCloseConfirm()} onClose={() => {
              setShowModal(false); 
          }}>
          <Confirm onCloseConfirm={() => onCloseConfirm()}
                   deleteUrl={`http://localhost:5000/api/users/${user_ID}`}
                   deleteName="user"
                   fetchData={()=>fetchUsers()}
          >
              <p className="responseMessage">Please confirm to Delete</p>
          </Confirm>
      </DeleteModal>
    </div>
  );
};


export default UsersList;
