export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="grid max-md:grid-cols-1 md:grid-cols-[1fr,3fr] 2xl:grid-cols-[1fr,2fr,1fr] 3xl:grid-cols-[1fr,1fr,1fr] gap-x-10 gap-y-5">
        {children}
      </div>
    </>
  )
}
