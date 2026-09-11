import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import NavigationBar from './NavigationBar'

describe('NavigationBar', () => {
  it('mostra as cinco abas do fluxo', () => {
    render(<NavigationBar activeTab="tela06" onNavigate={() => {}} />)
    expect(screen.getByText('Identificação')).toBeInTheDocument()
    expect(screen.getByText('Fotos')).toBeInTheDocument()
    expect(screen.getByText('Mapa')).toBeInTheDocument()
    expect(screen.getByText('Vizinhos')).toBeInTheDocument()
    expect(screen.getByText('Assinatura')).toBeInTheDocument()
  })

  it('chama onNavigate com o id da aba', async () => {
    const onNavigate = vi.fn()
    const user = userEvent.setup()
    render(<NavigationBar activeTab="tela06" onNavigate={onNavigate} />)
    await user.click(screen.getByText('Fotos'))
    expect(onNavigate).toHaveBeenCalledWith('tela07a')
  })
})
