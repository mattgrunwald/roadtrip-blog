'use client'
import { useState } from 'react'
import Image from 'next/image'

export type GalleryProps = {
  urls: string[]
}

function CarouselImage({
  src,
  onMouseOver,
  onMouseOut,
  onClick,
  isCurrent,
  first,
}: {
  src: string
  isCurrent: boolean
  first: boolean
  onMouseOver: (e: any) => void
  onMouseOut: (e: any) => void
  onClick: () => void
}) {
  return (
    <Image
      src={src}
      style={{
        objectFit: 'contain',
        height: '100%',
        width: '100%',
        display: isCurrent ? '' : 'none',
      }}
      height={384}
      width={475}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onClick={onClick}
      alt="I'm still working on accessiblity for this site"
      quality={70}
      priority={first}
    />
  )
}

function mod(n: number, m: number) {
  return ((n % m) + m) % m
}

export default function Gallery({ urls }: GalleryProps) {
  const [current, setCurrent] = useState(0)
  const [nav, setNav] = useState(false)
  const hasImages = urls.length !== 0

  const nextImage = () => setCurrent(mod(current + 1, urls.length))
  const prevImage = () => setCurrent(mod(current - 1, urls.length))

  const showNav = () => setNav(true)
  const hideNav = () => setNav(false)

  const count = urls.length === 0 ? 0 : current + 1
  return (
    <div className="relative w-full">
      <span className="opacity-50 text-xs">{`${count} of ${urls.length}`}</span>
      <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
        {hasImages &&
          urls.map((url, index) => (
            <CarouselImage
              key={url}
              src={`/images/${urls[current]}`}
              onMouseOut={hideNav}
              onMouseOver={showNav}
              onClick={nextImage}
              isCurrent={current === index}
              first={index === 0}
            />
          ))}
      </div>
      {hasImages && nav && urls.length > 1 && (
        <button
          onMouseOver={showNav}
          onMouseOut={hideNav}
          onClick={prevImage}
          type="button"
          className="absolute top-0 left-0  flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-prev
        >
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-gray-400/30 dark:bg-gray-800/30 group-hover:bg-gray-400/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>
      )}
      {hasImages && nav && urls.length > 1 && (
        <button
          onMouseOver={showNav}
          onMouseOut={hideNav}
          onClick={nextImage}
          type="button"
          className="absolute top-0 right-0 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-next
        >
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-gray-400/30 dark:bg-gray-800/30 group-hover:bg-gray-400/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
      )}
    </div>
  )
}
