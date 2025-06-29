// src/interfaces/PageMeta.ts
export interface PageMeta {
    title?: string;
    description?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogType?: string;
    ogUrl?: string;
    ogImage?: string;
    // Add other Open Graph properties as needed (e.g., og:image:alt, og:locale)

    // Standard SEO meta tags
    metaTitle?: string; // For <title> tag, can be different from og:title
    metaDescription?: string;
    canonicalUrl?: string;

    // Schema.org properties (example)
    schemaType?: string; // e.g., "WebPage", "Article"
    schemaName?: string;
    schemaDescription?: string;
    schemaUrl?: string;
    // Add other schema properties as needed
}
