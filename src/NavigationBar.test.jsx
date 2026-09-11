import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import NavigationBar from './NavigationBar'

describe('NavigationBar', () => {
  it('mostra as cinco abas do fluxo', () => {
    render(<NavigationBar activeTab="tela06" onNavigate={() => {}} />)
    expect(screen.getByTitle('Identificação')).toBeInTheDocument()
    expect(screen.getByTitle('Fotos')).toBeInTheDocument()
    expect(screen.getByTitle('Mapa')).toBeInTheDocument()
    expect(screen.getByTitle('Vizinhos')).toBeInTheDocument()
    expect(screen.getByTitle('Assinatura')).toBeInTheDocument()
  })

  it('chama onNavigate com o id da aba', async () => {
    const onNavigate = vi.fn()
    const user = userEvent.setup()
    render(<NavigationBar activeTab="tela06" onNavigate={onNavigate} />)
    await user.click(screen.getByTitle('Fotos'))
    expect(onNavigate).toHaveBeenCalledWith('tela07a')
  })
})
