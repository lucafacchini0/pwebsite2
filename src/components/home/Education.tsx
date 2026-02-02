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
        {/* Desktop: Alternating timeline? Minimal simple list is safer for "clean/minimal". 
       Let's stick to a clean vertical list with a timeline line.
    */}
        <div className="hidden md:flex items-start justify-between group">
            {/* Left: Year */}
            <div className="w-1/4 text-right pr-8 pt-1">
                <span className="text-sm font-bold text-gray-400 group-hover:text-black transition-colors">{year}</span>
            </div>

            {/* Center: Line & Dot */}
            <div className={`absolute left-1/4 transform -translate-x-px h-full border-l border-gray-200 ${isLast ? 'hidden md:hidden' : ''}`}></div>
            <div className="absolute left-1/4 transform -translate-x-1.5 w-3 h-3 bg-white border-2 border-gray-300 rounded-full group-hover:border-black group-hover:scale-125 transition-all"></div>

            {/* Right: Content */}
            <div className="w-3/4 pl-8 pb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{degree}</h3>
                <h4 className="text-md font-medium text-gray-500 mb-4">{institution}</h4>
                <p className="text-gray-600 leading-relaxed">{description}</p>
            </div>
        </div>

        {/* Mobile: Simple stack */}
        <div className="md:hidden pb-10 relative border-l border-gray-200 pl-6 ml-2">
            <div className="absolute -left-1.5 top-0 w-3 h-3 bg-white border-2 border-gray-300 rounded-full"></div>
            <span className="inline-block px-2 py-1 bg-gray-100 text-xs font-bold text-gray-500 rounded mb-2">{year}</span>
            <h3 className="text-lg font-bold text-gray-900">{degree}</h3>
            <h4 className="text-sm font-medium text-gray-500 mb-2">{institution}</h4>
            <p className="text-gray-600 text-sm">{description}</p>
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
        <section className="py-24 bg-gray-50">
            <Layout>
                <div className="flex flex-col md:flex-row gap-12">
                    <div className="md:w-1/3">
                        <span className="text-black font-semibold tracking-wider uppercase text-sm mb-2 block">My Path</span>
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">Education</h2>
                        <p className="text-gray-600 mb-8">
                            My academic journey has been driven by curiosity and a desire to understand complex systems.
                        </p>
                        <GraduationCap size={48} className="text-gray-200" />
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
