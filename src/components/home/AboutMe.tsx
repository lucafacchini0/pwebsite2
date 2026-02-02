import React from 'react';
import { Layout } from '../common/Layout';

const InfoItem = ({ label, value }: { label: string; value: string }) => (
    <div className="py-6 first:pt-0 last:pb-0 border-b border-black/5 dark:border-white/5 last:border-0">
        <span className="block text-xs uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 mb-2">{label}</span>
        <span className="text-2xl font-medium text-zinc-900 dark:text-white">{value}</span>
    </div>
);

export const AboutMe: React.FC = () => {
    return (
        <section id="about" className="py-32 bg-zinc-50 dark:bg-black transition-colors duration-200">
            <Layout>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

                    {/* Left: Stats/Info */}
                    <div className="lg:col-span-5 xl:col-span-4">
                        <h2 className="text-4xl font-bold mb-10 lg:hidden text-zinc-900 dark:text-white tracking-tight">About Me</h2>
                        <div className="px-2">
                            <InfoItem label="Name" value="Luca Facchini" />
                            <InfoItem label="Age" value="25 Years" />
                            <InfoItem label="Location" value="Milan, Italy" />
                            <InfoItem label="Role" value="Frontend Developer" />
                        </div>
                    </div>

                    {/* Right: Description */}
                    <div className="lg:col-span-7 xl:col-span-8 pt-2">
                        <h2 className="hidden lg:block text-5xl font-bold mb-10 text-zinc-900 dark:text-white tracking-tight">About Me</h2>
                        <div className="prose prose-xl dark:prose-invert text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
                            <p className="mb-8">
                                I am a passionate developer with a keen eye for design and user experience.
                                I specialize in building responsive, accessible, and performant web applications that solve real-world problems.
                            </p>
                            <p className="mb-8">
                                With a background in computer science and a love for creative coding, I bridge the gap between technical engineering and visual storytelling.
                                I am always learning new technologies and improving my craft to deliver the best possible digital products.
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
