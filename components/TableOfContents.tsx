'use client'

import React, { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import Icons from './Icons'
import { Heading } from '@/util/types'
import { ACCENT_TEXT_CLASS } from '@/util/consts'

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
            className={`block hover:underline hover:${ACCENT_TEXT_CLASS} ${
              heading.level === 1
                ? '!text-2xl font-bold'
                : heading.level === 2
                ? 'pl-4 !text-xl font-bold'
                : heading.level === 3
                ? 'pl-8 !text-lg font-semibold'
                : heading.level === 4
                ? 'pl-12 !text-base'
                : heading.level === 5
                ? 'pl-16 !text-sm'
                : ''
            }`}
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
    <div className=" w-64">
      <div className="text-xs uppercase mb-2 opacity-50">{title}</div>
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
          <Menu.Button className="fixed right-4 text-xs uppercase dark:bg-gray-700 bg-gray-200 p-2 rounded-lg">
            {title}
            {open ? <Icons.ChevronUp /> : <Icons.ChevronDown />}
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="mt-10 max-w-64 rounded-md dark:bg-gray-700 bg-gray-200 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="p-3">
                {React.Children.map(children, (child) => (
                  <Menu.Item>{child}</Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  )
}
