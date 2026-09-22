import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { replaceObsidianLinks } from '@/lib/obsidian-links';

const markdown_components = {
  img: ({ alt, node: _node, ...props }) => <img alt={alt || ''} className="ui image" {...props} />,
};

export default function MarkdownPage({ content }) {
  const compatible_content = replaceObsidianLinks(content);

  return (
    <div className="ui container page-spacing">
      <div className="ui centered stackable grid">
        <div className="ten wide large screen twelve wide computer fourteen wide tablet column">
          <article className="ui basic segment article-content">
            <ReactMarkdown
              components={markdown_components}
              rehypePlugins={[rehypeRaw]}
              remarkPlugins={[remarkGfm]}
            >
              {compatible_content}
            </ReactMarkdown>
          </article>
        </div>
      </div>
    </div>
  );
}
