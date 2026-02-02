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


    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                // 1. Fetch slugs from blog-index.json
                const indexRes = await fetch('/blog-index.json');
                if (!indexRes.ok) throw new Error('Failed to fetch blog-index.json');
                const slugs: string[] = await indexRes.json();

                // 2. Fetch metadata for each post
                const loadedPosts = await Promise.all(
                    slugs.map(async (slug) => {
                        try {
                            const res = await fetch(`/post/${slug}/content.md`);
                            const contentType = res.headers.get('content-type');

                            if (!res.ok || (contentType && contentType.includes('text/html'))) {
                                return null;
                            }

                            const text = await res.text();
                            const trimmed = text.trim();
                            if (trimmed.startsWith('<!DOCTYPE') || trimmed.startsWith('<html')) {
                                return null;
                            }

                            const { data } = matter(text);

                            return {
                                slug,
                                title: data.title || slug.replace(/-/g, ' '),
                                description: data.description || '',
                                thumbnail: `/post/${slug}/thumb.png`,
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
                console.error("Failed to fetch blog posts:", error);
                setPosts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

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
