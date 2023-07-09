export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="grid max-md:grid-cols-1 grid-cols-[1fr,2fr] gap-x-10 gap-y-5">
        {children}
      </div>
    </>
  )
}
