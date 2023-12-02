import { Size } from '@/util/types'
import Image from 'next/image'
import { MouseEventHandler, useMemo, useRef } from 'react'

export type GalleryImageProps = {
  src: string
  blurSrc: string
  isCurrent: boolean
  first: boolean
  isCloseToCurrent: boolean
  size: Size
  modal?: boolean
  blur?: boolean
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
  modal = false,
  blur = false,
}: GalleryImageProps) => {
  const sizeSet = useMemo(
    () =>
      modal
        ? `(max-width: 400px) 400px, (max-width:640px) 500px, ${
            size === Size.Wide ? '100vw' : '100vh'
          }`
        : '(max-width: 400px) 350px, (max-width:640px) 400px, (max-width: 1024px) 50%, (max-width: 1535px) 500px, 580px',
    [modal, size],
  )

  const objectFit = useMemo(
    () =>
      !modal && size === Size.Normal
        ? 'xl:object-cover object-contain'
        : 'object-contain',
    [modal, size],
  )

  // const ref = useRef<HTMLElement>(null)

  // const height = ref.current
  //   ? ref.current.getBoundingClientRect().height + 4
  //   : undefined
  // const width = ref.current
  //   ? ref.current.getBoundingClientRect().width + 4
  //   : undefined

  // const fill = height === undefined && width === undefined

  return (
    <>
      <Image
        src={src}
        className={`
      object-contain
      ${isCurrent || isCloseToCurrent ? 'block' : 'hidden'}
      ${isCurrent ? 'visible' : 'invisible'}
      z-10
      `}
        fill
        sizes={sizeSet}
        onClick={onClick}
        alt=""
        quality={65}
        priority={first}
        placeholder="blur"
        blurDataURL={blurSrc}
      />

      {!modal && (
        <Image
          src={src}
          className={`
        object-cover
        z-0
        blur-lg
        opacity-50
      ${isCurrent ? 'block' : 'hidden'}
      `}
          fill
          sizes={sizeSet}
          alt=""
          quality={65}
          priority={first}
        />
      )}
    </>
  )
}
