import React from 'react';
import { Layout } from '../common/Layout';
import { Button } from '../common/Button';
import { Link } from 'react-router-dom';

export const ContactPreview: React.FC = () => {
    return (
        <section className="py-24 bg-black text-white text-center">
            <Layout>
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's work together.</h2>
                    <p className="text-xl text-gray-400 mb-10">
                        Have a project in mind? Want to discuss a new idea? I'm always open to new opportunities and collaborations.
                    </p>
                    <Link to="/contact">
                        <Button className="bg-white text-black hover:bg-gray-200">
                            Get in Touch
                        </Button>
                    </Link>
                </div>
            </Layout>
        </section>
    );
};
