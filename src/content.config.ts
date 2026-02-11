import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    author: z.string().default('Dev Proxy Team'),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
  }),
});

const samples = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    source: z.string().optional(),
    title: z.string(),
    shortDescription: z.string(),
    url: z.string(),
    downloadUrl: z.string(),
    longDescription: z.array(z.string()).default([]),
    creationDateTime: z.coerce.string(),
    updateDateTime: z.coerce.string(),
    products: z.array(z.string()).default([]),
    metadata: z.array(z.object({
      key: z.string(),
      value: z.string(),
    })).default([]),
    thumbnails: z.array(z.object({
      type: z.string(),
      order: z.number(),
      url: z.string(),
      alt: z.string(),
    })).default([]),
    authors: z.array(z.object({
      gitHubAccount: z.string(),
      pictureUrl: z.string(),
      name: z.string(),
    })).default([]),
    references: z.array(z.object({
      name: z.string(),
      description: z.string(),
      url: z.string(),
    })).default([]),
  }),
});

export const collections = { blog, samples };
