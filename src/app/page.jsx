import MarkdownPage from '@/components/MarkdownPage';
import { getPageBySlug } from '@/lib/content';

export function generateMetadata() {
  const page = getPageBySlug([]);
  return { title: page.title };
}

export default function HomePage() {
  const page = getPageBySlug([]);
  return <MarkdownPage content={page.content} />;
}
