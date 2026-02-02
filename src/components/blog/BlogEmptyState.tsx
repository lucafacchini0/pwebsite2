import React from 'react';
import { Search } from 'lucide-react';

interface BlogEmptyStateProps {
    onClear: () => void;
}

export const BlogEmptyState: React.FC<BlogEmptyStateProps> = ({ onClear }) => {
    return (
        <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <Search className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No posts found</h3>
            <p className="text-gray-500 dark:text-gray-400">
                Try adjusting your search or filter to find what you're looking for.
            </p>
            <button
                onClick={onClear}
                className="mt-6 text-black dark:text-white font-bold border-b-2 border-black dark:border-white hover:opacity-70 transition-opacity"
            >
                Clear all filters
            </button>
        </div>
    );
};
