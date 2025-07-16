# roadtrip-blog

Simple travel blog built with [Next.js](https://nextjs.org/) 15 app dir, [Contentlayer](https://www.contentlayer.dev/), and [Tailwind CSS](https://tailwindcss.com/).

[roadtrip.dog](https://roadtrip.dog)

## Contentlayer

All pages in this site are [MDX](https://mdxjs.com/) files processed by Contentlayer. This makes adding a post as simple as writing markdown and adding images to the right directory.

### Caveat

Contentlayer allows you to compute fields based on your MDX data, but if your nested type is only used in a computed field its type won't be generated.

### Images

Image order and alt text is taken from the file name itself. For example, `1_desert_rock.jpg` will be the first image displayed and will have the alt text "desert rock".

> Special file names are optional and files names are sorted in lexographic order.
