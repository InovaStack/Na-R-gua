# 🚀 GUIA COMPLETO: ADICIONAR PROJETO AO GITHUB (Flowcorte)

## 📋 Pré-requisitos

- [ ] Git instalado ([Download aqui](https://git-scm.com/downloads))
- [ ] Conta no GitHub ([Criar conta](https://github.com/signup))
- [ ] Terminal/PowerShell aberto

---

## 🎯 MÉTODO 1: Via Interface Web do GitHub (MAIS FÁCIL)

### Passo 1: Criar Repositório no GitHub

1. Acesse [github.com](https://github.com)
2. Clique no botão **"+"** no canto superior direito
3. Selecione **"New repository"**
4. Preencha:
   - **Repository name:** `flowcorte`
   - **Description:** `Plataforma de agendamento para barbearias`
   - **Visibility:** Public (ou Private, se preferir)
   - ❌ **NÃO** marque "Add a README file"
   - ❌ **NÃO** adicione .gitignore (já temos)
   - ❌ **NÃO** escolha license (já temos)
5. Clique em **"Create repository"**

### Passo 2: Configurar Git Local

Abra o PowerShell/Terminal e execute:

```powershell
# Navegar até a pasta do projeto
cd "d:\Arquivos\Projetos em andamentos\Na régua\Flowcorte Beta 1.1"

# Configurar seu nome (se ainda não configurou)
git config --global user.name "Seu Nome"

# Configurar seu email (use o mesmo do GitHub)
git config --global user.email "seu-email@exemplo.com"

# Verificar configuração
git config --list
```

### Passo 3: Inicializar Repositório Local

```powershell
# Inicializar Git
git init

# Verificar status
git status
```

### Passo 4: Adicionar Arquivos ao Git

```powershell
# Adicionar todos os arquivos
git add .

# Verificar o que será commitado
git status

# Fazer o primeiro commit
git commit -m "feat: initial commit - projeto Na Régua v1.1.0"
```

### Passo 5: Conectar ao GitHub

```powershell
# Renomear branch para main (padrão do GitHub)
git branch -M main

# Adicionar repositório remoto
# SUBSTITUA 'SEU-USUARIO' pelo seu username do GitHub
git remote add origin https://github.com/SEU-USUARIO/flowcorte.git

# Verificar se foi adicionado
git remote -v
```

### Passo 6: Enviar para o GitHub

```powershell
# Push inicial
git push -u origin main
```

**Se pedir autenticação:**
- Username: seu username do GitHub
- Password: use um **Personal Access Token** (não a senha da conta)

#### Como criar Personal Access Token:
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token (classic)
3. Marque: `repo` (todos os sub-items)
4. Generate token
5. **COPIE O TOKEN** (não será mostrado novamente!)
6. Use este token como senha no git

---

## 🎯 MÉTODO 2: Via GitHub CLI (MAIS RÁPIDO)

### Passo 1: Instalar GitHub CLI

```powershell
# Windows (usando winget)
winget install --id GitHub.cli

# Ou baixe em: https://cli.github.com/
```

### Passo 2: Autenticar

```powershell
# Login no GitHub
gh auth login

# Siga as instruções:
# - Escolha: GitHub.com
# - Escolha: HTTPS
# - Escolha: Login with a web browser
# - Copie o código e cole no navegador
```

### Passo 3: Criar e Publicar Repositório

```powershell
# Navegar até a pasta
cd "d:\Arquivos\Projetos em andamentos\Na régua\Flowcorte Beta 1.1"

# Inicializar Git
git init

# Adicionar arquivos
git add .

# Commit inicial
git commit -m "feat: initial commit - projeto Na Régua v1.1.0"

# Criar repositório no GitHub e fazer push
gh repo create na-regua --public --source=. --remote=origin --push

# Ou para repositório privado:
# gh repo create na-regua --private --source=. --remote=origin --push
```

✅ **PRONTO!** Seu repositório está no GitHub!

---

## 🔧 Configurações Pós-Upload

### 1. Adicionar Descrição e Topics

No GitHub, vá para o repositório e clique em ⚙️ (Settings):

**About (lado direito):**
- Description: `Plataforma moderna de agendamento para barbearias com PWA`
- Website: `https://seu-site.netlify.app` (após deploy)
- Topics: `javascript`, `pwa`, `netlify`, `supabase`, `barbearia`, `agendamento`

### 2. Configurar Branch Protection (Opcional)

Settings → Branches → Add rule:
- Branch name pattern: `main`
- ✅ Require pull request reviews before merging
- ✅ Require status checks to pass before merging

### 3. Habilitar GitHub Actions

Settings → Actions → General:
- ✅ Allow all actions and reusable workflows

### 4. Adicionar Secrets para Deploy Automático

Settings → Secrets and variables → Actions → New repository secret:

Adicione:
- `NETLIFY_AUTH_TOKEN` - Token do Netlify
- `NETLIFY_SITE_ID` - ID do site no Netlify
- `SUPABASE_URL` - URL do Supabase
- `SUPABASE_ANON_KEY` - Chave anon do Supabase
- `SUPABASE_SERVICE_KEY` - Service key do Supabase

**Como obter Netlify Token:**
```powershell
netlify login
netlify status
# Copie o Auth Token
```

**Como obter Site ID:**
```powershell
netlify status
# Copie o Site ID
```

---

## 📝 Comandos Git Úteis

### Verificar Status
```powershell
git status
```

### Ver Histórico de Commits
```powershell
git log --oneline
```

### Adicionar Mais Arquivos
```powershell
# Adicionar arquivo específico
git add arquivo.txt

# Adicionar todos os arquivos modificados
git add .

# Commit
git commit -m "feat: adiciona nova funcionalidade"

# Push para GitHub
git push
```

### Criar Nova Branch
```powershell
# Criar e mudar para nova branch
git checkout -b feature/nova-funcionalidade

# Push da nova branch
git push -u origin feature/nova-funcionalidade
```

### Atualizar do GitHub
```powershell
# Baixar mudanças
git pull
```

### Ver Diferenças
```powershell
# Ver mudanças não commitadas
git diff

# Ver mudanças de um arquivo
git diff arquivo.txt
```

---

## 🎨 Personalizar README.md no GitHub

O arquivo `README.md` já está pronto, mas você pode adicionar badges:

```markdown
[![Netlify Status](https://api.netlify.com/api/v1/badges/SEU-BADGE-ID/deploy-status)](https://app.netlify.com/sites/SEU-SITE/deploys)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/SEU-USUARIO/na-regua.svg)](https://github.com/SEU-USUARIO/na-regua/stargazers)
```

---

## 🔄 Workflow de Desenvolvimento

### Fluxo Recomendado:

```powershell
# 1. Criar branch para nova feature
git checkout -b feature/minha-feature

# 2. Fazer alterações
# ... editar arquivos ...

# 3. Adicionar e commitar
git add .
git commit -m "feat: adiciona minha feature"

# 4. Push para GitHub
git push -u origin feature/minha-feature

# 5. Abrir Pull Request no GitHub

# 6. Após aprovação, fazer merge

# 7. Voltar para main e atualizar
git checkout main
git pull

# 8. Deletar branch local (opcional)
git branch -d feature/minha-feature
```

---

## 🐛 Problemas Comuns

### Erro: "fatal: not a git repository"
```powershell
# Certifique-se de estar na pasta correta
cd "d:\Arquivos\Projetos em andamentos\Na régua\Flowcorte Beta 1.1"

# Inicialize o git
git init
```

### Erro: "remote origin already exists"
```powershell
# Remover remote existente
git remote remove origin

# Adicionar novamente
git remote add origin https://github.com/SEU-USUARIO/flowcorte.git
```

### Erro: "Authentication failed"
```powershell
# Use Personal Access Token ao invés da senha
# Ou configure SSH keys
```

### Arquivos muito grandes
```powershell
# Ver tamanho dos arquivos
git ls-files -s | awk '{print $4, $2}' | sort -n

# Remover arquivo do Git (mantém no disco)
git rm --cached arquivo-grande.zip

# Adicionar ao .gitignore
echo "arquivo-grande.zip" >> .gitignore
```

---

## ✅ Checklist Final

Antes de considerar concluído:

- [ ] Repositório criado no GitHub
- [ ] Código enviado (git push)
- [ ] README.md visível e formatado
- [ ] Descrição e topics adicionados
- [ ] LICENSE presente
- [ ] .gitignore configurado
- [ ] Secrets configurados (se usar Actions)
- [ ] Badge do Netlify adicionado
- [ ] Repositório público/privado conforme desejado

---

## 🎉 Próximos Passos

Após adicionar ao GitHub:

1. **Conectar com Netlify:**
   - Netlify → Add new site → Import from Git
   - Conectar GitHub
   - Selecionar repositório `na-regua`
   - Deploy automático ativado! ✅

2. **Compartilhar:**
   - Adicione o link do GitHub no seu portfólio
   - Compartilhe nas redes sociais
   - Adicione no LinkedIn

3. **Manter Atualizado:**
   ```powershell
   # Sempre que fizer mudanças:
   git add .
   git commit -m "descrição da mudança"
   git push
   ```

---

## 📞 Ajuda

**Recursos:**
- [Documentação Git](https://git-scm.com/doc)
- [GitHub Docs](https://docs.github.com)
- [GitHub CLI](https://cli.github.com/manual/)

**Dúvidas?**
- Instagram: [@inova_stack](https://instagram.com/inova_stack)

---

**Desenvolvido por Lucas Pedro - InovaStack**  
**Projeto: Flowcorte v1.1.0**  
**Data: Dezembro 2025**

🚀 **Boa sorte com seu projeto no GitHub!**
