import { defineDocumentType, defineNestedType, makeSource } from 'contentlayer/source-files'

const Marker = defineNestedType(() => ({
  name: 'Marker',
  fields: {
    markerOffset: { type: 'number', required: true},
    name: {type: 'string', required: false},
    coordinates: {type: 'list', of: {type: 'number'}, required: true}
  }
}))


export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: {
    day: { type: 'number', required: true },
    date: { type: 'date', required: true },
    markers: {type: 'list', of: Marker,  required: false},
    carouselImages: {type: 'list', of: {type: 'string'}, required: false}
  },
  // computedFields: {
  //   url: { type: 'string', resolve: (post) => `/posts/${post._raw.flattenedPath}` },
  // },
}))

export default makeSource({ contentDirPath: 'posts', documentTypes: [Post] })