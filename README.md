# Clube do Hobby

Sistema web do Clube do Hobby ([@clubedohobby](https://www.instagram.com/clubedohobby)), uma comunidade que hoje se organiza por Instagram e grupo de WhatsApp. Esta v1 cobre o módulo de **Indicações**: membros cadastram profissionais, empresas e lugares de confiança, avaliam com estrelas e um selo recomendo/não recomendo, comentam, buscam por categoria/bairro/texto e podem denunciar conteúdo impróprio.

Veja o [PROJETO.md](PROJETO.md) para a visão completa do produto, as decisões tomadas e o histórico de cada etapa construída.

## Perfis

| Perfil        | Pode fazer                                                                                                    |
| ------------- | ------------------------------------------------------------------------------------------------------------- |
| **Membro**    | Cadastrar/editar as próprias indicações, avaliar e comentar nas dos outros, denunciar conteúdo impróprio      |
| **Moderador** | Tudo do membro, mais: editar/remover qualquer indicação ou comentário, tratar denúncias, adicionar categorias |
| **Admin**     | Tudo do moderador, mais: gerenciar os destaques do Instagram na home                                          |

## Rodando localmente

Pré-requisitos: Node.js 20+ e Docker Desktop (para o banco Postgres local).

```bash
cp .env.example .env
docker compose up -d
npm install
npm run db:migrate
npm run db:seed
npm run dev
```

Acesse http://localhost:3000. A seed cria 10 categorias iniciais e um usuário admin de teste (apenas em desenvolvimento): `admin@clubedohobby.local` / `admin1234`.

### Variáveis de ambiente (`.env`)

| Variável       | Para que serve                                                                                                                                                                                                        |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DATABASE_URL` | Conexão com o Postgres (o `docker-compose.yml` já sobe um banco local compatível com o valor de exemplo)                                                                                                              |
| `AUTH_SECRET`  | Chave usada pelo Auth.js para assinar a sessão. Gere uma própria antes de rodar em qualquer lugar que não seja só o seu computador, com `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"` |
| `NEXTAUTH_URL` | Endereço onde o site está rodando (`http://localhost:3000` em desenvolvimento)                                                                                                                                        |

### Outros comandos úteis

```bash
npm run build       # build de produção
npm run lint         # checagem de código (ESLint)
npm run db:studio    # interface visual do banco (Prisma Studio)
```

## Estrutura do projeto

```
src/
  app/              páginas e rotas (App Router do Next.js)
    indicacoes/     listagem, detalhe, nova indicação e edição
    moderacao/      categorias e fila de denúncias
    admin/          destaques do Instagram na home
    login/ register/
  components/       componentes compartilhados (Header, embed do Instagram, etc.)
  lib/              Prisma, papéis/permissões, validação (Zod), detecção de duplicidade
  auth.ts           configuração do Auth.js (login por e-mail/senha)
  proxy.ts          protege rotas por papel mínimo (substitui o antigo middleware.ts)
prisma/
  schema.prisma     modelo do banco de dados
  seed.ts           categorias iniciais + usuário admin de teste
```

## Fazendo alterações simples

- **Adicionar uma categoria nova**: não precisa mexer em código - um admin ou moderador faz isso pela tela `/moderacao/categorias`.
- **Mudar textos da home ou cores**: `src/app/page.tsx` (conteúdo) e `src/app/globals.css` (cores, via as variáveis `--background`/`--foreground`).
- **Adicionar um campo novo em indicação** (ex: um site): precisa mexer em `prisma/schema.prisma` (criar o campo + `npm run db:migrate`), `src/lib/validation.ts` (regra de validação), nos formulários (`indicacoes/nova` e `indicacoes/[id]/editar`) e na página de detalhe. O `PROJETO.md` explica o padrão usado nos campos existentes (texto opcional vs. obrigatório).

## Deploy

Ainda não está no ar - roda só localmente por enquanto. Quando quiser publicar, a combinação já decidida é **Vercel** (hospedagem, deploy automático a cada push) + **Neon** (Postgres na nuvem), ambos gratuitos no plano que o clube precisa. É só retomar a conversa com o co-fundador técnico pedindo para seguir com o deploy.

## Manutenção

- **Sem testes automatizados ainda** - cada funcionalidade foi testada manualmente no navegador durante a construção (ver `PROJETO.md`). Vale considerar testes automatizados conforme o site crescer (lista de v2 abaixo).
- **Dependências**: de tempos em tempos, rode `npm outdated` e atualize (principalmente Next.js e Prisma, que mudam rápido).
- **Banco local**: os dados ficam no volume Docker `db-data`. Para zerar o banco local: `docker compose down -v` e depois `npm run db:migrate` + `npm run db:seed` de novo.
- **Usuário admin de teste** (`admin@clubedohobby.local`): é só para desenvolvimento. Ao fazer deploy, criar uma conta admin real e não reaproveitar essa senha.

## Próximos passos (v2)

Nenhum destes está na v1 - lista priorizada do que agrega mais valor primeiro:

1. **Deploy online** - colocar o site no ar para o clube começar a usar de verdade.
2. **Painel do admin para gerenciar usuários** - promover/rebaixar membro, moderador e admin direto pela interface (hoje só é possível direto no banco).
3. **Recuperação de senha por e-mail** - exige um serviço de envio de e-mail (ex: Resend).
4. **Cadastro por convite/aprovação do admin** - reduz risco de spam, hoje o cadastro é aberto para qualquer pessoa.
5. **Feed automático do Instagram** via API oficial da Meta, no lugar do embed manual de hoje.
6. **Mapa/geolocalização das indicações**, no lugar do endereço em texto livre de hoje.
7. **Denúncia com motivos categorizados e histórico**, em vez do texto livre simples de hoje.
8. **Novos módulos**: Vendas, Eventos (com inscrição) e Clube do Livro - o banco e a estrutura de código já foram pensados para crescer nessa direção.
9. **Testes automatizados** para os fluxos mais sensíveis (duplicidade, permissões por papel, moderação).
