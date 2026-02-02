import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Check, Copy } from 'lucide-react';

interface MarkdownRendererProps {
    content: string;
}

const CodeBlock = ({ language, children }: { language: string, children: string }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(children);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="my-8 rounded-2xl overflow-hidden bg-[#282c34] border border-gray-800 shadow-2xl group">
            <div className="flex items-center justify-between px-5 py-3 bg-[#21252b] border-b border-gray-800/50">
                <div className="flex items-center gap-6">
                    <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                        <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                    </div>
                    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest font-mono">
                        {language || 'code'}
                    </span>
                </div>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-gray-500 hover:text-white transition-colors text-xs font-medium"
                >
                    {copied ? (
                        <>
                            <Check size={14} className="text-green-400" />
                            <span className="text-green-400">Copied!</span>
                        </>
                    ) : (
                        <>
                            <Copy size={14} />
                            <span>Copy</span>
                        </>
                    )}
                </button>
            </div>
            <SyntaxHighlighter
                style={oneDark}
                language={language}
                PreTag="div"
                customStyle={{
                    margin: 0,
                    padding: '1.5rem',
                    background: 'transparent',
                    fontSize: '0.95rem',
                    lineHeight: '1.6',
                    fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                }}
            >
                {children}
            </SyntaxHighlighter>
        </div>
    );
};

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
    return (
        <article className="prose prose-lg prose-gray max-w-none 
      prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-gray-900 
      prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
      prose-img:rounded-3xl prose-img:shadow-xl
      prose-pre:bg-transparent prose-pre:p-0
      prose-code:text-blue-600 prose-code:bg-blue-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none
    ">
            <ReactMarkdown
                components={{
                    code({ node, inline, className, children, ...props }: any) {
                        const match = /language-(\w+)/.exec(className || '');
                        const language = match ? match[1] : '';
                        
                        return !inline ? (
                            <CodeBlock language={language}>
                                {String(children).replace(/\n$/, '')}
                            </CodeBlock>
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
