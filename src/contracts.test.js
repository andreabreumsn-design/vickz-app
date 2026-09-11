import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const dir = dirname(fileURLToPath(import.meta.url))
const read = (name) => readFileSync(join(dir, name), 'utf8')

describe('VICKZ React — contratos (não é o HTML de produção)', () => {
  it('PDF/Word da tela de laudo ainda são simulados com alert', () => {
    const src = read('ReportGenerationScreen.jsx')
    expect(src).toMatch(/const handlePdfAll[\s\S]*?alert\(/)
    expect(src).toMatch(/const handleWordAll[\s\S]*?alert\(/)
    expect(src).toMatch(/const handlePropertyPdf[\s\S]*?alert\(/)
    expect(src).not.toMatch(/abrirRelatorio/)
  })

  it('AppContext gera relatório só via localhost:3001', () => {
    const src = read('AppContext.jsx')
    expect(src).toMatch('http://localhost:3001')
    expect(src).toMatch('generateReport')
  })

  it('NavigationBar usa ids tela06–tela09', () => {
    const src = read('NavigationBar.jsx')
    expect(src).toMatch("id: 'tela06'")
    expect(src).toMatch("id: 'tela09'")
  })
})
