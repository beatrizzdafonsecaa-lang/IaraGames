# Sprint 03 - Projeto Iara Games

<img width="2000" height="1000" alt="Logo-IaraGames-atualizado" src="https://github.com" />

> Logotipo da Iara Games atualizada

**Iara Games — Redesign e Interatividade**  
*Projeto acadêmico desenvolvido para a disciplina de Design de Interação.*

Uma plataforma digital criada com o objetivo de dar visibilidade a desenvolvedores independentes brasileiros, permitindo que publiquem, compartilhem e promovam seus jogos de forma acessível. Inspirada na lenda da Iara (folclore brasileiro), a plataforma conecta tecnologia, cultura e entretenimento em um único ambiente digital.

---

## 🚀 Evolução do Projeto & Versão Atual

A página principal (**Home**) foi totalmente renovada a partir do protótipo de redesenho construído no **Figma**, considerando o cenário de um **usuário autenticado (logado)**. O projeto evoluiu de uma estrutura estática para uma interface dinâmica e altamente interativa.

### 🕹️ Interações em JavaScript (`script.js`)
O arquivo JavaScript externo implementa os seguintes fluxos e comportamentos em tempo real:
- **Busca inteligente:** Sistema de busca com sugestões, pesquisas recentes e filtragem do catálogo em tempo real.
- **Filtros dinâmicos:** Seleção de categorias com atualização imediata dos jogos exibidos na tela.
- **Feedbacks visuais:** Avisos dinâmicos baseados em componentes de brinde (toast/notificação) ao adicionar itens ao carrinho ou ao favoritar/remover jogos da lista de desejos.
- **Retomada de partida:** Mudança de estado do botão de jogo com confirmação visual para o usuário.
- **Menu de usuário:** Menu flutuante do usuário logado com acesso rápido ao perfil e opção de "Sair".
- **Fluxo demonstrativo ponta a ponta:** Login → Home Logada → Sair → Home do Visitante.

---

## 📂 Estrutura e Demonstração das Versões

Para testar o projeto, abra o arquivo `index.html` diretamente em seu navegador ou publique a pasta utilizando o **GitHub Pages**.

- **`index.html`** — Home adaptada para o usuário logado, contendo as seções de "Continuar Jogando", "Recomendações" e o sistema de busca interativa.
- **`index-visitante.html`** — Home voltada para o usuário visitante (não logado), destacando os botões de Entrar/Criar conta e conteúdo focado em descoberta.
- **`login-page.html`** — Tela de autenticação. Após o envio simulado do formulário, a demonstração redireciona automaticamente o usuário para a Home logada.
- **`suporte.html`** — Central de Suporte que preserva o estado do usuário logado e o menu de conta persistente.

---

## 🧠 Metodologia — Design Thinking & Empatia

O desenvolvimento é centrado no usuário, compreendendo o comportamento, as dores e as expectativas do público gamer antes de codificar soluções.

### Pesquisa com Jogadores Digitais (Dados Coletados)
- **Amostra:** 17 respostas válidas de um público jovem adulto (18 a 34 anos) com alto engajamento em jogos para PC (Steam).
- **Descoberta:** O cenário indica um **problema de visibilidade**, não de aceitação. Fatores como preço, avaliações e indicações em redes sociais determinam a decisão de compra.

### Mapa de Empatia

| Dimensão | Insights |
|---|---|
| **O que vê** | Excesso de jogos genéricos nas plataformas; pouca visibilidade para o cenário BR |
| **O que ouve** | Recomendações de amigos, criadores de conteúdo e redes sociais |
| **O que fala/faz** | Busca custo-benefício; analisa exaustivamente avaliações antes de comprar |
| **O que pensa/sente**| Quer achar jogos bons de forma rápida; sente-se sobrecarregado com catálogos complexos |
| **Dores** | Preços elevados, interfaces poluídas e dificuldade em descobrir jogos nacionais |
| **Ganhos** | Navegação simples, curadoria de jogos brasileiros e confiança na escolha |

### Persona Principal

<img width="956" height="478" alt="Persona-LucasAndrade" src="https://github.com" />

**Lucas Andrade, 26 anos**  
Jogador frequente de PC. Precisa encontrar jogos de qualidade com facilidade, quer descobrir novidades relevantes e preza por uma experiência simples, limpa e organizada.

---

## 🎨 Design & Identidade Visual

- **Logotipo:** Inspirado em pinturas corporais de **urucum** (povos indígenas), representando identidade e conexão cultural, aliado a uma tipografia futurista e geométrica.
- **Tipografia:** Fonte **Geist** — moderna, minimalista e altamente legível para interfaces de jogos.
- **Paleta de Cores:** Identidade visual brasileira marcante baseada em tons de verde (`#196427`, `#2E8A3F`), detalhes em vermelho urucum (`#DF3F32`) e fundos escuros (`#111815`).

---

## 🛠️ Decisões de UX/UI, Acessibilidade e ESG

- **Arquitetura:** Layout estruturado de forma responsiva com **CSS Grid** e **Flexbox** para uma interface fluida.
- **Acessibilidade:** Uso rigoroso de tags semânticas (`<header>`, `<main>`, `<section>`, `<footer_>`), alto contraste nativo e preenchimento de atributos `alt` em elementos visuais.
- **ESG:** Foco em eficiência de carregamento digital, bem-estar visual do usuário e planejamento para futura moderação de comunidade.

---

## 📊 Pesquisa de Mercado

| Plataforma | Ponto Positivo | Ponto Negativo |
|---|---|---|
| **Steam** | Maior biblioteca de jogos para PC | Interface complexa; excesso de jogos de baixa qualidade |
| **Epic Games** | Design moderno e minimalista | Launcher pesado; falta de recursos sociais integrados |
| **Xbox Game Pass** | Excelente custo-benefício (assinatura) | Rotatividade de catálogo (jogos saem do sistema) |

---

## 📦 Tecnologias Utilizadas

- **HTML5** (Semântico)
- **CSS3** (Grid Layout, Flexbox e Variáveis)
- **JavaScript (ES6+)** (Manipulação de DOM e lógica assíncrona)

---

## 🚦 Status do Projeto

| Etapa | Status |
|---|---|
| Sprint 01 | ✅ Concluída |
| Sprint 02 | ✅ Concluída |
| Sprint 03 | ✅ Concluída (Redesign e Interatividades) |
| Projeto Final | 🚧 Em construção |

---

## 👥 Desenvolvido por

| [<img loading="lazy" src="https://githubusercontent.com" width=115><br><sub>Beatriz Fonseca</sub>](https://github.com) | [<img loading="lazy" src="https://githubusercontent.com" width=115><br><sub>Luana Silva</sub>](https://github.com) |
| :---: | :---: |



