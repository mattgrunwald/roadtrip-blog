import NextImage from 'next/image'
export const Image = (props: any) => {
  const sizes = '(max-width:640px) 100vw, (max-width: 1535px) 700px, 800px'
  return <NextImage height={800} width={800} sizes={sizes} {...props} />
}
