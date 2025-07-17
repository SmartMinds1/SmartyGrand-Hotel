import React, { useEffect, useState } from "react";
import axios from "axios";
import DeleteModal from "../components/popUps/DeleteModal";
import Confirm from "../components/popUps/Confirm";
import useSearch from "../utils/useSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const CommentsList = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  //setting up feedback message using a popUp
  const [showModal, setShowModal] = useState(false);
  const [comment_ID, setComment_ID] = useState("");

  //fetching comments
    const fetchComments = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/testimonials");
        setComments(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching Comments, Try agin Later", err);
        setLoading(false);
      }
    };

  //handle confirm sets given ID to a state variable
      const handleConfirm=(commentId)=>{
        setComment_ID(commentId);
      }

  //This handles closing of confirm Modal
      const onCloseConfirm=() => {setShowModal(false);}
 
/* The data refresher when the tab is still open and a change is made */
    useEffect(() => {
      // Initial load
        fetchComments(); 
    
      // Set up listener
        const handleListChange = () => {
          fetchComments(); // Re-fetch users
        };
    
        window.addEventListener("listChange", handleListChange);
    
      // Clean up
        return () => {
          window.removeEventListener("listChange", handleListChange);
        };
      }, []);

    // Reusable search hook. This is all we need for our users, search
       const { query, setQuery, filteredData } = useSearch(comments, ["username"]);

      //displaying the loading message
        if (loading) return <p>Loading Comments...</p>;

  return (
    <div>
   {/* This si the db Header. It is different across all lists due to search and order of items */}
   <div className="dbContentHeader">
            <div className="nameOfContentDisplayed">
               <h3>Testimonials</h3>
            </div>
            <div className="sortBy">
              <p> Sort by</p>
              <select name="nameOfContent" id="nameOfContent">
                    <option value="Latest selected">Latest</option>
                    <option value="Oldest">Oldest</option>
                    <option value="Frequent">Frequent</option>
              </select>
            </div>
            <div className="searchBar">
              <FontAwesomeIcon icon={faSearch} className="search-icon"></FontAwesomeIcon>
                <input
                  type="text"
                  placeholder="username"
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
            <th>comment</th>
            <th>received_at</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((comment, idx) => (
            <tr key={comment.id}>
              <td>{idx + 1}</td>
              <td>{comment.username}</td>
              <td>{comment.comment}</td>
              <td>{new Date(comment.received_at).toLocaleString()}</td>
              <td className="actionBtn">
                <p>...</p>
                  <ul className="actionList">
                    <li  onClick={()=>{setShowModal(true); handleConfirm(comment.id);}}>delete</li>
                    <li>block</li>
                  </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
       {/* response message if the table is empty or failed to retrieve */}
       {filteredData.length===0 ? <p className="emptyTable">No Comments found!</p> : ""}
   </div>  

{/*  Displaying the response messsage using a popUP. This is when deleting or updating within  the list */}
      <DeleteModal isOpen={showModal}  fetchData={()=>fetchComments()} onCloseConfirm={() => onCloseConfirm()} onClose={() => {
              setShowModal(false); 
          }}>
          <Confirm onCloseConfirm={() => onCloseConfirm()}
                   deleteUrl={`http://localhost:5000/api/testimonials/${comment_ID}`}
                   deleteName="Comment"
                   fetchData={()=>fetchComments()}
          >
              <p className="responseMessage">Please confirm to Delete</p>
          </Confirm>
      </DeleteModal>
</div>
  );
};

export default CommentsList;
