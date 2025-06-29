import { defineCollection, z, reference } from 'astro:content';

/**
 * The PageMeta interface is imported here for reference.
 * The Zod schema below includes optional fields that directly correspond
 * to the PageMeta properties. This allows you to override default SEO
 * and social sharing settings on a per-story basis directly from your
 * Markdown frontmatter.
 */

// 1. Define the new 'authors' collection
const authorsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        name: z.string(),
        bio: z.string(),
        stories: z.array(reference('stories')).optional(),
    }),
});

// 2. Update the 'stories' collection schema
const storiesCollection = defineCollection({
    type: 'content', // This collection contains .md or .mdx files
    schema: z.object({
        // --- Core Story Fields (Required) ---
        title: z.string(),
        description: z.string(), // A short summary for content lists and default meta description
        // The 'author' field now points to a single entry in the 'authors' collection
        author: reference('authors'),
        issue: z.number(),
        tags: z.array(z.string()),
        image: z.object({
            src: z.string(), // Path to the image, e.g., /images/stories/my-image.jpg
            alt: z.string(),
        }),

        // --- SEO & PageMeta Overrides (Optional) ---
        metaTitle: z.string().optional(),
        metaDescription: z.string().optional(),
        ogTitle: z.string().optional(),
        ogDescription: z.string().optional(),
        ogImage: z.string().url().optional(),

        // --- Slug Override ---
        slug: z.string().optional(),
    }),
});

// 3. Export both collections so Astro can recognize them
export const collections = {
    stories: storiesCollection,
    authors: authorsCollection,
};