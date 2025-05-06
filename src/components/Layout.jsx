// src/components/Layout.jsx
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import "../styles/Layout.css";
import { Outlet } from "react-router-dom";

const mainLayout = () => {
    return (
        <div className='Layout'>
            <Header/>
            <main>
                <Outlet />
            </main>
            <Footer/>  
        </div>
    );
};

export default mainLayout;

