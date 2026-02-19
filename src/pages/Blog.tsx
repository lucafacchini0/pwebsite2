import React, { useEffect, useMemo, useState } from 'react';
import { Layout } from '../components/common/Layout';
import { BlogCard, type BlogPostSummary } from '../components/blog/BlogCard';
import { BlogSearch } from '../components/blog/BlogSearch';
import { BlogFilters } from '../components/blog/BlogFilters';
import { BlogEmptyState } from '../components/blog/BlogEmptyState';
import matter from 'gray-matter';
import { Buffer } from 'buffer';

// This is needed for gray-matter to work in the browser
if (typeof window !== 'undefined') {
    (window as unknown as { Buffer: unknown }).Buffer = Buffer;
}

const Blog: React.FC = () => {
    const [posts, setPosts] = useState<BlogPostSummary[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
    const [showFilters, setShowFilters] = useState(false);

    const allTags = useMemo(() => {
        const tags = new Set<string>();
        posts.forEach(post => post.tags.forEach(tag => tags.add(tag)));
        return Array.from(tags).sort();
    }, [posts]);

    const filteredPosts = useMemo(() => {
        return posts.filter(post => {
            const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesTags = selectedTags.size === 0 || post.tags.some(tag => selectedTags.has(tag));
            return matchesSearch && matchesTags;
        });
    }, [posts, searchQuery, selectedTags]);

    const toggleTag = (tag: string) => {
        const newTags = new Set(selectedTags);
        if (newTags.has(tag)) {
            newTags.delete(tag);
        } else {
            newTags.add(tag);
        }
        setSelectedTags(newTags);
    };

    const clearFilters = () => {
        setSelectedTags(new Set());
    };

    const clearAll = () => {
        setSearchQuery('');
        clearFilters();
    };

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const indexRes = await fetch('/blog-index.json');
                if (!indexRes.ok) throw new Error('Failed to fetch blog-index.json');
                const slugs: string[] = await indexRes.json();

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
        <div className="pt-32 pb-24 bg-zinc-50 dark:bg-black min-h-screen transition-colors duration-200">
            <Layout>
                <div className="text-center max-w-2xl mx-auto mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <span className="text-black dark:text-white font-semibold tracking-wider uppercase text-sm mb-2 block">The Blog</span>
                    <h1 className="text-5xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">Thoughts & Tutorials.</h1>
                    <p className="text-xl text-zinc-600 dark:text-zinc-400 font-light">
                        Sharing my journey, learnings, and thoughts on technology, design, and everything in between.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto mb-12 space-y-4">
                    <BlogSearch
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        showFilters={showFilters}
                        setShowFilters={setShowFilters}
                        selectedCount={selectedTags.size}
                    />

                    <BlogFilters
                        showFilters={showFilters}
                        allTags={allTags}
                        selectedTags={selectedTags}
                        toggleTag={toggleTag}
                        clearFilters={clearFilters}
                    />
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-8 h-8 border-4 border-zinc-200 dark:border-zinc-800 border-t-black dark:border-t-white rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <>
                        {filteredPosts.length > 0 ? (
                            <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
                                {filteredPosts.map((post) => (
                                    <BlogCard key={post.slug} post={post} />
                                ))}
                            </div>
                        ) : (
                            <BlogEmptyState onClear={clearAll} />
                        )}
                    </>
                )}
            </Layout>
        </div>
    );
};

export default Blog;
