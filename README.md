# roadtrip-blog

Simple travel blog built with [Next.js](https://nextjs.org/) 13 app dir, [Contentlayer](https://www.contentlayer.dev/), and [Tailwind CSS](https://tailwindcss.com/).

Text styling, theme and structure based on [this repo](https://github.com/shadcn/next-contentlayer).

<https://roadtrip-blog.vercel.app>

## Contentlayer

All pages in this site are [MDX](https://mdxjs.com/) files processed by Contentlayer. This makes adding a post as simple as writing markdown and adding images to the right directory.

## Preprocessing

Contentlayer allows you to compute fields based on your MDX data, but this seems to require the computation to be synchronous. Generating placeholder images uses [sharp](https://github.com/lovell/sharp) which cannot run synchronously. A workaround is to make the type of this field 'json' and add your own type to the field in your code.
