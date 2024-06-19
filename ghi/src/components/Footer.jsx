import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-lagoon text-copper py-4">
            <div className="container mx-auto flex justify-between items-center">
                <p>&copy; 2024 PoolBoys. All rights reserved.</p>
                <div className="flex space-x-4">
                    <NavLink to={{ pathname: "https://www.instagram.com" }} target="_blank">
                        <FaInstagram className="w-6 h-6 hover:text-primary transition duration-300" />
                    </NavLink>
                    <NavLink to={{ pathname: "https://www.facebook.com" }} target="_blank">
                        <FaFacebook className="w-6 h-6 hover:text-primary transition duration-300" />
                    </NavLink>
                    <NavLink to={{ pathname: "https://www.twitter.com" }} target="_blank">
                        <FaTwitter className="w-6 h-6 hover:text-primary transition duration-300" />
                    </NavLink>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
