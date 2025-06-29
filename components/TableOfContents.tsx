'use client'

import { ACCENT_TEXT_CLASS_HOVER } from '@/util/consts'
import { Heading } from '@/util/types'
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react'
import clsx from 'clsx'
import React, { Fragment } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from './Icons'

export default function TableOfContents({
  headings,
  popover = false,
}: {
  headings: Heading[]
  popover?: boolean
}) {
  const Variant = popover ? TocPopover : Toc
  const pageHeadings = headings.map((heading) => {
    return (
      <div key={`#${heading.slug}`} className="mb-1 last-of-type:mb-0">
        <a href={`#${heading.slug}`}>
          <span
            className={clsx(
              'block hover:underline',
              ACCENT_TEXT_CLASS_HOVER,
              heading.level === 1 && 'text-2xl! font-bold',
              heading.level === 2 && 'pl-4 text-xl! font-bold',
              heading.level === 3 && 'pl-8 text-lg! font-semibold',
              heading.level === 4 && 'pl-12 text-base!',
              heading.level === 5 && 'pl-16 text-sm!',
            )}
          >
            {heading.text}
          </span>
        </a>
      </div>
    )
  })
  return <Variant title="On this page">{pageHeadings}</Variant>
}

function Toc({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="w-64">
      <div className="mb-2 text-xs uppercase opacity-50">{title}</div>
      <div className="text-sm opacity-75">{children}</div>
    </div>
  )
}

export function TocPopover({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <Menu>
      {({ open }) => (
        <>
          <MenuButton
            className={clsx(
              'fixed right-4 rounded-lg p-2 text-xs uppercase',
              'bg-gray-200 dark:bg-gray-700',
            )}
          >
            {title}
            {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </MenuButton>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <MenuItems
              className={clsx(
                'mt-10 max-w-64 rounded-md shadow-lg focus:outline-hidden',
                'ring-opacity-5 ring-1 ring-black',
                'bg-gray-200 dark:bg-gray-700',
              )}
            >
              <div className="p-3">
                {React.Children.map(children, (child) => (
                  <MenuItem>{child}</MenuItem>
                ))}
              </div>
            </MenuItems>
          </Transition>
        </>
      )}
    </Menu>
  )
}
