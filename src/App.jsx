import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Blog from './pages/Blog';
import Reservations from './pages/Reservations';
import AuthForm from './components/AuthForm';
import TestAgent from './components/TestAgent';

const App = () => {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/reservations" element={<Reservations />} />
                    <Route path="/testagent" element={<TestAgent />} />



                    {/* routes for login purposes */}
                    <Route path="/login" element={<AuthForm isLogin={true} />} />
                    <Route path="/register" element={<AuthForm isLogin={false} />} />
                    <Route path="*" element={<div>404 Not Found</div>} />
                </Routes>
            </Layout>
        </Router>
    );
};

export default App;
