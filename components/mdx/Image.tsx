import { IMAGE_QUALITY } from '@/util/consts'
import NextImage from 'next/image'
export const Image = (props: any) => {
  const { ack, small, ...imageProps } = props
  const sizes = small
    ? '(max-width:640px) 100vw, 700px'
    : '(max-width:640px) 100vw, (max-width: 1535px) 700px, 800px'
  return (
    <figure>
      <NextImage
        height={800}
        width={800}
        quality={IMAGE_QUALITY}
        sizes={sizes}
        {...imageProps}
      />
      {ack && (
        <figcaption className="text-right">
          <i>{ack}</i>
        </figcaption>
      )}
    </figure>
  )
}
