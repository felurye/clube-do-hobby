# Clube do Hobby

## Visão do produto

Sistema web para a comunidade do Clube do Hobby ([@clubedohobby](https://www.instagram.com/clubedohobby)), hoje organizada por Instagram e grupo de WhatsApp. O sistema terá login com 3 perfis (admin, moderador, membro) e, na v1, foco total no módulo de **Indicações**: membros cadastram indicações de profissionais, empresas e lugares, avaliam com estrelas e um selo recomendo/não recomendo, comentam, buscam por categoria/bairro/texto e denunciam conteúdo impróprio. A arquitetura já nasce pronta para receber, no futuro, os módulos de Vendas, Eventos e Clube do Livro.

## Seriedade

`compartilhar` - precisa ser fácil de usar sem explicação, funcionar bem em celular e desktop, estar no ar (deploy online) e ter um README claro. Não exige ainda domínio próprio, política de privacidade formal ou auditoria de segurança (isso seria o nível `lançar`).

## Escopo da v1

- Login/cadastro aberto (qualquer pessoa cria conta como membro)
- 3 perfis: admin, moderador, membro
- Home institucional: sobre o clube + posts do Instagram incorporados manualmente + eventos do Instagram incorporados manualmente
- Indicações: cadastro (nome, categoria, endereço em texto, bairro/cidade, telefone, Instagram, descrição)
- Categorias: lista fixa inicial, admin/moderador podem adicionar novas
- Aviso de possível duplicata ao cadastrar/editar (por telefone, Instagram ou nome parecido), sem bloquear - a pessoa confirma se é mesmo outra
- Avaliação por estrelas (1-5) + selo recomendo/não recomendo, um por membro por indicação (editável)
- Comentários em indicações
- Busca e filtro por categoria, bairro/cidade e texto (descrição/comentários)
- Denúncia de conteúdo impróprio (indicações e comentários) + painel do moderador para tratar denúncias e editar/remover conteúdo
- Painel do admin: gerenciar permissões de usuários (promover/rebaixar membro/moderador/admin) e gerenciar categorias
- Estrutura de banco de dados e de código já preparada para os módulos de Vendas, Eventos e Clube do Livro (sem construí-los agora)
- Deploy online, responsivo (celular e desktop)

## Adicionar depois

- Módulos de Vendas, Eventos (com formulários de inscrição) e Clube do Livro
- Feed automático do Instagram via API oficial do Meta (hoje o embed é manual)
- Mapa/geolocalização das indicações (hoje é endereço em texto)
- Cadastro por convite/aprovação do admin (hoje é aberto)
- Recuperação de senha por e-mail (exige serviço de envio de e-mail, ex: Resend)
- Denúncia com motivos categorizados e histórico (hoje é simples)
- Domínio próprio (hoje usa o domínio gratuito da hospedagem)

## Decisões tomadas

- **Cadastro aberto para membro**: escolha da pessoa, sabendo que isso facilita spam/conteúdo indevido; mitigado pelo fluxo de denúncia + moderador. Convite/aprovação fica como melhoria futura.
- **Instagram via embed manual**: evita o processo de aprovação de app da Meta (conta Business + revisão), que é lento e está sujeito a mudanças de política. Admin cola o link do post/evento e o site só exibe.
- **Categoria fixa com extensão controlada**: evita bagunça de categorias livres, mas permite crescer (só admin/moderador criam novas).
- **Duplicidade é um aviso, não um bloqueio**: porque pode haver filiais/unidades diferentes com dados parecidos; a decisão final fica com quem está cadastrando.
- **Estrelas e selo recomendo/não recomendo são complementares**: estrelas medem qualidade geral, o selo mede se a pessoa indicaria a outro membro.
- **Sem mapa/geolocalização na v1**: endereço em texto + filtro por bairro/cidade já resolve a busca por localização sem depender de API de mapas.

## Tecnologias

- **Next.js (App Router) + TypeScript**: um único projeto para front-end e back-end, evita duplicar lógica entre API e cliente, e combina com a stack TypeScript que a pessoa já prefere.
- **PostgreSQL via Neon** (free tier): banco relacional serverless, funciona bem com Vercel/Next.js, sem custo para o tamanho do clube.
- **Prisma**: ORM para modelar o banco (usuários, indicações, categorias, avaliações, comentários, denúncias) com migrações versionadas.
- **Auth.js (NextAuth) com e-mail/senha**: login simples, sem depender de serviço de e-mail na v1. Recuperação de senha por e-mail fica para depois.
- **Tailwind CSS**: estilização rápida e consistente, fácil de manter.
- **Vercel** (free tier): hospedagem com deploy automático a cada push, feita para Next.js.

## Contas e serviços necessários

| Serviço             | Para que                                         | Obrigatório?           | Custo                   |
| ------------------- | ------------------------------------------------ | ---------------------- | ----------------------- |
| GitHub              | Código-fonte (já existe: felurye/clube-do-hobby) | Sim                    | Gratuito                |
| Vercel              | Hospedagem/deploy                                | Sim                    | Gratuito no plano usado |
| Neon                | Banco de dados Postgres                          | Sim                    | Gratuito no plano usado |
| Resend (ou similar) | Envio de e-mail (recuperação de senha)           | Não (fica para depois) | Gratuito no plano usado |

## Complexidade

**Média.** Cada peça (autenticação, papéis, CRUD, avaliações, busca, denúncia) é um padrão conhecido, mas a combinação de todas no v1 tem volume razoável de trabalho. Nada aqui depende de tecnologia exótica ou integração arriscada.

## Esboço das telas principais

```
Home (pública)
 - Sobre o clube
 - Carrossel de posts do Instagram (embed manual)
 - Eventos em destaque (embed manual)
 - Login / Cadastro

Indicações (lista)
 - Filtros: categoria, bairro/cidade, busca por texto
 - Cards: nome, categoria, nota média, selo recomendo
 - Botão "Nova indicação"

Indicação (detalhe)
 - Dados completos (categoria, endereço, bairro/cidade, telefone, Instagram, descrição)
 - Avaliações e comentários de outros membros
 - Formulário para avaliar/comentar
 - Botão "Denunciar"

Nova/editar indicação (formulário)
 - Nome, categoria (lista + sugerir nova, se admin/moderador)
 - Endereço, bairro/cidade, telefone, Instagram, descrição
 - Aviso automático de possível duplicata ao digitar telefone/Instagram/nome parecido

Painel do moderador
 - Fila de denúncias
 - Ações: editar/remover conteúdo, descartar denúncia

Painel do admin
 - Lista de usuários + trocar perfil (membro/moderador/admin)
 - Gerenciar categorias (criar/arquivar)

Perfil do usuário
 - Minhas indicações, minhas avaliações e comentários
```

## Etapas de construção (fase 3)

1. **Fundação**: projeto Next.js + TypeScript + Tailwind + Prisma + Postgres (Neon), schema do banco, categorias iniciais, deploy "esqueleto" no Vercel.
2. **Autenticação e perfis**: cadastro, login, logout, sessão, campo de papel no usuário, proteção de rotas por papel.
3. **Home institucional**: seção sobre o clube + embed manual de posts e eventos do Instagram.
4. **CRUD de indicações e categorias**: cadastro, edição, lista com filtros por categoria e bairro/cidade, gestão de categorias pelo admin.
5. **Detecção de duplicidade**: aviso ao cadastrar/editar com dados parecidos a uma indicação existente.
6. **Avaliações e comentários**: estrelas, selo recomendo/não recomendo, comentários, um por membro por indicação.
7. **Denúncia e painel do moderador**: denunciar indicação/comentário, fila de denúncias, ações de moderação.
8. **Busca por texto**: busca em descrição/comentários combinada com os filtros.

Cada etapa termina em algo que a pessoa consegue ver e testar antes de seguir para a próxima.

## Fase e próximos passos

**Fase atual:** 5. Entrega - concluída (sem deploy; adiado a pedido da pessoa).

O que foi feito na etapa 1: projeto Next.js (App Router) + TypeScript + Tailwind, schema do Prisma (usuários, categorias, indicações, avaliações, comentários, denúncias), banco Postgres local via Docker Compose, primeira migração aplicada, seed com 10 categorias iniciais, build de produção e type-check passando.

O que foi feito na etapa 2: cadastro e login por e-mail/senha (Auth.js, Credentials + JWT), logout, header com sessão (nome e papel do usuário), e middleware (`proxy.ts`) que protege rotas por papel minimo (`/admin` exige ADMIN, `/moderacao` exige MODERATOR ou acima, `/indicacoes/nova` exige MEMBER ou acima). Testado manualmente no navegador: cadastro cria conta e loga automaticamente; logout funciona; acesso sem login a rota protegida redireciona para `/login` com `callbackUrl`; membro comum tentando acessar `/admin` e redirecionado para a home; usuario admin de teste (`admin@clubedohobby.local` / `admin1234`, criado pela seed) acessa normalmente.

Nota técnica: o Prisma mudou a forma de configurar o banco na versão 7 (exige um arquivo `prisma.config.ts` extra). Optamos pela versão 6.19.3, que mantém a configuração simples direto no `schema.prisma` - mais alinhado com "tecnologia conhecida e fácil de manter". O Next.js 16 trocou `middleware.ts` por `proxy.ts`, e o recurso novo "Cache Components" (prerender parcial) foi desligado no `next.config.ts` porque o app é dinâmico por sessão em praticamente todas as paginas - ligá-lo exigiria boundaries de Suspense espalhados sem beneficio real nesse tamanho de projeto. Ha um aviso de console (nao de build) sobre `crypto.getRandomValues()` durante o prefetch especulativo de links em modo de desenvolvimento do Next 16; nao afeta o build de produção nem o funcionamento testado, e sera observado nas próximas etapas.

O que foi feito na etapa 3: home com secao "sobre o clube", galeria de posts do Instagram e secao de eventos em destaque (ambas via embed manual), e um painel `/admin/destaques` onde o admin cola o link do post/evento, define o tipo e uma legenda opcional. Testado: admin adiciona um destaque e ele aparece na home; remover funciona; membro comum e redirecionado para a home ao tentar acessar `/admin/destaques`. A renderizacao visual do embed em si depende do script oficial do Instagram (`embed.js`) processando o link real - com um link de teste (nao real) ele cai no link de fallback, que e o comportamento esperado.

O que foi feito na etapa 4: cadastro, edição (dono ou moderador/admin) e lista de indicações com filtro por categoria e bairro/cidade; pagina de detalhe com nota media, selo recomendo (preparados para a etapa 6) e dados de contato; gestao de categorias (`/moderacao/categorias`, admin e moderador podem adicionar, sem remover para nao quebrar indicacoes existentes). Rotas em `/indicacoes` agora exigem login (todo o diretorio e um beneficio de membro). Testado de ponta a ponta no navegador: membro cadastra, edita, filtra por cidade e categoria; admin adiciona categoria nova; moderador/membro sao bloqueados nas telas que nao sao deles.

O que foi feito na etapa 5: ao cadastrar ou editar, o sistema busca indicacoes com o mesmo telefone, mesmo Instagram ou nome igual (sem diferenciar maiusculas/minusculas) e, se achar, mostra um aviso com link para a indicacao parecida em vez de salvar direto; a pessoa confirma "nao e a mesma" para continuar mesmo assim. Na edicao, a propria indicacao e ignorada na busca (so compara contra as outras).

Nota tecnica: durante o teste, descobri e corrigi um bug real de UX - os campos do formulario perdiam o valor depois do primeiro aviso de duplicidade, porque eram campos "nao controlados" e o React reseta esses campos automaticamente apos qualquer acao de formulario (comportamento documentado do React 19, nao um bug do Next.js). Troquei os formularios de nova indicacao e edicao para campos controlados por estado do React, e o botao "nao e a mesma" agora usa o proprio nome/valor do botao de submit (em vez de um campo escondido) para informar a confirmacao de forma confiavel. Testado de ponta a ponta com interacao real de teclado/mouse: o aviso aparece, os dados digitados permanecem, e confirmar cria/salva corretamente.

O que foi feito na etapa 6: avaliação por estrelas (1-5) + selo recomendo/não recomendo, uma por membro por indicação (enviar de novo atualiza, nao duplica); comentários em texto livre; quem cadastrou a indicação não pode avaliar a própria (evita auto-promoção), mas pode comentar. Testado: membro avalia a indicação do admin, nota média e "recomendam" atualizam na lista e no detalhe; reabrir o formulário mostra a avaliação já salva pronta para editar; autor não vê o formulário de avaliação na própria indicação.

O que foi feito na etapa 7: botão "Denunciar" em indicações e comentários (qualquer membro logado pode usar, com um motivo obrigatório); painel `/moderacao/denuncias` lista as denúncias pendentes com o conteúdo denunciado, quem denunciou e o motivo; moderador/admin pode "Remover conteúdo" (apaga a indicação ou comentário, e a remoção já leva junto avaliações/comentários/denúncias ligadas a ela) ou "Descartar denúncia" (mantém o conteúdo, marca a denúncia como resolvida). Testado: membro denuncia um comentário, admin vê no painel, descarta sem apagar (comentário continua), denuncia de novo e remove (comentário some); membro é bloqueado do painel de denúncias.

O que foi feito na etapa 8: o campo de busca da listagem de indicações agora cruza nome, descrição e comentários (contém, sem diferenciar maiúsculas/minúsculas), combinado com os filtros de categoria e bairro/cidade (todos com E, não OU). Testado: busca que só aparece na descrição, busca que só aparece em um comentário, termo sem resultado, e combinação busca + categoria incompatível retornando vazio corretamente.

A v1 do Clube do Hobby está construída e testada de ponta a ponta: login/cadastro, 3 perfis, home com embeds do Instagram, indicações com categorias, aviso de duplicidade, avaliação e comentários, denúncia e moderação, e busca com filtros. Tudo rodando localmente (Postgres via Docker), nada foi feito deploy ainda.

### Fase 4: Polimento

O que foi revisado e ajustado:

- **Idioma e tipografia**: `<html lang="pt-BR">` (estava `en`), e corrigido um bug onde a fonte customizada (Geist) era carregada mas nunca usada de fato - o CSS global sobrescrevia com Arial. Agora a fonte carregada é a que aparece na tela.
- **Cabeçalho responsivo**: no celular, o menu (que para admin/moderador tem até 6 itens + nome + sair) estourava a largura da tela em vez de quebrar linha. Corrigido para quebrar em várias linhas de forma organizada, testado em 375px de largura com os três perfis.
- **Títulos de página**: cada tela agora tem um título próprio na aba do navegador (ex: "Indicações | Clube do Hobby", ou o nome da indicação na página de detalhe), em vez do mesmo título genérico em todo lugar. A tela de cadastro de conta foi reorganizada (separando a parte de servidor da de formulário) para permitir isso, seguindo o mesmo padrão já usado na tela de login.
- **Ícone do site (favicon)**: estava usando o ícone padrão do Next.js; agora tem um ícone simples com as iniciais "CH" do clube.
- **Estados de carregamento**: todas as telas que buscam dados (lista e detalhe de indicações, formulários, painéis de admin/moderador) agora mostram um esqueleto de carregamento (efeito pulsante) em vez de tela em branco enquanto os dados chegam.
- **Página não encontrada e erro inesperado**: antes mostravam a tela de erro padrão do Next.js; agora têm uma versão com a cara do site e um botão para voltar/tentar de novo.
- **Limite de caracteres nos formulários**: os campos de texto agora têm um limite visível (`maxLength`) que bate com o limite já validado no servidor, para a pessoa perceber o limite ao digitar em vez de só descobrir depois de enviar.
- **Confirmação antes de apagar**: remover um destaque do Instagram ou remover conteúdo denunciado (que apaga indicação/comentário e tudo ligado a ele) agora pede confirmação antes de executar, já que são ações que não têm como desfazer.
- **Foco de teclado visível**: adicionado um contorno visível ao navegar pela página com Tab, para quem usa teclado em vez de mouse conseguir acompanhar onde está.

Tudo testado de novo no navegador após os ajustes (desktop e celular, com conta de membro e de admin): cadastro, login, duplicidade, avaliação, comentário, denúncia/moderação e os novos estados (vazio, carregando, 404, confirmação de remoção) continuam funcionando.

Nota técnica: durante o teste desta fase, o preview embutido do Claude Code ficou com a aba em segundo plano em vários momentos, o que atrapalhou a renderização de páginas carregadas direto por URL (afetava só a ferramenta de teste, não o site em si) - confirmei que o servidor sempre devolveu o HTML completo e correto nesses casos (verificado direto via `curl` autenticado) e que a navegação normal por link dentro do site sempre funcionou sem problema.

### Fase 5: Entrega

Perguntei sobre colocar o site no ar agora (Vercel + Neon, como já decidido na fase 2) e a pessoa preferiu deixar para depois - por enquanto o produto continua rodando só localmente.

O que foi feito:

- **README completo**: visão do produto, tabela de perfis e permissões, passo a passo para rodar localmente, variáveis de ambiente explicadas, estrutura de pastas, como fazer alterações simples (nova categoria, textos/cores, campo novo em indicação), nota de manutenção (dependências, backup do banco local, trocar a senha do admin de teste antes de ir para produção) e lista priorizada de v2.
- **Lista de v2 priorizada**: partindo do "adicionar depois" da fase 1, ordenada por valor - deploy primeiro (é o que destrava o uso real pelo clube), depois painel de gestão de usuários pelo admin, recuperação de senha, cadastro por convite, feed automático do Instagram, mapa, denúncia categorizada, os módulos futuros (Vendas/Eventos/Clube do Livro) e testes automatizados.

O que fica pendente, registrado para quando a pessoa quiser retomar:

- **Deploy** (Vercel + Neon): as contas precisam ser criadas pela própria pessoa (é uma decisão bloqueante e envolve login/credenciais dela); eu conduzo o passo a passo quando ela pedir.
- **`AUTH_SECRET` de produção**: hoje o `.env` local tem um valor de desenvolvimento; antes de qualquer deploy é preciso gerar um novo (comando documentado no README).

**Próximo passo:** quando a pessoa quiser colocar o site no ar, retomar com o co-fundador técnico para o passo a passo do deploy (Vercel + Neon). Até lá, o projeto está pronto para uso local e para evoluir a partir da lista de v2.
