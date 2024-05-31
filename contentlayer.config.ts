import {
  defineDocumentType,
  defineNestedType,
  makeSource,
} from 'contentlayer/source-files'
import rehypeSlug from 'rehype-slug'
import { convertImages } from './util/contentlayer-helpers'
import { generateHeadings } from './util/headings'

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
    day: { type: 'number', required: true },
    ratio: { type: 'number', description: 'height / width', required: true },
    size: { type: 'number', required: true },
    rowSpan: { type: 'number', required: true },
    colSpan: { type: 'number', required: true },
    alt: { type: 'string', required: true },
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
    highlight: { type: 'string', default: '' },
  },
  computedFields: {
    galleryImages: {
      type: 'list',
      of: GalleryImageSource,
      resolve: async (doc) => await convertImages(doc.day),
    },
    path: {
      type: 'string',
      resolve: (post) => post._raw.flattenedPath,
    },
  },
}))

const Heading = defineNestedType(() => ({
  name: 'Heading',
  fields: {
    level: { type: 'number', required: false },
    text: { type: 'string', required: false },
    slug: { type: 'string', required: false },
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
      type: 'list',
      of: Heading,
      resolve: async (doc) => await generateHeadings(doc),
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
