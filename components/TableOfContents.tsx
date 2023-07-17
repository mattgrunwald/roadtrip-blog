'use client'

import React, { Fragment } from 'react'
import { AboutPage } from '@/.contentlayer/generated'
import { Menu, Transition } from '@headlessui/react'
import Icons from './Icons'
import { AboutPageHeading } from '@/util/contentlayer-helpers'

export default function TableOfContents({
  headings,
  popover = false,
}: {
  headings: AboutPageHeading[]
  popover?: boolean
}) {
  const Variant = popover ? TocPopover : Toc
  const pageHeadings = headings.map((heading) => {
    return (
      <span
        key={`#${heading.slug}`}
        className={`block hover:underline hover:text-red-400 mb-1 last-of-type:mb-0 ${
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
        <a href={`#${heading.slug}`}>{heading.text}</a>
      </span>
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
