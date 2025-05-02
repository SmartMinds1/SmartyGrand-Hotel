import React from "react";
import "./AdminNavIcons.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faEnvelope,
  faCommentDots,
  faMoneyCheckAlt,
  faCalendarCheck,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";

const AdminNavIcons = ({setActiveTab}) => {
  return (
    <div className="adminNavIcons">
{/* The icons below will be displayed in on the admins side nav icons */}
      <ul>
          <li onClick={()=>setActiveTab("users")} >
            <FontAwesomeIcon icon={faUsers} />
          </li>

          <li  onClick={()=>setActiveTab("messages")} >
            <FontAwesomeIcon icon={faEnvelope} />
          </li>

          <li onClick={()=>setActiveTab("comments")} >
            <FontAwesomeIcon icon={faCommentDots} />
          </li>

          <li onClick={()=>setActiveTab("payments")} >
            <FontAwesomeIcon icon={faMoneyCheckAlt} />
          </li>

          <li onClick={()=>setActiveTab("bookings")} >
            <FontAwesomeIcon icon={faCalendarCheck} />
          </li>

          <li onClick={()=>setActiveTab("admins")} >
            <FontAwesomeIcon icon={faUserShield} />
          </li>
      </ul>

    </div>
  );
};

export default AdminNavIcons;
