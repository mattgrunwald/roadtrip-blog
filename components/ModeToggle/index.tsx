'use client'

import dynamic from 'next/dynamic'

export const ModeToggle = dynamic(
  () => import('./ModeToggle').then((mod) => mod.ModeToggle),
  {
    ssr: false,
  },
)
