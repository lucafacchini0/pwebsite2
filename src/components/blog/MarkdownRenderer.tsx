import React from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownRendererProps {
    content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
    return (
        <article className="prose prose-lg prose-gray max-w-none 
      prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-gray-900 
      prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
      prose-img:rounded-2xl prose-img:shadow-lg
      prose-code:text-pink-600 prose-code:bg-pink-50 prose-code:px-1 prose-code:rounded
      prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-xl
    ">
            <ReactMarkdown>{content}</ReactMarkdown>
        </article>
    );
};
