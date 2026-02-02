import React, { useState } from 'react';
import { Layout } from '../components/common/Layout';
import { Button } from '../components/common/Button';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactItem = ({ icon, label, value, href }: { icon: React.ReactNode, label: string, value: string, href?: string }) => (
    <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-900 mt-1">
            {icon}
        </div>
        <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-1">{label}</h4>
            {href ? (
                <a href={href} className="text-lg text-gray-600 hover:text-black transition-colors">{value}</a>
            ) : (
                <p className="text-lg text-gray-600">{value}</p>
            )}
        </div>
    </div>
);

const Contact: React.FC = () => {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setIsSent(true);
        setFormState({ name: '', email: '', message: '' });
    };

    return (
        <div className="pt-32 pb-20 bg-white min-h-screen">
            <Layout>
                <div className="text-center max-w-2xl mx-auto mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <span className="text-black font-semibold tracking-wider uppercase text-sm mb-2 block">Get In Touch</span>
                    <h1 className="text-5xl font-bold text-gray-900 mb-6">Let's start a conversation.</h1>
                    <p className="text-xl text-gray-600">
                        Interested in working together or just want to say hi? I'd love to hear from you.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                    {/* Left: Contact Info */}
                    <div className="space-y-10 animate-in fade-in slide-in-from-left-4 duration-1000 delay-200">
                        <div className="prose prose-lg text-gray-600">
                            <p>
                                I am currently open to freelance projects and full-time opportunities.
                                Whether you have a question or just want to chat about tech, feel free to reach out.
                            </p>
                        </div>

                        <div className="space-y-8">
                            <ContactItem
                                icon={<Mail size={20} />}
                                label="Email"
                                value="hello@lucafacchini.com"
                                href="mailto:hello@lucafacchini.com"
                            />
                            <ContactItem
                                icon={<Phone size={20} />}
                                label="Phone"
                                value="+39 012 345 6789"
                                href="tel:+390123456789"
                            />
                            <ContactItem
                                icon={<MapPin size={20} />}
                                label="Based In"
                                value="Milan, Italy"
                            />
                        </div>
                    </div>

                    {/* Right: Form */}
                    <div className="animate-in fade-in slide-in-from-right-4 duration-1000 delay-300">
                        <div className="bg-gray-50 p-8 rounded-3xl">
                            {isSent ? (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Send size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                                    <p className="text-gray-600 mb-6">Thank you for reaching out. I'll get back to you as soon as possible.</p>
                                    <Button variant="outline" onClick={() => setIsSent(false)}>Send Another</Button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
                                            placeholder="Your Name"
                                            value={formState.name}
                                            onChange={e => setFormState({ ...formState, name: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
                                            placeholder="your@email.com"
                                            value={formState.email}
                                            onChange={e => setFormState({ ...formState, email: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                        <textarea
                                            id="message"
                                            required
                                            rows={5}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all resize-none"
                                            placeholder="How can I help you?"
                                            value={formState.message}
                                            onChange={e => setFormState({ ...formState, message: e.target.value })}
                                        ></textarea>
                                    </div>
                                    <Button type="submit" fullWidth disabled={isSubmitting}>
                                        {isSubmitting ? 'Sending...' : 'Send Message'}
                                    </Button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    );
};

export default Contact;
