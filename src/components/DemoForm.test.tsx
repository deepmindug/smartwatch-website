import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import DemoForm from './DemoForm'

function renderForm() {
  return render(
    <MemoryRouter>
      <DemoForm />
    </MemoryRouter>,
  )
}

async function fillAndSubmit(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/first name/i), 'Ada')
  await user.type(screen.getByLabelText(/last name/i), 'Okello')
  await user.type(screen.getByLabelText(/work email/i), 'ada@example.com')
  await user.type(screen.getByLabelText(/phone/i), '+256700000000')
  await user.type(screen.getByLabelText(/company/i), 'Example Ltd')
  await user.click(screen.getByRole('button', { name: /get a demo/i }))
}

describe('DemoForm', () => {
  test('shows the form first', () => {
    renderForm()
    expect(screen.getByRole('heading', { name: /schedule a demo/i })).toBeInTheDocument()
    expect(screen.queryByText(/thank you/i)).not.toBeInTheDocument()
  })

  test('submitting shows the thank-you card', async () => {
    const user = userEvent.setup()
    renderForm()
    await fillAndSubmit(user)
    expect(await screen.findByRole('heading', { name: /thank you/i })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: /schedule a demo/i })).not.toBeInTheDocument()
  })

  test('does not submit while required fields are empty', async () => {
    const user = userEvent.setup()
    renderForm()
    await user.click(screen.getByRole('button', { name: /get a demo/i }))
    expect(screen.queryByText(/thank you/i)).not.toBeInTheDocument()
    expect(screen.getByLabelText(/first name/i)).toBeInvalid()
  })

  test('picking a source confirms the submission', async () => {
    const user = userEvent.setup()
    renderForm()
    await fillAndSubmit(user)
    await screen.findByRole('heading', { name: /thank you/i })
    expect(screen.queryByText('Your submission has been sent.')).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Referral' }))
    expect(screen.getByText('Your submission has been sent.')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Referral' })).toHaveAttribute('aria-pressed', 'true')
  })

  test('"Submit another request" returns to an empty form', async () => {
    const user = userEvent.setup()
    renderForm()
    await fillAndSubmit(user)
    await screen.findByRole('heading', { name: /thank you/i })
    await user.click(screen.getByRole('button', { name: /submit another request/i }))
    expect(screen.getByRole('heading', { name: /schedule a demo/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/first name/i)).toHaveValue('')
  })
})
