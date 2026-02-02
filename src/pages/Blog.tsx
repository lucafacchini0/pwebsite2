import React, { useEffect, useState } from 'react';
import { Layout } from '../components/common/Layout';
import { BlogCard, type BlogPostSummary } from '../components/blog/BlogCard';
import matter from 'gray-matter';
import { Buffer } from 'buffer';

// This is needed for gray-matter to work in the browser
if (typeof window !== 'undefined') {
    (window as any).Buffer = Buffer;
}

const Blog: React.FC = () => {
    const [posts, setPosts] = useState<BlogPostSummary[]>([]);
    const [loading, setLoading] = useState(true);


    // State for post slugs
    const [postSlugs, setPostSlugs] = useState<string[]>([]);


    useEffect(() => {
        // Fetch slugs from blog-index.json
        const fetchSlugs = async () => {
            try {
                const res = await fetch('/blog-index.json');
                if (!res.ok) throw new Error('Failed to fetch blog-index.json');
                const slugs = await res.json();
                setPostSlugs(Array.isArray(slugs) ? slugs : []);
            } catch (err) {
                console.error('Error fetching blog-index.json:', err);
                setPostSlugs([]);
            }
        };
        fetchSlugs();
    }, []);

    useEffect(() => {
        if (postSlugs.length === 0) {
            setPosts([]);
            setLoading(false);
            return;
        }
        const fetchAllPosts = async () => {
            try {
                const loadedPosts = await Promise.all(
                    postSlugs.map(async (slug) => {
                        try {
                            const res = await fetch(`/post/${slug}/content.md`);
                            if (!res.ok) return null;
                            // Check if the response is actually HTML (SPA fallback)
                            const contentType = res.headers.get("content-type");
                            if (contentType && contentType.includes("text/html")) {
                                return null;
                            }
                            const text = await res.text();
                            // Double check content just in case
                            if (text.trim().startsWith("<!DOCTYPE html") || text.trim().startsWith("<html")) {
                                return null;
                            }
                            const { data } = matter(text);
                            // Check for thumb.png
                            const thumbRes = await fetch(`/post/${slug}/thumb.png`, { method: 'HEAD' });
                            return {
                                slug,
                                title: data.title || slug.replace(/-/g, ' '),
                                description: data.description || '',
                                thumbnail: thumbRes.ok ? `/post/${slug}/thumb.png` : '',
                                date: data.date || '',
                                tags: data.tags || [],
                                author: data.author || 'Luca Facchini',
                                authorAvatar: data.authorAvatar || `https://ui-avatars.com/api/?name=${data.author || 'Luca+Facchini'}`
                            };
                        } catch (err) {
                            console.error(`Error loading post ${slug}:`, err);
                            return null;
                        }
                    })
                );
                setPosts(loadedPosts.filter((p): p is BlogPostSummary => p !== null));
            } catch (error) {
                console.error("Failed to fetch posts:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAllPosts();
    }, [postSlugs]);

    return (
        <div className="pt-32 pb-24 bg-gray-50 dark:bg-gray-800 min-h-screen transition-colors duration-200">
            <Layout>
                <div className="text-center max-w-2xl mx-auto mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <span className="text-black dark:text-white font-semibold tracking-wider uppercase text-sm mb-2 block">The Blog</span>
                    <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">Thoughts & Tutorials.</h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                        Sharing my journey, learnings, and thoughts on technology, design, and everything in between.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-8 h-8 border-4 border-gray-300 dark:border-gray-600 border-t-black dark:border-t-white rounded-full animate-spin"></div>
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
