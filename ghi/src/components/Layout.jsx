import React from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Nav />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;


