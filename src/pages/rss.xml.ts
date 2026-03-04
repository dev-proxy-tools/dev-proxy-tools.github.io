import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = (await getCollection('blog')).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );

  return rss({
    title: 'Dev Proxy Blog',
    description: 'Release announcements, how-to guides, and insights from the Dev Proxy team.',
    site: context.site?.href ?? 'https://devproxy.net',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      author: post.data.author,
      link: `${import.meta.env.BASE_URL}blog/${post.id.replace(/\.md$/, '')}/`,
    })),
  });
}
