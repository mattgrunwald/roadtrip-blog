import Container from 'util/containers'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <Container.Text>{children}</Container.Text>
    </div>
  )
}