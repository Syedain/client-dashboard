import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import StatsRow from './StatsRow.jsx'

describe('StatsRow', () => {
  it('shows correct counts for each status', () => {
    const clients = [
      { status: 'lead' },
      { status: 'lead' },
      { status: 'in-progress' },
      { status: 'delivered' },
    ]
    render(<StatsRow clients={clients} />)

    expect(screen.getByText('4')).toBeInTheDocument()   // Total Clients
    expect(screen.getByText('2')).toBeInTheDocument()   // Leads
    expect(screen.getAllByText('1')).toHaveLength(2)     // In Progress + Delivered
  })

  it('shows zero for an empty client list', () => {
    render(<StatsRow clients={[]} />)
    expect(screen.getAllByText('0')).toHaveLength(4)
  })
})