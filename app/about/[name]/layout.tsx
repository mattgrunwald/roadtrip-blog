export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[1fr,auto,1fr] xl:gap-x-10 gap-y-5 md:px-7s  xl:grid-cols-[1fr,minmax(auto,240px),min(640px,100%),minmax(auto,240px),1fr] [&>*]:col-start-2 xl:[&>*]:col-start-3">
      {children}
    </div>
  )
}
