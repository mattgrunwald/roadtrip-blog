# roadtrip-blog

Simple travel blog built with [Next.js](https://nextjs.org/) 13 app dir, [Contentlayer](https://www.contentlayer.dev/), and [Tailwind CSS](https://tailwindcss.com/).

Text styling, theme and structure based on [this repo](https://github.com/shadcn/next-contentlayer).

<https://roadtrip.dog>

## Contentlayer

All pages in this site are [MDX](https://mdxjs.com/) files processed by Contentlayer. This makes adding a post as simple as writing markdown and adding images to the right directory.

### Caveat

Contentlayer allows you to compute fields based on your MDX data, but if your nested type is only used in a computed field its type won't be generated.
