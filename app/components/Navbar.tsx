import React, { useEffect, useState } from 'react';

const Navbar = () => {
    const [isSticky, setSticky] = useState(false);

    const handleScroll = () => {
        setSticky(window.scrollY > 0);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className={`fixed w-full bg-white p-4 transition duration-300 ease-in-out ${isSticky ? 'shadow-lg' : ''}`}>
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-lg font-bold">Brand</div>
                <div className="space-x-4">
                    <a href="#" className="text-gray-600 hover:text-gray-900">Home</a>
                    <a href="#" className="text-gray-600 hover:text-gray-900">About</a>
                    <a href="#" className="text-gray-600 hover:text-gray-900">Services</a>
                    <a href="#" className="text-gray-600 hover:text-gray-900">Contact</a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;