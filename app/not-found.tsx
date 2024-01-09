'use client'
import NextError from 'next/error'

export default function Error() {
  return (
    <div className="max-h-[calc(100vh-57px-16px)] overflow-hidden">
      <NextError statusCode={404} />
    </div>
  )
}
