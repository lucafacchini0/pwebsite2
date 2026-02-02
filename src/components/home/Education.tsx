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
                <span className="text-sm font-bold text-zinc-400 dark:text-zinc-500 group-hover:text-black dark:group-hover:text-white transition-colors">{year}</span>
            </div>

            {/* Center: Line & Dot */}
            <div className={`absolute left-1/4 transform -translate-x-px h-full border-l border-zinc-200 dark:border-zinc-800 ${isLast ? 'hidden md:hidden' : ''}`}></div>
            <div className="absolute left-1/4 transform -translate-x-1.5 w-3 h-3 bg-white dark:bg-black border-2 border-zinc-300 dark:border-zinc-700 group-hover:border-black dark:group-hover:border-white group-hover:scale-125 transition-all"></div>

            {/* Right: Content */}
            <div className="w-3/4 pl-8 pb-12">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-1">{degree}</h3>
                <h4 className="text-md font-medium text-zinc-500 dark:text-zinc-400 mb-4">{institution}</h4>
                <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">{description}</p>
            </div>
        </div>

        {/* Mobile: Simple stack */}
        <div className="md:hidden pb-10 relative border-l border-zinc-200 dark:border-zinc-800 pl-6 ml-2">
            <div className="absolute -left-1.5 top-0 w-3 h-3 bg-white dark:bg-black border-2 border-zinc-300 dark:border-zinc-700 rounded-full"></div>
            <span className="inline-block px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-xs font-bold text-zinc-500 dark:text-zinc-400 rounded mb-2">{year}</span>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">{degree}</h3>
            <h4 className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-2">{institution}</h4>
            <p className="text-zinc-600 dark:text-zinc-300 text-sm">{description}</p>
        </div>
    </div>
);

export const Education: React.FC = () => {
    const educationHistory = [
        {
            year: "2023 - Present",
            degree: "Master in Computer Science",
            institution: "Politecnico di Milano",
            description: "Specializing in Artificial Intelligence and Software Engineering. Researching LLM applications in web development."
        },
        {
            year: "2020 - 2023",
            degree: "Bachelor in Computer Engineering",
            institution: "University of Bologna",
            description: "Graduated with honors. Fundamentals of computer architecture, algorithms, and agile methodologies."
        },
        {
            year: "2015 - 2020",
            degree: "Scientific High School Diploma",
            institution: "Liceo Scientifico A. Einstein",
            description: "Focus on mathematics and physics. Developed early interest in programming through extracurricular courses."
        }
    ];

    return (
        <section className="py-24 bg-zinc-50 dark:bg-black transition-colors duration-200">
            <Layout>
                <div className="flex flex-col md:flex-row gap-12">
                    <div className="md:w-1/3">
                        <span className="text-black dark:text-white font-semibold tracking-wider uppercase text-sm mb-2 block">My Path</span>
                        <h2 className="text-4xl font-bold text-zinc-900 dark:text-white mb-6">Education</h2>
                        <p className="text-zinc-600 dark:text-zinc-300 mb-8">
                            My academic journey has been driven by curiosity and a desire to understand complex systems.
                        </p>
                        <GraduationCap size={48} className="text-zinc-200 dark:text-zinc-800" />
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
