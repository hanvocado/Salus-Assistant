import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import avatarImage from "../assets/avatar.png";
import salus from "../assets/salus.png";

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const currentUser = true; // This should be dynamic based on authentication state

    const navigation = [
        { name: 'Trang chủ', href: '/' },
        { name: 'Hôm nay ăn gì', href: '/diet' },
        { name: 'Salus Chat', href: '/chat' },
        { name: 'Lịch sử ăn uống', href: '/history' },
        { name: 'Bữa ăn của tôi', href: '/upload_dish' },

    ];

    const profile = [
        {name: "Trang cá nhân", href:"/profile"},
        {name: "Cài đặt", href:"/"},
        {name: "Đăng xuất", href:"/logout"}
      
      ]
    

    const handleLinkClick = () => {
        setIsDropDownOpen(false);
        setIsMobileMenuOpen(false);
    };

    return (
        <div>

            <nav className="bg-slate-200 border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src={salus}className="h-12" alt="FoodieMate Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Salus Assistant</span>
                    </Link>

                    {/* Right Side: Avatar and Mobile Menu Button */}
                    <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        {/* Avatar Button */}
                        <div className="relative">
                            {
                                currentUser && (
                                    <>
                                        <button onClick={() => setIsDropDownOpen(!isDropDownOpen)}>
                                            <img src={avatarImage} alt="Avatar" className="w-10 h-10 rounded-full" />
                                        </button>

                                        {/* Dropdown Menu */}
                                        {isDropDownOpen && (
                                            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40">
                                                <ul>
                                                    {profile.map((item) => (
                                                        <li key={item.name} onClick={handleLinkClick}>
                                                            <Link to={item.href} className="block px-4 py-2 text-sm hover:bg-gray-200">
                                                                {item.name}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </>
                                )
                            }
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            data-collapse-toggle="navbar-user"
                            type="button"
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            aria-controls="navbar-user"
                            aria-expanded={isMobileMenuOpen ? 'true' : 'false'}
                            onClick={toggleMobileMenu}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    </div>

                    {/* Desktop Navigation Menu */}
                    <div className={`items-center justify-between hidden w-full md:flex border-gray-200 md:w-auto md:order-1 ${isMobileMenuOpen ? '' : 'hidden'}`} id="navbar-user">
                        <ul className="flex bg-slate-200  flex-col font-medium p-4 md:p-0 mt-4 border rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            {navigation.map((item) => (
                                <li key={item.name}>
                                    <Link to={item.href} onClick={handleLinkClick} className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
