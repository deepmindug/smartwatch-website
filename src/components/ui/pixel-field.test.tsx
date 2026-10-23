import { render } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import PixelField from './pixel-field'

describe('PixelField', () => {
  test('renders a decorative canvas and survives a browser without canvas support', () => {
    const { container } = render(<PixelField hue={170} speed={0.5} intensity={0.3} />)
    const canvas = container.querySelector('canvas')
    expect(canvas).toBeInTheDocument()
    expect(container.firstElementChild).toHaveAttribute('aria-hidden', 'true')
  })
})
