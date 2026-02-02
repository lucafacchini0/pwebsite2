import React, { useEffect, useState } from 'react';
import { Layout } from '../components/common/Layout';
import { BlogCard, type BlogPostSummary } from '../components/blog/BlogCard';

const Blog: React.FC = () => {
    const [posts, setPosts] = useState<BlogPostSummary[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // In a real scenario, fetch from /blog/posts.json
        // For now, we simulate fetching or hardcode if the file doesn't exist yet.
        // I will write a mock fetcher here that tries to fetch but falls back to hardcoded data to ensure it works immediately.

        const fetchPosts = async () => {
            try {
                const response = await fetch('/blog/posts.json');
                if (response.ok) {
                    const data = await response.json();
                    setPosts(data);
                } else {
                    throw new Error("Failed to fetch");
                }
            } catch (error) {
                console.warn("Could not fetch posts.json, using fallback data.");
                // Fallback data
                setPosts([
                    {
                        slug: "tutorial1",
                        title: "Getting Started with React and Tailwind",
                        description: "A complete guide to setting up a modern web development environment using the latest tools.",
                        thumbnail: "/blog/tutorial1/thumb.png", // Assuming relative to public
                        date: "Oct 12, 2023",
                        tags: ["React", "Tutorial"],
                        author: "Luca Facchini",
                        authorAvatar: "https://ui-avatars.com/api/?name=Luca+Facchini&background=000&color=fff"
                    },
                    {
                        slug: "ui-design-principles",
                        title: "5 UI Design Principles for Developers",
                        description: "Learn the core principles of UI design that will help you build better looking applications without a designer.",
                        thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1000",
                        date: "Sep 28, 2023",
                        tags: ["Design", "UI/UX"],
                        author: "Luca Facchini",
                        authorAvatar: "https://ui-avatars.com/api/?name=Luca+Facchini&background=000&color=fff"
                    }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="pt-32 pb-24 bg-gray-50 min-h-screen">
            <Layout>
                <div className="text-center max-w-2xl mx-auto mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <span className="text-black font-semibold tracking-wider uppercase text-sm mb-2 block">The Blog</span>
                    <h1 className="text-5xl font-bold text-gray-900 mb-6">Thoughts & Tutorials.</h1>
                    <p className="text-xl text-gray-600">
                        Sharing my journey, learnings, and thoughts on technology, design, and everything in between.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-8 h-8 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                        {posts.map((post) => (
                            <BlogCard key={post.slug} post={post} />
                        ))}
                    </div>
                )}
            </Layout>
        </div>
    );
};

export default Blog;
