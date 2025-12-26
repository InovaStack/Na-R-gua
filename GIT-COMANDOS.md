# ⚡ COMANDOS RÁPIDOS - GITHUB

## 🚀 INICIALIZAÇÃO (PRIMEIRA VEZ)

```powershell
# Método 1: Script Automático (RECOMENDADO)
.\init-github.ps1

# Método 2: Manual
git init
git add .
git commit -m "feat: initial commit"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/flowcorte.git
git push -u origin main
```

---

## 📝 USO DIÁRIO

```powershell
# Ver status
git status

# Adicionar arquivos modificados
git add .

# Commit
git commit -m "feat: descrição da mudança"

# Push para GitHub
git push

# Pull (baixar mudanças)
git pull
```

---

## 🌿 BRANCHES

```powershell
# Criar e mudar para nova branch
git checkout -b feature/nome-da-feature

# Listar branches
git branch

# Mudar de branch
git checkout main

# Deletar branch local
git branch -d feature/nome-da-feature

# Push de nova branch
git push -u origin feature/nome-da-feature
```

---

## 🔄 ATUALIZAÇÃO

```powershell
# Atualizar do GitHub
git pull

# Atualizar e fazer merge
git pull origin main

# Ver diferenças
git diff
```

---

## 📊 HISTÓRICO

```powershell
# Ver commits
git log --oneline

# Ver últimos 5 commits
git log --oneline -5

# Ver mudanças de um commit
git show COMMIT_ID
```

---

## 🔧 CORREÇÕES

```powershell
# Desfazer último commit (mantém arquivos)
git reset --soft HEAD~1

# Desfazer mudanças em arquivo
git checkout -- arquivo.txt

# Remover arquivo do Git (mantém no disco)
git rm --cached arquivo.txt

# Alterar mensagem do último commit
git commit --amend -m "nova mensagem"
```

---

## 🏷️ TAGS

```powershell
# Criar tag
git tag v1.1.0

# Push de tag
git push origin v1.1.0

# Listar tags
git tag
```

---

## 🔍 BUSCA

```powershell
# Buscar em commits
git log --grep="palavra"

# Buscar em código
git grep "texto"
```

---

## 🧹 LIMPEZA

```powershell
# Limpar arquivos não rastreados
git clean -fd

# Ver o que seria removido
git clean -n
```

---

## 📦 STASH (GUARDAR TEMPORARIAMENTE)

```powershell
# Guardar mudanças
git stash

# Listar stashes
git stash list

# Aplicar último stash
git stash pop

# Aplicar stash específico
git stash apply stash@{0}
```

---

## 🔗 REMOTE

```powershell
# Ver remotes
git remote -v

# Adicionar remote
git remote add origin URL

# Remover remote
git remote remove origin

# Alterar URL do remote
git remote set-url origin NOVA_URL
```

---

## 🎯 ATALHOS ÚTEIS

```powershell
# Status curto
git status -s

# Adicionar e commitar junto
git commit -am "mensagem"

# Ver últimas mudanças
git log -p -2

# Ver branches remotas
git branch -r

# Ver todas as branches
git branch -a
```

---

## 🚨 EMERGÊNCIA

```powershell
# Desfazer TUDO (CUIDADO!)
git reset --hard HEAD

# Voltar para commit específico
git reset --hard COMMIT_ID

# Reverter commit (cria novo commit)
git revert COMMIT_ID
```

---

## 📋 CONVENÇÕES DE COMMIT

```
feat: nova funcionalidade
fix: correção de bug
docs: documentação
style: formatação
refactor: refatoração
test: testes
chore: manutenção
perf: performance
ci: integração contínua
build: build system
```

### Exemplos:
```powershell
git commit -m "feat: adiciona sistema de notificações"
git commit -m "fix: corrige bug no login"
git commit -m "docs: atualiza README"
git commit -m "style: formata código CSS"
```

---

## 🔐 CONFIGURAÇÃO

```powershell
# Configurar nome
git config --global user.name "Seu Nome"

# Configurar email
git config --global user.email "seu@email.com"

# Ver configurações
git config --list

# Editor padrão
git config --global core.editor "code"

# Cores
git config --global color.ui auto
```

---

## 📞 AJUDA

```powershell
# Ajuda geral
git help

# Ajuda de comando específico
git help commit
git help push
```

---

**💡 Dica:** Salve este arquivo para consulta rápida!

**Documentação completa:** GITHUB.md
