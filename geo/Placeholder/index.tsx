'use client'

import dynamic from 'next/dynamic'

export const Placeholder = dynamic(
  () => import('./Placeholder').then((mod) => mod.Placeholder),
  {
    ssr: false,
  },
)
