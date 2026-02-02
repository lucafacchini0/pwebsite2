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
            <div className="p-8 bg-white dark:bg-black rounded-3xl border border-zinc-100 dark:border-zinc-900 shadow-sm space-y-6 transition-colors duration-200">
                <div className="flex items-center justify-between min-h-[32px]">
                    <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                        <Tag size={14} />
                        Categories
                    </h3>
                    <div className="h-8">
                        {selectedTags.size > 0 && (
                            <button
                                onClick={clearFilters}
                                className="hover:cursor-pointer text-sm font-bold text-zinc-900 dark:text-white px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors flex items-center gap-1"
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
                        className={`hover:cursor-pointer flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${selectedTags.size === 0
                            ? 'bg-black text-white dark:bg-white dark:text-black shadow-md'
                            : 'bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                            }`}
                    >
                        {selectedTags.size === 0 && <Check size={14} />}
                        All Posts
                    </button>
                    {allTags.map(tag => (
                        <button
                            key={tag}
                            onClick={() => toggleTag(tag)}
                            className={`hover:cursor-pointer flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold border transition-all ${selectedTags.has(tag)
                                ? 'bg-black text-white dark:bg-white dark:text-black border-transparent shadow-md'
                                : 'bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-transparent hover:border-zinc-300 dark:hover:border-zinc-700'
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
