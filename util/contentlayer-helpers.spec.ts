import { parseAltText } from './contentlayer-helpers'

describe(' method', () => {
  it('should work for properly named files', () => {
    expect(parseAltText('12_hello_world.jpg')).toBe('hello world')
    expect(parseAltText('a_hello_world.mp4')).toBe('hello world')
  })

  it('should work for improperly named files', () => {
    expect(parseAltText('1.jpg')).toBe('')
    expect(parseAltText('1_.jpg')).toBe('')
    expect(parseAltText('_hello.jpg')).toBe('')
    expect(parseAltText('hello_world')).toBe('')
  })
})
