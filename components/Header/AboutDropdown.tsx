'use client'
import { ACCENT_TEXT_CLASS_HOVER } from '@/util/consts'
import { Menu, MenuButton, MenuItems, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'

export function AboutDropdown({
  name,
  children,
}: {
  name: string
  children: React.ReactNode
}) {
  return (
    <Menu>
      <MenuButton className={`${ACCENT_TEXT_CLASS_HOVER}`}>{name}</MenuButton>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute mt-2 rounded-md bg-gray-200 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-700">
          {React.Children.map(children, (child) => (
            <div className={`m-2 hover:underline ${ACCENT_TEXT_CLASS_HOVER}`}>
              <Menu.Item>{child}</Menu.Item>
            </div>
          ))}
        </MenuItems>
      </Transition>
    </Menu>
  )
}
