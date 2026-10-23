import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import AnnouncementBar from './AnnouncementBar'

describe('AnnouncementBar', () => {
  test('announces the KRA RECTS certification and links to the awards section', () => {
    render(
      <MemoryRouter>
        <AnnouncementBar />
      </MemoryRouter>,
    )
    expect(screen.getByText(/now a kra rects certified vendor/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /see our credentials/i })).toHaveAttribute('href', '/about#awards')
    expect(screen.queryByText(/dash cameras/i)).not.toBeInTheDocument()
  })

  test('shows the KRA lion mark as decoration beside the announcement', () => {
    render(
      <MemoryRouter>
        <AnnouncementBar />
      </MemoryRouter>,
    )
    const mark = document.querySelector('img')!
    expect(mark).toHaveAttribute('src', '/images/logos/kra-mark.webp')
    expect(mark).toHaveAttribute('alt', '')
  })
})
