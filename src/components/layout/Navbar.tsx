import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Layout } from '../common/Layout';

const NavLink = ({ to, children, onClick }: { to: string; children: React.ReactNode; onClick?: () => void }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link
            to={to}
            onClick={onClick}
            className={`text-sm font-medium transition-colors hover:text-black ${isActive ? 'text-black' : 'text-gray-500'
                }`}
        >
            {children}
        </Link>
    );
};

export const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Scroll to section handling if on home page, otherwise navigate to home
    // For simplicity in this first pass, we assume separate pages or hash links.
    // The prompt implies "links pointing to all main sections of the site", which suggests a single page for Home.
    // But also "dedicated links to Blog and Contact" which are pages.
    // Strategy: If link is a section (#about), it works on Home. If on other page, it should go to /#about.
    // For now, I'll implement standard routing links.

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <Layout>
                <div className="flex items-center justify-between h-16">
                    {/* Logo / Profile */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 group-hover:border-gray-400 transition-colors">
                            <img
                                src="https://ui-avatars.com/api/?name=Luca+Facchini&background=000&color=fff"
                                alt="Luca Facchini"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <span className="font-bold text-gray-900 tracking-tight">Luca Facchini</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/#about">About</NavLink>
                        <NavLink to="/#projects">Projects</NavLink>
                        <NavLink to="/blog">Blog</NavLink>
                        <NavLink to="/contact">Contact</NavLink>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 -mr-2 text-gray-600 hover:text-black"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </Layout>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="md:hidden bg-white border-b border-gray-100 animate-in slide-in-from-top-2">
                    <Layout>
                        <div className="flex flex-col py-4 gap-4">
                            <NavLink to="/" onClick={() => setIsOpen(false)}>Home</NavLink>
                            <NavLink to="/#about" onClick={() => setIsOpen(false)}>About</NavLink>
                            <NavLink to="/#projects" onClick={() => setIsOpen(false)}>Projects</NavLink>
                            <NavLink to="/blog" onClick={() => setIsOpen(false)}>Blog</NavLink>
                            <NavLink to="/contact" onClick={() => setIsOpen(false)}>Contact</NavLink>
                        </div>
                    </Layout>
                </div>
            )}
        </nav>
    );
};
