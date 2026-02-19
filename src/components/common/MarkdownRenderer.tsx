import React, { useState } from 'react';
import ReactMarkdown, { type ExtraProps } from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Check, Copy } from 'lucide-react';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

interface MarkdownRendererProps {
    content: string;
    /** Extra Tailwind/prose classes applied to the wrapping <article> */
    className?: string;
}

// ─── Code Block with copy button ─────────────────────────────────────────────

const CodeBlock = ({ language, children }: { language: string; children: string }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(children);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="my-8 rounded-2xl overflow-hidden bg-[#282c34] border border-zinc-800 shadow-2xl group">
            <div className="flex items-center justify-between px-5 py-3 bg-[#21252b] border-b border-zinc-800/50">
                <div className="flex items-center gap-6">
                    <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                        <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                    </div>
                    <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest font-mono">
                        {language || 'code'}
                    </span>
                </div>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-zinc-500 hover:text-white transition-colors text-xs font-medium"
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

// ─── Shared Markdown Renderer ─────────────────────────────────────────────────

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = '' }) => {
    return (
        <article
            className={`
                prose prose-lg prose-zinc dark:prose-invert max-w-none
                prose-headings:font-bold prose-headings:tracking-tight
                prose-headings:text-zinc-900 dark:prose-headings:text-white
                prose-a:text-black dark:prose-a:text-white prose-a:font-bold
                prose-a:underline-offset-4 prose-a:decoration-1 hover:prose-a:decoration-2
                prose-img:rounded-3xl prose-img:shadow-xl
                prose-pre:bg-transparent prose-pre:p-0
                prose-code:text-zinc-900 dark:prose-code:text-zinc-100
                prose-code:bg-zinc-100 dark:prose-code:bg-zinc-800
                prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md
                prose-code:before:content-none prose-code:after:content-none
                ${className}
            `}
        >
            <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex]}
                components={{
                    code(props: React.HTMLAttributes<HTMLElement> & ExtraProps) {
                        const { className: codeClassName, children, ...rest } = props;
                        const match = /language-(\w+)/.exec(codeClassName || '');
                        const language = match ? match[1] : '';
                        const content = String(children).replace(/\n$/, '');

                        // react-markdown v7+ no longer passes an `inline` prop.
                        // Detect inline code: no language class AND no newlines in content.
                        const isInline = !match && !content.includes('\n');

                        return isInline ? (
                            <code className={codeClassName} {...rest}>
                                {children}
                            </code>
                        ) : (
                            <CodeBlock language={language}>
                                {content}
                            </CodeBlock>
                        );
                    },
                }}
            >
                {content}
            </ReactMarkdown>
        </article>
    );
};
