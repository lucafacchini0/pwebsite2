import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MarkdownRendererProps {
    content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
    return (
        <article className="prose prose-lg prose-gray max-w-none 
      prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-gray-900 
      prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
      prose-img:rounded-2xl prose-img:shadow-lg
      prose-pre:bg-transparent prose-pre:p-0
    ">
            <ReactMarkdown
                components={{
                    code({ node, inline, className, children, ...props }: any) {
                        const match = /language-(\w+)/.exec(className || '');
                        return !inline && match ? (
                            <div className="my-6 rounded-xl overflow-hidden bg-[#1e1e1e] border border-gray-800">
                                {/* MacOS Window Header */}
                                <div className="flex items-center px-4 py-3 bg-[#252526] border-b border-gray-800">
                                    <div className="flex space-x-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors cursor-pointer" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors cursor-pointer" />
                                        <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors cursor-pointer" />
                                    </div>
                                    <div className="ml-4 text-xs text-gray-400 font-mono">
                                        {match[1]}
                                    </div>
                                </div>
                                <SyntaxHighlighter
                                    style={vscDarkPlus}
                                    language={match[1]}
                                    PreTag="div"
                                    customStyle={{
                                        margin: 0,
                                        padding: '1.5rem',
                                        background: 'transparent',
                                        fontSize: '0.9rem',
                                        lineHeight: '1.5',
                                    }}
                                    {...props}
                                >
                                    {String(children).replace(/\n$/, '')}
                                </SyntaxHighlighter>
                            </div>
                        ) : (
                            <code className={className} {...props}>
                                {children}
                            </code>
                        );
                    }
                }}
            >
                {content}
            </ReactMarkdown>
        </article>
    );
};
