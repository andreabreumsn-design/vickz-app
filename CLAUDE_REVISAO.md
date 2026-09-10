Revise o backend VICKZ em vickz-app/backend/.

Arquivos: server.js, auth-payments.js, schema.sql, env.example.
Frontend: index.html (botão Google → /api/auth/google ; tela #pagar).

Peça:
1) Segurança do webhook MP (idempotência, metadata.user_id UUID vs google_id).
2) Session cookie (secure, sameSite) para APP_URL em HTTPS.
3) Trava do POST /api/laudo com crédito/plano.
4) Não apagar fluxo de vistoria nem o modelo NBR 13752.
5) Um diff por arquivo. Sem inventar secrets.

Não tratar DNS Cloudflare nesta revisão.
