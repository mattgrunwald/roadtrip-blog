import {
  defineDocumentType,
  defineNestedType,
  makeSource,
} from 'contentlayer/source-files'
import { convertImages, convertImages2 } from './util/contentlayer-helpers'

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
    // # carouselImages: { type: 'list', of: { type: 'string' }, required: false },
  },
  computedFields: {
    // previews: {
    //   type: 'list',
    //   of: 'string',
    //   resolve: (post) =>
    //     // when computed this is not in fact an array of strings.
    //     convertImages((post.carouselImages as any)?._array || []),
    // },
    galleryImages: {
      type: 'list',
      of: GalleryImageSource,
      resolve: (post) =>
        // when computed this is not in fact an array of strings.
        convertImages2(post.day),
    },
  },
}))

export const AboutPage = defineDocumentType(() => ({
  name: 'AboutPage',
  filePathPattern: '**/about/*.mdx',
  contentType: 'mdx',
  fields: {
    name: { type: 'string', required: true },
  },
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Post, AboutPage],
})
