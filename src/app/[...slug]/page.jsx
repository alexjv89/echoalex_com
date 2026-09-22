import { notFound } from 'next/navigation';
import MarkdownPage from '@/components/MarkdownPage';
import { getPageBySlug, getStaticPageParams } from '@/lib/content';

export const dynamicParams = false;

export function generateStaticParams() {
  return getStaticPageParams();
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = getPageBySlug(slug);

  return page ? { title: page.title } : { title: 'Not Found' };
}

export default async function ContentPage({ params }) {
  const { slug } = await params;
  const page = getPageBySlug(slug);

  if (!page) {
    notFound();
  }

  return <MarkdownPage content={page.content} />;
}
