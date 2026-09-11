# Iara Games — Redesign e Interatividade

Projeto acadêmico da disciplina de Design de Interação.

## Versão atual

A Home foi implementada a partir do protótipo de redesign no Figma, considerando o cenário de usuário autenticado.

### Interações em JavaScript

- Busca inteligente com sugestões, pesquisas recentes e filtragem do catálogo em tempo real.
- Filtros de categoria com atualização imediata dos jogos exibidos.
- Feedback visual ao adicionar jogos ao carrinho.
- Feedback visual ao adicionar/remover jogos da lista de desejos.
- Retomada de partida com mudança de estado do botão e confirmação visual.
- Menu do usuário logado com acesso ao perfil e opção Sair, retornando à Home de visitante.
- Fluxo demonstrativo entre Login → Home logada → Sair → Home de visitante.

## Como visualizar

Abra `index.html` em um navegador ou publique a pasta no GitHub Pages.


## Demonstração das versões da Home

- `index.html` — Home para usuário logado, com Continue Jogando, Recomendações e busca interativa.
- `index-visitante.html` — Home para usuário não logado, com Entrar/Criar conta e conteúdo de descoberta.
- `login-page.html` — tela de login; após o envio do formulário, a demonstração direciona para a Home logada.
- `suporte.html` — Central de Suporte com o mesmo estado de usuário logado e menu da conta.

## Interações JavaScript

O arquivo `script.js` é externo e implementa busca dinâmica, filtros por categoria, feedback por toast, estados de carrinho e favoritos, retomada de partida e fluxo demonstrativo de login.
