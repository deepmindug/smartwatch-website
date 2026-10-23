import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'
import ContactForm from './ContactForm'

describe('ContactForm', () => {
  test('lists every product in the interest select', () => {
    render(<ContactForm />)
    const select = screen.getByLabelText(/i'm interested in/i)
    expect(select).toHaveTextContent('Compliance')
    expect(select).toHaveTextContent('Insurance')
  })

  test('submitting a complete form shows the sent state', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    await user.type(screen.getByLabelText(/first name/i), 'Ada')
    await user.type(screen.getByLabelText(/last name/i), 'Okello')
    await user.type(screen.getByLabelText(/work email/i), 'ada@example.com')
    await user.type(screen.getByLabelText(/phone/i), '+256700000000')
    await user.type(screen.getByLabelText(/message/i), 'Please call me about dash cameras.')
    await user.click(screen.getByRole('button', { name: /send request/i }))
    expect(await screen.findByRole('heading', { name: /request sent/i })).toBeInTheDocument()
  })

  test('blocks submission when required fields are empty', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    await user.click(screen.getByRole('button', { name: /send request/i }))
    expect(screen.queryByRole('heading', { name: /request sent/i })).not.toBeInTheDocument()
  })
})
