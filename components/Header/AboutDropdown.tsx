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
      <Menu.Items className="absolute mt-2 rounded-md dark:bg-gray-700 bg-gray-200 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        {React.Children.map(children, (child) => (
          <div className="m-2 hover:underline hover:text-red-400">
            <Menu.Item>{child}</Menu.Item>
          </div>
        ))}
      </Menu.Items>
    </Menu>
  )
}
