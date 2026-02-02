import React from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';

interface BlogSearchProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    showFilters: boolean;
    setShowFilters: (show: boolean) => void;
    selectedCount: number;
}

export const BlogSearch: React.FC<BlogSearchProps> = ({
    searchQuery,
    setSearchQuery,
    showFilters,
    setShowFilters,
    selectedCount
}) => {
    return (
        <div className="flex gap-4">
            <div className="relative group flex-grow">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400 group-focus-within:text-black dark:group-focus-within:text-white transition-colors" />
                </div>
                <input
                    type="text"
                    placeholder="Search tutorials, news, or articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-11 pr-12 py-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all shadow-sm"
                />
                {searchQuery && (
                    <button
                        onClick={() => setSearchQuery('')}
                        className="absolute inset-y-0 right-14 flex items-center text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>
                )}
            </div>

            <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 lg:gap-3 px-4 lg:px-6 py-4 rounded-2xl font-bold transition-all border shadow-sm hover:cursor-pointer ${showFilters || selectedCount > 0
                    ? 'bg-black text-white dark:bg-white dark:text-black border-transparent'
                    : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-black dark:hover:border-white'
                    }`}
            >
                <SlidersHorizontal size={20} />
                <span className="hidden lg:inline">Filters</span>
                {selectedCount > 0 && (
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 dark:bg-gray-500 text-xs font-bold text-white shadow-sm">
                        {selectedCount}
                    </span>
                )}
            </button>
        </div>
    );
};
