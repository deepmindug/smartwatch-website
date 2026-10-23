import { render } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { usePageMeta } from './usePageMeta'

function Page({ title, description }: { title?: string; description: string }) {
  usePageMeta({ title, description })
  return <div>page</div>
}

describe('usePageMeta', () => {
  test('sets the document title with the site suffix', () => {
    render(<Page title="Compliance" description="Manage compliance better." />)
    expect(document.title).toBe('Compliance | Smartwatch Solutions')
  })

  test('uses the site title when no page title is given', () => {
    render(<Page description="Home." />)
    expect(document.title).toBe('Smartwatch Solutions — Fleet & asset management, East Africa')
  })

  test('upserts the meta description', () => {
    render(<Page title="A" description="First." />)
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute('content', 'First.')
    render(<Page title="B" description="Second." />)
    expect(document.querySelectorAll('meta[name="description"]')).toHaveLength(1)
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute('content', 'Second.')
  })
})
