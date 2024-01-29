export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center">
      <div className="h-[90vh] w-full 3xl:w-[calc(600px+650px+320px+12rem)]">
        {children}
      </div>
    </div>
  )
}
