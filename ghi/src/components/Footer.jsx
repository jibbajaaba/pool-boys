import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-lagoon text-copper py-6">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <p className="text-lg">&copy; 2024 PoolBoys. All rights reserved.</p>
                <div className="flex space-x-4 mt-4 md:mt-0">
                    <a href="https://www.instagram.com">
                        <FaInstagram className="w-8 h-8 hover:text-primary transition duration-300" />
                    </a>
                    <a href="https://www.facebook.com">
                        <FaFacebook className="w-8 h-8 hover:text-primary transition duration-300" />
                    </a>
                    <a href="https://www.twitter.com">
                        <FaTwitter className="w-8 h-8 hover:text-primary transition duration-300" />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
