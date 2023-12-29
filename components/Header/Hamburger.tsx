'use client'
import { Menu, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'
import { ACCENT_TEXT_CLASS_HOVER } from '@/util/consts'
import Icons from '../Icons'

export function Hamburger({ children }: { children: React.ReactNode }) {
  const [path, fill, stroke, strokeWidth] = [
    'M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16',
    'none',
    'currentColor',
    '1',
  ]
  return (
    <span className="max-lg:mr-4 lg:mr-6 mr-6 text-3xl leading-[3rem]">
      <Menu>
        {({ open, close }) => (
          <>
            <Menu.Button className="mt-3">
              <Icons.Hamburger />
            </Menu.Button>
            {open && (
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items
                  className="
                    absolute 
                    left-0 top-0 
                    px-5 py-4
                    h-screen w-screen 
                    dark:bg-gray-700 bg-gray-200 shadow-lg 
                    ring-1 ring-black ring-opacity-5 
                    focus:outline-none"
                >
                  <Menu.Item>
                    <div className="flex justify-end">
                      <button onClick={close} className="focus:outline-none">
                        <svg
                          viewBox="0 0 24 24"
                          fill={fill}
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-slate-900 dark:text-white w-14 h-14"
                        >
                          <path
                            stroke={stroke}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={strokeWidth}
                            d={path}
                          />
                        </svg>
                        <span className="sr-only">Exit</span>
                      </button>
                    </div>
                  </Menu.Item>
                  {React.Children.map(children, (child) => (
                    <div
                      className={`m-2 hover:underline ${ACCENT_TEXT_CLASS_HOVER}`}
                    >
                      <Menu.Item>{child}</Menu.Item>
                    </div>
                  ))}
                </Menu.Items>
              </Transition>
            )}
          </>
        )}
      </Menu>
    </span>
  )
}
