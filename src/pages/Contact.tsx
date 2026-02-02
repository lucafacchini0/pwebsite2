import React, { useState } from 'react';
import { Layout } from '../components/common/Layout';
import { Button } from '../components/common/Button';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactItem = ({ icon, label, value, href }: { icon: React.ReactNode, label: string, value: string, href?: string }) => (
    <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-900 dark:text-white mt-1">
            {icon}
        </div>
        <div>
            <h4 className="text-sm font-semibold text-zinc-900 dark:text-white uppercase tracking-wide mb-1">{label}</h4>
            {href ? (
                <a href={href} className="text-lg text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors">{value}</a>
            ) : (
                <p className="text-lg text-zinc-600 dark:text-zinc-300">{value}</p>
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
        <div className="pt-32 pb-20 bg-white dark:bg-black min-h-screen transition-colors duration-200">
            <Layout>
                <div className="text-center max-w-2xl mx-auto mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <span className="text-black dark:text-white font-semibold tracking-wider uppercase text-sm mb-2 block">Get In Touch</span>
                    <h1 className="text-5xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">Let's start a conversation.</h1>
                    <p className="text-xl text-zinc-600 dark:text-zinc-400 font-light">
                        Interested in working together or just want to say hi? I'd love to hear from you.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                    {/* Left: Contact Info */}
                    <div className="space-y-10 animate-in fade-in slide-in-from-left-4 duration-1000 delay-200">
                        <div className="prose prose-lg text-zinc-600 dark:text-zinc-400 font-light">
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
                        <div className="bg-zinc-50 dark:bg-zinc-900/50 p-8 rounded-3xl border border-zinc-100 dark:border-zinc-800">
                            {isSent ? (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Send size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2 uppercase tracking-tight">Message Sent!</h3>
                                    <p className="text-zinc-600 dark:text-zinc-400 mb-6 font-light">Thank you for reaching out. I'll get back to you as soon as possible.</p>
                                    <Button variant="outline" onClick={() => setIsSent(false)}>Send Another</Button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black text-zinc-900 dark:text-white focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white outline-none transition-all"
                                            placeholder="Your Name"
                                            value={formState.name}
                                            onChange={e => setFormState({ ...formState, name: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black text-zinc-900 dark:text-white focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white outline-none transition-all"
                                            placeholder="your@email.com"
                                            value={formState.email}
                                            onChange={e => setFormState({ ...formState, email: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Message</label>
                                        <textarea
                                            id="message"
                                            required
                                            rows={5}
                                            className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black text-zinc-900 dark:text-white focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white outline-none transition-all resize-none"
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
