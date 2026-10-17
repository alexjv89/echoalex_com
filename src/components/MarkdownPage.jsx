import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { replaceObsidianLinks } from '@/lib/obsidian-links';

const markdown_components = {
  img: ({ alt, node: _node, ...props }) => <img alt={alt || ''} className="ui image" {...props} />,
};

export function Markdown({ content }) {
  return (
    <ReactMarkdown
      components={markdown_components}
      rehypePlugins={[rehypeRaw]}
      remarkPlugins={[remarkGfm]}
    >
      {replaceObsidianLinks(content)}
    </ReactMarkdown>
  );
}

/** Renders a markdown page; `header` goes above the body and `children` below it. */
export default function MarkdownPage({ content, header = null, children = null }) {
  return (
    <div className="ui container page-spacing">
      <div className="ui centered stackable grid">
        <div className="ten wide large screen twelve wide computer fourteen wide tablet column">
          <article className="ui basic segment article-content">
            {header}
            <Markdown content={content} />
            {children}
          </article>
        </div>
      </div>
    </div>
  );
}
