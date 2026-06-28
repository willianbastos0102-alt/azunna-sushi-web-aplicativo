# Azunna Sushi - Website Premium

Um site institucional elegante, dinâmico e responsivo para o restaurante **Azunna Sushi**. Este projeto foi desenvolvido com foco em alta performance e design sofisticado, apresentando o cardápio interativo e um sistema elegante para simulação de pré-reservas.

## 🚀 Tecnologias

- **HTML5** estruturado e semântico.
- **CSS3 Vanilla** com design premium, variáveis de estilo, responsividade completa e efeitos de *glassmorphism*.
- **JavaScript** puro para animações de rolagem (Intersection Observer), abas de navegação do cardápio e controle dinâmico de formulários.
- **FontAwesome** para ícones.
- **Google Fonts** com as tipografias elegantes *Outfit* e *Playfair Display*.

## 🛠️ Como rodar localmente

Como o projeto é composto apenas por arquivos estáticos (`HTML`, `CSS`, `JS`), você pode executá-lo de forma extremamente simples:

1. Dê um duplo clique no arquivo [index.html](file:///Users/admin/.gemini/antigravity-ide/scratch/azunna-sushi/index.html) para abri-lo diretamente no navegador.
2. Alternativamente, você pode usar uma extensão de servidor local (como *Live Server* no VS Code) ou rodar o comando:
   ```bash
   npx live-server
   ```

## 🌐 Deploy no GitHub Pages (Automatizado)

Este repositório já vem pré-configurado com uma **GitHub Action** que faz o deploy automatizado para o GitHub Pages sempre que um novo código é enviado para a branch `main`.

### Passo a Passo para Hospedar no seu GitHub:

1. **Crie um repositório no seu GitHub**:
   - Vá para o seu GitHub e crie um novo repositório vazio (não adicione README, .gitignore ou licença).
   
2. **Conecte e envie o código**:
   Abra o terminal na pasta do projeto e rode os seguintes comandos:
   ```bash
   # Vincula o repositório local ao GitHub (substitua pelo link do repositório que você criou)
   git remote add origin https://github.com/SEU-USUARIO/NOME-DO-REPOSITORIO.git

   # Garante que a branch principal é a main
   git branch -M main

   # Envia os arquivos para o GitHub
   git push -u origin main
   ```

3. **Habilite o deploy via Actions no GitHub**:
   - No seu repositório no GitHub, acesse a aba **Settings** (Configurações).
   - No menu lateral esquerdo, clique em **Pages**.
   - Na seção **Build and deployment**, sob **Source**, mude a opção de "Deploy from a branch" para **GitHub Actions**.
   
Pronto! A partir desse momento, a Action configurada em `.github/workflows/deploy.yml` será disparada automaticamente e fará o deploy do site. O link público será exibido na página de configurações do GitHub Pages e na aba **Actions** do seu repositório.
