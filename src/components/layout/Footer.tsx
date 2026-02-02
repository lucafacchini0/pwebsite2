import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../common/Layout';

export const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-gray-100 py-12 mt-auto">
            <Layout>
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">

                    {/* Navigation Links */}
                    <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm text-gray-500">
                        <Link to="/" className="hover:text-black transition-colors">Home</Link>
                        <Link to="/#about" className="hover:text-black transition-colors">About</Link>
                        <Link to="/#projects" className="hover:text-black transition-colors">Projects</Link>
                        <Link to="/blog" className="hover:text-black transition-colors">Blog</Link>
                        <Link to="/contact" className="hover:text-black transition-colors">Contact</Link>
                    </div>

                    {/* Profile & Copyright */}
                    <div className="flex items-center gap-4">
                        <div className="text-right hidden md:block">
                            <p className="text-sm font-bold text-gray-900">Luca Facchini</p>
                            <p className="text-xs text-gray-400">© {currentYear}</p>
                        </div>
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200">
                            <img
                                src="https://ui-avatars.com/api/?name=Luca+Facchini&background=000&color=fff"
                                alt="Luca Facchini"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="text-left md:hidden">
                            <p className="text-sm font-bold text-gray-900">Luca Facchini</p>
                            <p className="text-xs text-gray-400">© {currentYear}</p>
                        </div>
                    </div>
                </div>
            </Layout>
        </footer>
    );
};
