'use client'
import { Menu } from '@headlessui/react'
import React from 'react'
import { ACCENT_TEXT_CLASS } from '@/util/consts'

export function AboutDropdown({
  name,
  children,
}: {
  name: string
  children: React.ReactNode
}) {
  return (
    <Menu>
      <Menu.Button className={`hover:${ACCENT_TEXT_CLASS}`}>{name}</Menu.Button>
      <Menu.Items className="absolute mt-2">
        <div className="grid grid-cols-1 px-2 py-2 space-y-2 rounded-lg dark:bg-gray-700 bg-gray-200">
          {React.Children.map(children, (child) => (
            <Menu.Item>{child}</Menu.Item>
          ))}
        </div>
      </Menu.Items>
    </Menu>
  )
}
