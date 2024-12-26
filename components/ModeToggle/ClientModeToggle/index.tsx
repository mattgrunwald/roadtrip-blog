'use client'

import dynamic from 'next/dynamic'

export const ClientModeToggle = dynamic(
  () => import('./ClientModeToggle').then((mod) => mod.ClientModeToggle),
  {
    ssr: false,
  },
)
