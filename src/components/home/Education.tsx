import React from 'react';
import { Layout } from '../common/Layout';
import { GraduationCap } from 'lucide-react';

interface EducationItemProps {
    year: string;
    degree: string;
    institution: string;
    description: string;
    isLast?: boolean;
}

const EducationItem: React.FC<EducationItemProps> = ({ year, degree, institution, description, isLast }) => (
    <div className="relative pl-8 md:pl-0">
        <div className="hidden md:flex items-start justify-between group">
            {/* Left: Year */}
            <div className="w-1/4 text-right pr-8 pt-1">
                <span className="text-xs font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest transition-colors">{year}</span>
            </div>

            {/* Center: Line & Dot */}
            <div className={`absolute left-1/4 transform -translate-x-px h-full border-l border-zinc-100 dark:border-zinc-800/50 ${isLast ? 'hidden' : ''}`}></div>
            <div className="absolute left-1/4 transform -translate-x-1/2 w-2 h-2 rounded-full bg-zinc-200 dark:bg-zinc-800 transition-all duration-300 group-hover:bg-zinc-900 dark:group-hover:bg-white group-hover:scale-125"></div>

            {/* Right: Content */}
            <div className="w-3/4 pl-8 pb-12">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2 tracking-tight transition-colors">{degree}</h3>
                <h4 className="text-sm font-semibold text-zinc-400 dark:text-zinc-500 mb-4 transition-colors">{institution}</h4>
                <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium text-sm">{description}</p>
            </div>
        </div>

        {/* Mobile: Simple stack */}
        <div className="md:hidden pb-10 relative border-l border-zinc-100 dark:border-zinc-800 pl-6 ml-2">
            <div className="absolute -left-1 w-2 h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full top-1.5"></div>
            <span className="inline-block text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest mb-2">{year}</span>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-1 tracking-tight">{degree}</h3>
            <h4 className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 mb-3">{institution}</h4>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium leading-relaxed">{description}</p>
        </div>
    </div>
);

export const Education: React.FC = () => {
    const educationHistory = [
        {
            year: "2023 - Present",
            degree: "Master in CyberSecurity",
            institution: "Politecnico di Milano",
            description: "Specializing in Infrastructure Security and Computer Engineering. Researching advanced penetration testing methodologies."
        },
        {
            year: "2020 - 2023",
            degree: "Bachelor in Computer Engineering",
            institution: "University of Bologna",
            description: "Graduated with honors. Fundamentals of computer architecture, network security, and cryptography."
        },
        {
            year: "2015 - 2020",
            degree: "Scientific High School Diploma",
            institution: "Liceo Scientifico A. Einstein",
            description: "Focus on mathematics and physics. Developed early interest in ethical hacking."
        }
    ];

    return (
        <section className="h-screen flex items-center bg-white dark:bg-zinc-950 transition-colors duration-200">
            <Layout>
                <div className="flex flex-col md:flex-row gap-16">
                    <div className="md:w-1/3">
                        {/* Header aligned with MySkills */}
                        <div className="mb-14">
                            <span className="text-black dark:text-white font-semibold tracking-[0.2em] uppercase text-sm mb-2 block">
                                My Path
                            </span>
                            <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight">
                                Education
                            </h2>
                        </div>
                        <p className="text-zinc-500 dark:text-zinc-400 mb-8 leading-relaxed font-medium">
                            My academic journey has been driven by curiosity and a desire to understand complex systems.
                        </p>
                        <GraduationCap size={48} className="text-zinc-100 dark:text-zinc-800" />
                    </div>

                    <div className="md:w-2/3">
                        <div className="space-y-0">
                            {educationHistory.map((item, index) => (
                                <EducationItem
                                    key={index}
                                    {...item}
                                    isLast={index === educationHistory.length - 1}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </Layout>
        </section>
    );
};
