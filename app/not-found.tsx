'use client'
import NextError from 'next/error'

export default function Error() {
  return <NextError statusCode={404} />
}
