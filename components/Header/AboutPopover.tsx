'use client'
import Link from 'next/link'
import { Popover } from '@headlessui/react'
import React, { useMemo } from 'react'
import { useTheme } from 'next-themes'
import { ACCENT_TEXT_CLASS } from '@/util/consts'

export function AboutPopover({
  name,
  children,
}: {
  name: string
  children: React.ReactNode
}) {
  const { theme } = useTheme()

  const backgroundColor = useMemo(
    () => (theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'),
    [theme],
  )

  return (
    <Popover>
      <Popover.Button className={`hover:${ACCENT_TEXT_CLASS}`}>
        {name}
      </Popover.Button>

      <Popover.Panel className="absolute z-10 mt-2">
        <div
          className={`grid grid-cols-1 px-2 py-2 space-y-2 rounded-lg ${backgroundColor}`}
        >
          {children}
        </div>
      </Popover.Panel>
    </Popover>
  )
}
