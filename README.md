# roadtrip-blog

Simple travel blog built with [Next.js](https://nextjs.org/) 13 app dir, [Contentlayer](https://www.contentlayer.dev/), and [Tailwind CSS](https://tailwindcss.com/).

Text styling, theme and structure based on [this repo](https://github.com/shadcn/next-contentlayer).

<https://roadtrip-blog.vercel.app>

## Contentlayer

All pages in this site are [MDX](https://mdxjs.com/) files processed by Contentlayer. This makes adding a post as simple as writing markdown and adding images to the right directory.

## Preprocessing

Contentlayer allows you to compute fields based on your MDX data, but this seems to require the computation to be synchronous. Generating placeholder images uses [sharp](https://github.com/lovell/sharp) which cannot run synchronously. A workaround is to generate these base64-encoded images as a prebuild step, save them in a JSON file, and have Contentlayer read from that file. This doesn't work well with hot reloading, but it works well enough.
