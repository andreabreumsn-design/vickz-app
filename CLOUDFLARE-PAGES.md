# Cloudflare Pages — vickz-preview

Não ligue este projeto a vickz.com.br.
Produção continua o HTML com abrirRelatorio.

## Criar o projeto (painel)

1. Workers & Pages → Create → Pages → Connect to Git
2. Repo: andreabreumsn-design/vickz-app
3. Project name: **vickz-preview**
4. Production branch: **preview**
5. Build command: `npm install && npm run build`
6. Output directory: `dist`
7. Root: `/`
8. Environment variable: NODE_VERSION = 20
9. Custom domains: nenhum (só o *.pages.dev)

## Não fazer

- Retry no projeto `vickz` que já atende o domínio
- Production branch = main
- Direct Upload por cima do Worker de produção

## Restaurar produção

Branch `html-backup` → backup/producao/index-vickz.com.br-2026-09-11.html