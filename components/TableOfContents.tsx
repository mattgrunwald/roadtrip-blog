'use client'

import React from 'react'
import { AboutPage } from '@/.contentlayer/generated'
import { Menu } from '@headlessui/react'

export default function TableOfContents({
  post,
  popover = false,
}: {
  post: AboutPage
  popover?: boolean
}) {
  const Variant = popover ? TocPopover : Toc
  const headings = post?.headings.map(
    (heading: { text: string; level: number; slug: string }) => {
      return (
        <div
          key={`#${heading.slug}`}
          className={`m-2 hover:underline hover:text-red-400 ${
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
        </div>
      )
    },
  )
  return <Variant title="On this page">{headings}</Variant>
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
      <div className="text-xs uppercase opacity-50">{title}</div>
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
      <Menu.Button className="text-xs uppercase opacity-50">
        {title}
      </Menu.Button>
      <Menu.Items className="absolute left-8 mt-2 max-w-64 rounded-md dark:bg-gray-700 bg-gray-200 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        {React.Children.map(children, (child) => (
          <Menu.Item>{child}</Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  )
}
