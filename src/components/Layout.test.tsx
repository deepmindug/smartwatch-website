import { render } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { beforeEach, describe, expect, test } from 'vitest'
import { lenisStub } from '../test/mocks/lenis'
import Layout from './Layout'

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<div>home</div>} />
          <Route
            path="/contact"
            element={
              <div>
                <section id="support">support</section>
              </div>
            }
          />
        </Route>
      </Routes>
    </MemoryRouter>,
  )
}

describe('Layout scroll management', () => {
  beforeEach(() => {
    lenisStub.scrollTo.mockClear()
  })

  test('jumps to the top instantly on a plain route', () => {
    renderAt('/')
    expect(lenisStub.scrollTo).toHaveBeenCalledWith(0, expect.objectContaining({ immediate: true }))
  })

  test('scrolls to the hash target with a header offset', async () => {
    renderAt('/contact#support')
    await new Promise((r) => setTimeout(r, 0))
    expect(lenisStub.scrollTo).toHaveBeenCalledWith('#support', expect.objectContaining({ offset: expect.any(Number) }))
  })
})
