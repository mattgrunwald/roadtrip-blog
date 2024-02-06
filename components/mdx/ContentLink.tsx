import NextLink from 'next/link'

export const ContentLink = (props: any) => {
  const href = props.href
  const isInternalLink = href && href.startsWith('/')

  if (isInternalLink) {
    return <NextLink href={href}>{props.children}</NextLink>
  }
  return <a target="_blank" rel="noopener noreferrer" {...props} />
}
