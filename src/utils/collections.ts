import { getCollection, getEntry, getEntries } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

// --- Type Definitions for Clarity and Safety ---

export type StoryWithAuthor = {
    story: CollectionEntry<'stories'>;
    author: CollectionEntry<'authors'> | null;
};

export type AuthorWithStories = {
    author: CollectionEntry<'authors'>;
    stories: CollectionEntry<'stories'>[];
};


// --- Reusable Functions ---

/**
 * Fetches all stories and enriches them with their full author data.
 * This is the single source of truth for getting a list of all stories.
 * @returns {Promise<StoryWithAuthor[]>} A promise that resolves to an array of story/author objects.
 */
export async function getStoriesWithAuthors(): Promise<StoryWithAuthor[]> {
    const allStories = await getCollection('stories');

    const storiesWithAuthors = await Promise.all(
        allStories.map(async (story) => {
            const author = story.data.author
                // Explicitly providing the collection and slug is the most robust method.
                ? await getEntry('authors', story.data.author)
                : null;

            return { story, author };
        })
    );

    return storiesWithAuthors;
}

/**
 * Fetches a single author by their slug and enriches their data with all the stories they have written.
 * @param {string} authorSlug - The slug of the author to fetch.
 * @returns {Promise<AuthorWithStories | null>} A promise that resolves to the author with their stories, or null if not found.
 */
export async function getAuthorWithStories(authorSlug: string): Promise<AuthorWithStories | null> {
    const author = await getEntry('authors', authorSlug);

    if (!author) {
        return null;
    }

    let relatedStories: CollectionEntry<'stories'>[] = [];
    if (author.data.stories && author.data.stories.length > 0) {
        // getEntries is efficient for fetching multiple entries from a list of references.
        // We must transform the array of slugs into an array of reference objects.
        const storyReferences = author.data.stories.map(slug => ({
            collection: 'stories' as const,
            slug: slug,
        }));
        // The filter(Boolean) step removes any stories that might not have been found, preventing errors.
        relatedStories = (await getEntries(storyReferences)).filter(Boolean);
    }

    return {
        author,
        stories: relatedStories,
    };
}