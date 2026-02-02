import React from 'react';
import { Layout } from '../common/Layout';

const InfoItem = ({ label, value }: { label: string; value: string }) => (
    <div className="mb-4">
        <span className="block text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">{label}</span>
        <span className="text-lg font-medium text-gray-900 dark:text-white">{value}</span>
    </div>
);

export const AboutMe: React.FC = () => {
    return (
        <section id="about" className="py-24 bg-gray-50 dark:bg-gray-800 transition-colors duration-200">
            <Layout>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">

                    {/* Left: Stats/Info */}
                    <div className="md:col-span-4 lg:col-span-3 space-y-6">
                        <h2 className="text-3xl font-bold mb-8 md:hidden text-gray-900 dark:text-white">About Me</h2>
                        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-700">
                            <InfoItem label="Name" value="Luca Facchini" />
                            <InfoItem label="Age" value="25 Years" />
                            <InfoItem label="Location" value="Milan, Italy" />
                            <InfoItem label="Role" value="Frontend Developer" />
                        </div>
                    </div>

                    {/* Right: Description */}
                    <div className="md:col-span-8 lg:col-span-9">
                        <h2 className="hidden md:block text-4xl font-bold mb-8 text-gray-900 dark:text-white">About Me</h2>
                        <div className="prose prose-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                            <p className="mb-6">
                                I am a passionate developer with a keen eye for design and user experience.
                                I specialize in building responsive, accessible, and performant web applications that solve real-world problems.
                            </p>
                            <p className="mb-6">
                                With a background in computer science and a love for creative coding, I bridge the gap between technical engineering and visual storytelling.
                                I am always learning new technologies and improving my craft to deliver the best possible Digital Products.
                            </p>
                            <p>
                                When I'm not coding, you can find me exploring new coffee shops, reading tech blogs, or hiking in the Italian Alps.
                            </p>
                        </div>
                    </div>

                </div>
            </Layout>
        </section>
    );
};
