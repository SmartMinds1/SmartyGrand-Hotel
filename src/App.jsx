import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Admin from './Admins_Home/Admin';
import Blog from './pages/Blog';
import Reservations from './pages/Reservations';
import AuthForm from './components/AuthForm';
import TestAgent from './components/TestAgent';

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Public layout routes */}
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/reservations" element={<Reservations />} />
                    <Route path="/testagent" element={<TestAgent />} />
                </Route>

                {/* Auth routes (no layout) */}
                <Route path="/login" element={<AuthForm isLogin={true} />} />
                <Route path="/register" element={<AuthForm isLogin={false} />} />

                {/* Admin page (no layout) */}
                <Route path="/admin" element={<Admin/>} />

                {/* 404 fallback */}
                <Route path="*" element={<div>404 Not Found</div>} />
            </Routes>
        </Router>
    );
};

export default App;

