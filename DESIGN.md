# DESIGN.md - Clube do Hobby

Design system do Clube do Hobby, derivado do logo da marca. Segue o formato DESIGN.md (referência: [getdesign.md](https://getdesign.md/)) para que pessoas e agentes de IA mantenham a mesma linguagem visual em todas as páginas.

Os tokens vivem em [src/app/globals.css](src/app/globals.css). O logo recriado em código está em [src/components/Logo.tsx](src/components/Logo.tsx) e o arquivo original em [public/brand/logo.png](public/brand/logo.png).

## Identidade

O logo é um wordmark preto em serifada pesada e macia, de inspiração retrô anos 70 (terminais em gota, o "y" com cauda em bola), sobre papel creme, com uma flor rosa de pétalas arredondadas segurando o "do". A leitura é de **clube de bairro, afetivo e artesanal**: feito à mão, acolhedor, um pouco nostálgico, sem ser infantil.

Em uma frase: **um caderno de hobbies impresso em papel creme, com tinta preta e um carimbo de flor rosa.**

### Princípios

1. **Papel, não tela.** O fundo é sempre creme. Branco puro e cinza frio não existem no sistema.
2. **Tinta forte, um acento só.** Preto quente carrega texto e ações; o rosa-pétala é o único acento e aparece pouco.
3. **Macio e redondo.** Pílulas, cantos generosos e a flor como motivo. Nada de cantos vivos.
4. **Impresso.** Bordas de 2px em tinta e sombra sólida deslocada ("carimbo") no lugar de sombras difusas.
5. **Título com personalidade, texto quieto.** A serifada retrô fica nos títulos; o corpo é uma sans limpa e legível.

### Referências do getdesign.md

- **Oura**: papel creme quente com serifada editorial; base para o canvas creme e o par serifada + grotesca.
- **Notion**: minimalismo quente com títulos em serifa e superfícies suaves; base para a hierarquia calma das páginas internas.
- **Mastercard**: canvas creme com formas em pílula e calor editorial; base para botões em pílula.
- **Airbnb**: acento coral quente com UI arredondada; base para usar o rosa como acento de afeto, não de alerta.

## Cores

### Marca (extraídas do logo)

| Token          | Hex       | Origem no logo             | Uso                                                 |
| -------------- | --------- | -------------------------- | --------------------------------------------------- |
| `paper`        | `#EAE2CD` | Fundo creme                | Fundo da página (tema claro), texto sobre a flor    |
| `ink`          | `#0B0A08` | Letras pretas              | Texto principal, botão primário, bordas fortes      |
| `petal-400`    | `#E28A89` | Flor                       | Acento: flor, sombra carimbo, decoração             |

### Escala pétala (acento)

| Token        | Hex       | Uso                                             |
| ------------ | --------- | ----------------------------------------------- |
| `petal-50`   | `#FCF0EF` | Fundos muito sutis                              |
| `petal-100`  | `#F8DEDD` | Fundo de badges e de seções de destaque         |
| `petal-200`  | `#F1C0BF` | Seleção de texto                                |
| `petal-300`  | `#E9A3A2` | Links no tema escuro                            |
| `petal-400`  | `#E28A89` | **Cor da marca**                                |
| `petal-500`  | `#D46E6D` | Anel de foco, hover do acento                   |
| `petal-600`  | `#B9524F` | Acento sobre fundo claro quando precisa de mais peso |
| `petal-700`  | `#96403E` | Texto de acento sobre creme (links)             |
| `petal-800`  | `#713230` | Texto de badge sobre `petal-100`                |
| `petal-900`  | `#4D2321` | Fundo de badge no tema escuro                   |

### Neutros quentes

A escala `zinc` do Tailwind foi **remapeada** para uma rampa quente que vai do creme à tinta. Assim, qualquer `zinc-*` já usado no código herda a marca automaticamente.

| Token      | Hex       | Uso típico                                   |
| ---------- | --------- | -------------------------------------------- |
| `zinc-50`  | `#F7F2E6` | Superfícies claras                           |
| `zinc-100` | `#EFE7D4` | Skeletons, fundos sutis                      |
| `zinc-200` | `#E0D5BB` | Bordas suaves, skeletons                     |
| `zinc-300` | `#CDBF9F` | Bordas de inputs                             |
| `zinc-400` | `#A6987B` | Placeholder, texto desabilitado              |
| `zinc-500` | `#7E725D` | Texto terciário                              |
| `zinc-600` | `#5D5444` | Texto secundário                             |
| `zinc-700` | `#453E33` | Texto de navegação e labels                  |
| `zinc-800` | `#2D2822` | Hover do botão primário                      |
| `zinc-900` | `#1B1814` | Superfícies no tema escuro                   |
| `zinc-950` | `#110F0C` | Fundo da página no tema escuro               |
| `white`    | `#FBF8F1` | "Branco" da marca: cards e inputs (nunca `#FFF`) |

### Tokens semânticos

Mudam com o tema e devem ser preferidos em código novo.

| Token         | Claro        | Escuro       |
| ------------- | ------------ | ------------ |
| `background`  | `paper`      | `zinc-950`   |
| `surface`     | `white`      | `zinc-900`   |
| `foreground`  | `ink`        | `paper`      |
| `muted`       | `zinc-600`   | `zinc-400`   |
| `line`        | `zinc-300`   | `zinc-700`   |
| `accent`      | `petal-400`  | `petal-400`  |
| `accent-ink`  | `petal-700`  | `petal-300`  |

Uso: `bg-background`, `bg-surface`, `text-foreground`, `text-muted`, `border-line`, `text-accent-ink`.

### Contraste

- `ink` sobre `paper`: contraste altíssimo, use à vontade.
- `ink` sobre `petal-400`: passa AA para texto, ok para botões de acento.
- `petal-400` sobre `paper`: **não passa** para texto. Use o rosa só como forma, fundo ou sombra. Para texto rosa sobre creme, use `petal-700`.
- `petal-800` sobre `petal-100`: passa AA, é o par dos badges.
- Estados de erro e aviso continuam com `red-*` e `amber-*` do Tailwind; não use o rosa para erro, para não confundir afeto com alerta.

## Tipografia

| Papel     | Fonte                                                           | Por quê                                                                 |
| --------- | --------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Display   | **Fraunces** (Google Fonts), eixos `SOFT 100`, `WONK 1`, peso 700-900 | Serifada "old style" macia inspirada em Windsor e Cooper, a mesma família visual do logo |
| Texto     | **DM Sans** (Google Fonts), peso 400-600                        | Sans geométrica e amigável que não compete com o display                |

Classes: `font-display` e `font-sans` (padrão do `body`). `h1`, `h2` e `h3` já recebem Fraunces com `SOFT`/`WONK` pela camada base.

### Escala

| Uso                       | Classe                           | Fonte    | Peso |
| ------------------------- | -------------------------------- | -------- | ---- |
| Logo no hero              | `text-6xl sm:text-8xl`           | Display  | 900  |
| Título de página (`h1`)   | `text-3xl` a `text-4xl`          | Display  | 800  |
| Título de seção (`h2`)    | `text-3xl` com flor ao lado      | Display  | 700  |
| Título de card            | `font-display text-lg font-bold` | Display  | 700  |
| Corpo destacado           | `text-lg`                        | Sans     | 400  |
| Corpo / UI                | `text-sm`                        | Sans     | 400-500 |
| Metadados                 | `text-xs`                        | Sans     | 400  |

Regra: **Fraunces nunca em parágrafo**, DM Sans nunca em título de página.

## Forma

### Raios

Os raios foram aumentados no tema para refletir as pétalas arredondadas.

| Token          | Valor     | Uso                                  |
| -------------- | --------- | ------------------------------------ |
| `rounded-sm`   | 6px       | Elementos pequenos                   |
| `rounded-md`   | 12px      | Inputs, selects, botões secundários  |
| `rounded-lg`   | 16px      | Cards de lista                       |
| `rounded-xl`   | 24px      | Cards de formulário, painéis         |
| `rounded-full` | pílula    | Botões primários, badges, navegação  |

### Bordas

- **Borda de tinta**: `border-2 border-ink` (escuro: `dark:border-zinc-700`). Usada no header, nos cards clicáveis, nos formulários de login/cadastro e entre seções da home.
- **Borda suave**: `border border-zinc-300` para inputs e contêineres secundários.

### Sombra carimbo

`shadow-stamp` = `4px 4px 0 0` sólido, sem desfoque, como um carimbo impresso levemente fora de registro.

- Em tinta: hover de cards (`hover:shadow-stamp`).
- Em rosa: CTA principal e cards de autenticação (`shadow-stamp shadow-petal-400`).
- No tema escuro, prefira trocar por borda rosa (`dark:hover:border-petal-400 dark:hover:shadow-none`).

Evite sombras difusas grandes. `shadow-sm` existe só para casos utilitários.

## Motivo: a flor

O componente `Flower` (em `Logo.tsx`) desenha a flor de 8 pétalas do logo em SVG, herdando a cor via `currentColor`.

- **Decoração de seção**: flores grandes, cortadas pela borda, em `text-petal-400` com `opacity-15` a `opacity-25` (aplique a opacidade no SVG inteiro, não na cor, para as pétalas não se sobreporem visualmente).
- **Marcador de título**: flor de 24px antes do `h2` de seção.
- **Favicon**: flor rosa com miolo de tinta sobre creme ([src/app/icon.tsx](src/app/icon.tsx)).
- Não use mais de duas flores decorativas por tela.

## Logo

`<Logo />` recria o wordmark em código (Fraunces 900 + flor com "do" em `paper`), funcionando nos dois temas.

| Variante   | Uso                                   |
| ---------- | ------------------------------------- |
| `inline`   | Header e espaços horizontais          |
| `stacked`  | Hero da home, telas de destaque       |

O tamanho é controlado por `font-size` (`className="text-2xl"`), tudo escala em `em`. O PNG original fica em `public/brand/logo.png` para usos externos (redes sociais, materiais impressos), sempre sobre o fundo creme original.

Não fazer: esticar, trocar a cor da flor, colocar a flor sem o "do" no lugar do logo inteiro, ou usar o PNG sobre fundo escuro.

## Componentes

### Botões

| Variante   | Classes base                                                                                                    |
| ---------- | --------------------------------------------------------------------------------------------------------------- |
| Primário   | `rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900` |
| CTA hero   | Primário + `shadow-stamp shadow-petal-400 hover:-translate-y-0.5`                                               |
| Contorno   | `rounded-full border-2 border-ink px-6 py-3 font-semibold hover:bg-ink hover:text-paper`                        |
| Secundário | `rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700`                                 |
| Navegação  | `rounded-full px-3 py-1.5 font-medium text-zinc-700 hover:bg-zinc-900/5`                                        |

Lembre: `text-white` resolve para o creme `#FBF8F1`, nunca branco puro.

### Card de lista

`rounded-lg border-2 border-ink bg-white px-5 py-4 transition hover:-translate-y-0.5 hover:shadow-stamp`, título em `font-display text-lg font-bold`, categoria como badge à direita, metadados em `text-xs text-zinc-500`.

### Badge

`rounded-full bg-petal-100 px-2.5 py-0.5 text-xs font-medium text-petal-800`, no escuro `dark:bg-petal-900 dark:text-petal-100`. Usado para categoria e papel do usuário.

### Inputs

`rounded-md border border-zinc-300 px-3 py-2 text-sm`. O fundo `surface` vem da camada base. Foco: borda `zinc-500` e anel `petal-500` via `:focus-visible`.

### Header

Fixo no topo (`sticky`), fundo `background/95` com `backdrop-blur`, borda inferior `border-b-2 border-ink`, logo `inline` à esquerda. Sempre em uma linha só (cerca de 58px no desktop e 66px no celular).

- **A partir de `lg` (1024px)**: navegação em pílulas à direita, nome + badge de papel, Sair e botão de tema.
- **Abaixo de `lg`**: só o botão de tema e o botão de menu (hambúrguer/X) à direita. O menu ([MobileMenu.tsx](src/components/MobileMenu.tsx)) abre um painel logo abaixo do header, com links empilhados de 48px de altura, rodapé com usuário e Sair (ou Entrar/Criar conta para visitantes) e um fundo `ink/40` sobre o resto da página.
- O menu fecha ao navegar, ao tocar no fundo, com `Esc` (o foco volta ao botão) e ao alargar a tela até `lg`. Enquanto aberto, a rolagem da página fica travada.
- A página atual fica marcada com `aria-current="page"`: pílula sutil no desktop, fundo `petal-100` no menu móvel ([NavLink.tsx](src/components/NavLink.tsx)).
- O corte é em `lg` e não em `md` porque o nav completo de admin não cabe numa linha em 768px.

### Seção de destaque

Faixa inteira com `bg-petal-100` (escuro: `bg-zinc-900`) e `border-t-2 border-ink`, usada para eventos na home.

## Temas claro e escuro

O tema claro (papel creme) é o padrão da marca. No escuro, o papel vira tinta (`zinc-950`), o texto vira creme (`paper`) e o rosa continua igual. As bordas de tinta viram `zinc-700` para não pesar, e a sombra carimbo dá lugar a borda rosa no hover.

### Como o tema é escolhido

1. **Escolha da pessoa**: o botão de lua/sol no fim do nav ([ThemeToggle.tsx](src/components/ThemeToggle.tsx)) alterna o tema e grava o cookie `clube-theme` (`light` ou `dark`, válido por 1 ano).
2. **Servidor**: o [layout.tsx](src/app/layout.tsx) lê o cookie e renderiza `<html data-theme="...">`, então a página já chega no tema certo, sem piscar e sem script inline.
3. **Sem escolha**: sem cookie, não há `data-theme` e o CSS segue `prefers-color-scheme` do sistema.

### Regras de código

- Use as classes `dark:*` normalmente. O `@custom-variant dark` em `globals.css` cobre os dois casos (atributo `data-theme="dark"` ou sistema escuro sem `data-theme="light"`).
- Tokens semânticos (`bg-surface`, `text-foreground` etc.) trocam sozinhos, sem `dark:`.
- Durante a troca, o atributo `data-theme-switching` desliga as transições para tudo mudar de uma vez.
- O ícone mostra o destino: **lua** no claro (ir para o escuro), **sol** no escuro (ir para o claro). Os dois SVGs são renderizados e o CSS esconde um, para não haver diferença entre servidor e cliente.

## Acessibilidade

- Foco visível sempre: `outline` de 2px em `petal-500` com `offset` de 2px.
- Rosa nunca é o único portador de informação nem cor de texto sobre creme.
- O logo do hero é decorativo; existe um `h1` com `sr-only` para leitores de tela, e o link do header tem `aria-label`.
- Áreas de toque de botões e links de navegação com no mínimo ~36px de altura; no menu móvel, 44-48px.

## Responsividade

Mobile first, testado de 320px a 1280px sem rolagem horizontal.

| Faixa             | Comportamento                                                                 |
| ----------------- | ----------------------------------------------------------------------------- |
| < 640px (`sm`)    | Filtros em grade: busca e categoria na largura toda, cidade + botão Filtrar lado a lado. Formulários em uma coluna. |
| 640px+ (`sm`)     | Filtros voltam a ficar em linha; formulários em duas colunas onde fizer sentido. |
| < 1024px          | Header com menu móvel.                                                        |
| 1024px+ (`lg`)    | Header com navegação completa.                                                |

Regras:

- Linhas com título + ação usam `flex-wrap` e o botão leva `whitespace-nowrap`, para o botão descer inteiro em vez de quebrar o texto.
- Badges levam `shrink-0 whitespace-nowrap`; quem quebra linha é o título ao lado.
- Grupos de botões usam `flex-wrap`.
- Textos longos em linhas flex (como URLs) precisam de `min-w-0` no pai para o `truncate` funcionar.

## Para agentes de IA

Ao criar ou alterar telas:

1. Use os tokens semânticos (`bg-surface`, `text-foreground`, `text-muted`) ou a escala `zinc` remapeada; nunca hex solto, `gray-*`, `slate-*` ou `bg-[#fff]`.
2. Títulos em `h1`/`h2` (Fraunces automático); texto em DM Sans.
3. Ações primárias em pílula de tinta; um único CTA com sombra carimbo rosa por tela.
4. Cards clicáveis com borda de tinta 2px e carimbo no hover.
5. Rosa só como acento: flor, badge, sombra, foco.
6. Teste nos temas claro e escuro.
