import clsx from 'clsx'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div
        className={clsx(
          'grid gap-x-10 gap-y-4',
          'max-lg:grid-cols-1',
          'lg:grid-cols-[1fr_3fr]',
          'xl:grid-cols-[1fr_2fr_1fr]',
          '4xl:grid-cols-[1fr_1fr_1fr]',
        )}
      >
        {children}
      </div>
    </>
  )
}
