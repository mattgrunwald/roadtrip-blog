import { IMAGE_QUALITY } from '@/util/consts'
import { Size } from '@/util/types'
import clsx from 'clsx'
import Image from 'next/image'
import { MouseEventHandler } from 'react'

export type GalleryImageProps = {
  src: string
  blurSrc: string
  isCurrent: boolean
  first: boolean
  isCloseToCurrent: boolean
  size: Size
  alt: string
  modal?: boolean
  onClick: MouseEventHandler
}

export const GalleryImage = ({
  src,
  blurSrc,
  onClick,
  isCurrent,
  isCloseToCurrent,
  first,
  size,
  alt,
  modal = false,
}: GalleryImageProps) => {
  let uniqueModalSize =
    '(max-width: 2600px) 66vw, (max-width: 4100px) 50vw, 33vw'
  if (size === Size.Tall) {
    uniqueModalSize = '(max-width: 2600px) 33vw, 25vw'
  } else if (size === Size.Wide) {
    uniqueModalSize = '100vw'
  }

  const sizeSet = modal
    ? `(max-width: 400px) 400px, (max-width: 640px) 500px, ${uniqueModalSize}`
    : '(max-width: 400px) 350px, (max-width: 640px) 400px, (max-width: 1024px) 50%, (max-width: 1535px) 500px, 580px'

  const sharedProps = {
    fill: true,
    sizes: sizeSet,
    quality: modal ? 100 : IMAGE_QUALITY,
    priority: first,
  }

  return (
    <>
      <Image
        src={src}
        className={clsx(
          'z-10 translate-x-0 translate-y-0 transform-gpu',
          !modal && size === Size.Normal
            ? 'object-contain max-md:object-cover xl:object-cover'
            : 'object-contain',
          isCurrent || isCloseToCurrent ? 'block' : 'hidden',
          isCurrent ? 'visible' : 'invisible',
        )}
        {...sharedProps}
        alt={alt}
        onClick={onClick}
        placeholder="blur"
        blurDataURL={blurSrc}
      />

      {!modal && (
        <Image
          src={src}
          className={clsx(
            'object-cover opacity-75 blur-lg',
            isCurrent ? 'block' : 'hidden',
          )}
          alt="blurred image background"
          {...sharedProps}
        />
      )}
    </>
  )
}
