import Container from '@/util/containers'

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Container.Post>{children}</Container.Post>
}
