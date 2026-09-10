# JC Manutenção — Site One Page

Site institucional em HTML, CSS e JavaScript puros. Sem build, sem dependências.
Basta abrir `index.html` ou publicar a pasta `site/` em qualquer hospedagem.

## Estrutura

```
site/
├── index.html
├── assets/
│   ├── css/style.css
│   ├── js/main.js
│   └── img/logo.jpg
└── LEIA-ME.md
```

## Seções

| # | Seção | Âncora |
|---|-------|--------|
| 1 | Início (proposta de valor) | `#inicio` |
| 2 | Sobre nós (história, missão, visão, valores) | `#sobre` |
| 3 | Serviços (8 áreas + detalhe Fan Coil + método + periodicidade) | `#servicos` |
| 4 | Por que escolher / segmentos | `#diferenciais` |
| 5 | Portfólio (antes e depois) | `#portfolio` |
| 6 | Depoimentos | `#depoimentos` |
| 7 | Contato (WhatsApp, telefone, e-mail, formulário) | `#contato` |
| 8 | Localização com mapa | `#localizacao` |
| 9 | Rodapé com redes sociais | — |

## Conteúdo extraído dos PDFs

Todo o texto técnico veio de `JC_Manutencao_Portfolio.pdf`: quem somos, missão, visão,
valores, as 8 áreas de especialização, o detalhamento da preventiva em Fan Coil, o método
de 6 etapas, os 6 diferenciais, os segmentos, a periodicidade e os 4 casos de campo.

A paleta e a tipografia vieram dos PDFs de marca.

| Cor | Hex | Uso |
|-----|-----|-----|
| Azul escuro | `#051B58` | fundo do topo |
| Azul principal | `#072267` | botões, destaques, seção escura |
| Azul claro | `#79A0D7` | acentos sobre fundo escuro |
| Azul suave | `#D7E7FF` | seleção de texto |

Neutros de apoio, no espírito de uma interface premium: `#1D1D1F` para texto,
`#6E6E73` para texto secundário, `#F5F5F7` para seções alternadas e `#E8E8ED`
para as linhas de um pixel que separam os blocos.

Fontes: **Scandia** (títulos) e **Montserrat Medium** (texto). Scandia é licenciada e não
está no Google Fonts, então os títulos usam **Inter**, que é a grotesca livre mais próxima
do desenho da Scandia. Se a empresa tiver a licença, basta hospedar os arquivos da fonte e
trocar a variável `--font-tit` no topo do `style.css`.

## Direção visual

O layout é minimalista premium. As decisões que sustentam isso:

- **Raio máximo de 10px** em todo o site, sem exceção. Há três valores apenas: 10px para
  cartões e botões, 8px para campos e elementos menores, 6px para detalhes.
  Nenhum elemento circular.
- **Sem sombras.** A separação entre blocos vem de linhas de um pixel e de espaço em branco.
- **Sem gradientes decorativos e sem animação de entrada chamativa.** O único gradiente é o
  véu sobre a foto do topo, para garantir contraste do texto.
- **Tipografia como elemento principal.** Títulos grandes, peso 600, entrelinha curta e
  espaçamento negativo. Texto corrido em peso 300.
- **Cor usada com parcimônia.** Fundo branco e cinza claro na maior parte do site, com dois
  momentos escuros: o topo e a seção de diferenciais.
- **Barra de navegação translúcida** com desfoque, que ganha uma linha inferior ao rolar.

## O que precisa ser trocado antes de publicar

1. **Fotos.** Todas as imagens são de banco de imagens (Unsplash), carregadas por link
   apenas para demonstração. Elas ficam no objeto `IMAGES`, no topo de `assets/js/main.js`.
   Troque cada valor pelo caminho da foto real, por exemplo `'assets/img/fancoil-antes.jpg'`.
   Se um link falhar, o site cai automaticamente em uma imagem neutra, sem quebrar o layout.

2. **E-mail.** Está como `contato@jcmanutencao.com.br`, que é um endereço presumido.
   Confirme o e-mail real e substitua nas duas ocorrências do `index.html`.

3. **Depoimentos.** Os quatro depoimentos são exemplos escritos para a demonstração,
   com cargos genéricos e sem nome de cliente. Substitua por depoimentos reais autorizados
   antes de publicar.

4. **Redes sociais.** Só o Instagram foi confirmado nos PDFs (`@jcmanutencao_group`).
   TikTok, LinkedIn, Facebook e YouTube estão com links presumidos no rodapé.
   Ajuste ou remova os que não existirem.

5. **Mapa.** Aponta para São Paulo - SP em geral. Se houver endereço comercial para
   divulgar, troque o `q=` do `iframe` na seção de localização.

## Formulário

O formulário não usa servidor. Ele valida os campos e monta uma mensagem pronta no
WhatsApp `(11) 96632-2953`, abrindo a conversa em nova aba. Funciona em qualquer
hospedagem estática, inclusive GitHub Pages.

Para receber por e-mail em vez de WhatsApp, troque o bloco final do `submit` em
`assets/js/main.js` por um envio a um serviço como Formspree ou Web3Forms.

## Responsividade

Testado de 320px a 1440px, sem rolagem horizontal em nenhuma largura.

- Até 940px o menu vira lateral deslizante com fundo escurecido.
- Até 860px as seções Sobre e Contato passam a uma coluna.
- Serviços vão de 4 colunas para 2 e depois 1. Portfólio de 2 para 1.
- No portfólio, o antes e depois troca no hover no computador e no toque no celular.

## Acessibilidade

Navegação por teclado, link para pular ao conteúdo, foco visível, textos alternativos
nas imagens, rótulos em todos os campos e respeito a `prefers-reduced-motion`.
O menu fechado fica fora da ordem de tabulação.
