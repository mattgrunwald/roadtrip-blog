export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="grid max-lg:grid-cols-1 lg:grid-cols-[1fr,3fr] xl:grid-cols-[1fr,2fr,1fr] 3xl:grid-cols-[1fr,1fr,1fr] gap-x-10 gap-y-4">
        {children}
      </div>
    </>
  )
}
