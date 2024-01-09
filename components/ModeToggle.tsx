'use client'

import {
  ACCENT_BORDER_CLASS_HOVER,
  ACCENT_COLOR_DARK,
  ACCENT_COLOR_LIGHT,
} from '@/util/consts'
import { useTheme } from 'next-themes'
import { useCallback, useEffect, useMemo, useState } from 'react'

export function ModeToggle() {
  const [mounted, setMounted] = useState(false)
  const [hover, setHover] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  const changeTheme = useCallback(
    () => setTheme(resolvedTheme === 'light' ? 'dark' : 'light'),
    [setTheme, resolvedTheme],
  )

  const stroke = useMemo(
    () =>
      hover
        ? resolvedTheme === 'light'
          ? ACCENT_COLOR_LIGHT
          : ACCENT_COLOR_DARK
        : 'currentColor',
    [hover, resolvedTheme],
  )

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="h-6 w-6 rounded-md border" />
  }

  return (
    <button
      onClick={changeTheme}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`flex h-6 w-6 items-center justify-center rounded-md border border-current ${ACCENT_BORDER_CLASS_HOVER}`}
    >
      <span className="sr-only">Toggle mode</span>
      {resolvedTheme === 'light' ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke={stroke}
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke={stroke}
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
          />
        </svg>
      )}
    </button>
  )
}
