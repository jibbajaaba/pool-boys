import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-lagoon text-copper py-6">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <p className="text-lg">&copy; 2024 PoolBoys. All rights reserved.</p>
                <div className="flex space-x-4 mt-4 md:mt-0">
                    <NavLink to={{ pathname: "https://www.instagram.com" }} target="_blank">
                        <FaInstagram className="w-8 h-8 hover:text-primary transition duration-300" />
                    </NavLink>
                    <NavLink to={{ pathname: "https://www.facebook.com" }} target="_blank">
                        <FaFacebook className="w-8 h-8 hover:text-primary transition duration-300" />
                    </NavLink>
                    <NavLink to={{ pathname: "https://www.twitter.com" }} target="_blank">
                        <FaTwitter className="w-8 h-8 hover:text-primary transition duration-300" />
                    </NavLink>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
