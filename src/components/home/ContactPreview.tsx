import React from 'react';
import { Layout } from '../common/Layout';
import { Button } from '../common/Button';
import { Link } from 'react-router-dom';

export const ContactPreview: React.FC = () => {
    return (
        <section className="py-32 bg-gray-50 dark:bg-black text-center transition-colors duration-200 border-t border-black/5 dark:border-white/5">
            <Layout>
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white tracking-tight">Let's work together.</h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 font-light">
                        Have a project in mind? Want to discuss a new idea? I'm always open to new opportunities and collaborations.
                    </p>
                    <Link to="/contact">
                        <Button variant="primary" className="px-12 py-4 text-lg">
                            Get in Touch
                        </Button>
                    </Link>
                </div>
            </Layout>
        </section>
    );
};
