import NextImage from 'next/image'
export const Image = (props: any) => {
  const sizes = '(max-width:640px) 100vw, (max-width: 1535px) 700px, 800px'
  const { ack, ...imageProps } = props
  return (
    <figure>
      <NextImage height={800} width={800} sizes={sizes} {...imageProps} />
      {ack && (
        <figcaption className="text-right">{`Source: ${ack}`}</figcaption>
      )}
    </figure>
  )
}
