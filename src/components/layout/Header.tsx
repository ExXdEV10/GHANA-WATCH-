import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Logo />

        <nav>
          <ul className="flex space-x-6 font-medium">
            <li>
              <Link
                to="/"
                className="text-gray-800 hover:text-blue-600 transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-gray-800 hover:text-blue-600 transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/how-it-works"
                className="text-gray-800 hover:text-blue-600 transition-colors"
              >
                How It Works
              </Link>
            </li>
            <li>
              <Link
                to="/announcements"
                className="text-gray-800 hover:text-blue-600 transition-colors"
              >
                Public Announcement
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
