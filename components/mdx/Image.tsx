import { IMAGE_QUALITY } from '@/util/consts'
import clsx from 'clsx'
import NextImage from 'next/image'
export const Image = (props: any) => {
  const { ack, small, className, ...imageProps } = props
  const sizes = small
    ? '(max-width:640px) 100vw, 700px'
    : '(max-width:640px) 100vw, (max-width: 1535px) 700px, 800px'
  return (
    <figure>
      <NextImage
        height={800}
        width={800}
        quality={100}
        sizes={sizes}
        className={clsx('translate-x-0 translate-y-0 transform-gpu', className)}
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
