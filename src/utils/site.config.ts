// src/utils/siteConfig.ts

export const siteConfig = {
    siteUrl: 'https://narwhalmagazine.com',
    siteName: 'Narwhal Magazine',
    defaultTitle: 'Narwhal Magazine',
    defaultDescription: 'The horn, is in fact, a tooth!',
    defaultOgImage: '/images/narwhal-default.jpg',

    // Optional overrides for Open Graph specific titles/descriptions
    // If left blank, they will fall back to defaultTitle/defaultDescription as per BaseHTML.astro logic
    defaultOgTitle: 'Narwhal Magazine', // Using your default site title as you left this blank
    defaultOgDescription: 'Image is nothing, thirst is everything',

    // Default values for other properties (often match defaultTitle/defaultDescription)
    defaultMetaTitle: 'Narwhal Magazine',
    defaultMetaDescription: 'The horn, is in fact, a tooth!',
    defaultOgType: 'website', // Common default for most sites
    defaultSchemaType: 'WebPage', // Common default for most pages
    defaultSchemaName: 'Narwhal Magazine',
    defaultSchemaDescription: 'The horn, is in fact, a tooth!',
};
