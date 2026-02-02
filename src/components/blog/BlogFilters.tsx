import React from 'react';
import { Tag, X, Check } from 'lucide-react';

interface BlogFiltersProps {
    showFilters: boolean;
    allTags: string[];
    selectedTags: Set<string>;
    toggleTag: (tag: string) => void;
    clearFilters: () => void;
}

export const BlogFilters: React.FC<BlogFiltersProps> = ({
    showFilters,
    allTags,
    selectedTags,
    toggleTag,
    clearFilters
}) => {
    return (
        <div className={`${showFilters ? 'h-auto opacity-100 mt-6' : 'h-0 opacity-0 pointer-events-none'
            }`}>
            <div className="p-8 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-6">
                <div className="flex items-center justify-between min-h-[32px]">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                        <Tag size={14} />
                        Categories
                    </h3>
                    <div className="h-8">
                        {selectedTags.size > 0 && (
                            <button
                                onClick={clearFilters}
                                className="hover:cursor-pointer text-sm font-bold text-gray-900 dark:text-white px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-1"
                            >
                                <X size={14} />
                                Clear all
                            </button>
                        )}
                    </div>
                </div>
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={clearFilters}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold ${selectedTags.size === 0
                            ? 'bg-black text-white dark:bg-white dark:text-black shadow-md'
                            : 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                    >
                        {selectedTags.size === 0 && <Check size={14} />}
                        All Posts
                    </button>
                    {allTags.map(tag => (
                        <button
                            key={tag}
                            onClick={() => toggleTag(tag)}
                            className={`hover:cursor-pointer flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold border ${selectedTags.has(tag)
                                ? 'bg-black text-white dark:bg-white dark:text-black border-transparent shadow-md'
                                : 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                                }`}
                        >
                            {selectedTags.has(tag) && <Check size={14} />}
                            {tag}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
