import {
  defineDocumentType,
  defineNestedType,
  makeSource,
} from 'contentlayer/source-files'
import rehypeSlug from 'rehype-slug'
import GithubSlugger from 'github-slugger'
import { convertImages } from './util/contentlayer-helpers'

const Marker = defineNestedType(() => ({
  name: 'Marker',
  fields: {
    markerOffset: { type: 'number', required: true },
    name: { type: 'string', required: false },
    coordinates: { type: 'list', of: { type: 'number' }, required: true },
  },
}))

const GalleryImageSource = defineNestedType(() => ({
  name: 'GalleryImageSource',
  fields: {
    src: { type: 'string', required: true },
    preview: { type: 'string', required: true },
  },
}))

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: '**/posts/*.mdx',
  contentType: 'mdx',
  fields: {
    day: { type: 'number', required: true },
    date: { type: 'date', required: true },
    markers: { type: 'list', of: Marker, required: false },
  },
  computedFields: {
    galleryImages: {
      type: 'json',
      of: GalleryImageSource,
      resolve: async (doc) => await convertImages(doc.day),
    },
    path: {
      type: 'string',
      resolve: (post) => post._raw.flattenedPath,
    },
  },
}))

export const AboutPage = defineDocumentType(() => ({
  name: 'AboutPage',
  filePathPattern: '**/about/*.mdx',
  contentType: 'mdx',
  fields: {
    name: { type: 'string', required: true },
    toc: { type: 'boolean', required: true, default: false },
  },
  computedFields: {
    path: {
      type: 'string',
      resolve: (page) => page._raw.flattenedPath,
    },

    headings: {
      type: 'json',
      resolve: async (doc) => {
        const regXHeader = /\n(?<flag>#{1,6})\s+(?<content>.+)/g
        const slugger = new GithubSlugger()
        const headings = Array.from(doc.body.raw.matchAll(regXHeader)).map(
          ({ groups }) => {
            const flag = groups?.flag
            const content = groups?.content
            return {
              level: flag?.length,
              text: content,
              slug: content ? slugger.slug(content) : undefined,
            }
          },
        )
        return headings
      },
    },
  },
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Post, AboutPage],
  mdx: {
    rehypePlugins: [rehypeSlug],
  },
})
