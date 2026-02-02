import React from 'react';
import { Search } from 'lucide-react';

interface BlogEmptyStateProps {
    onClear: () => void;
}

export const BlogEmptyState: React.FC<BlogEmptyStateProps> = ({ onClear }) => {
    return (
        <div className="text-center py-20 bg-white dark:bg-black rounded-3xl border border-zinc-100 dark:border-zinc-900 shadow-sm transition-colors duration-200">
            <Search className="h-12 w-12 text-zinc-300 dark:text-zinc-700 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2 uppercase tracking-tight">No posts found</h3>
            <p className="text-zinc-500 dark:text-zinc-400 font-light">
                Try adjusting your search or filter to find what you're looking for.
            </p>
            <button
                onClick={onClear}
                className="mt-6 text-black dark:text-white font-bold border-b-2 border-black dark:border-white hover:opacity-70 transition-opacity uppercase text-sm tracking-widest"
            >
                Clear all filters
            </button>
        </div>
    );
};
