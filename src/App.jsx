import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import AuthForm from './components/AuthForm';

const App = () => {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/admin" element={<Admin />} />

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
