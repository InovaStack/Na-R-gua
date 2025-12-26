# 🛠️ COMANDOS ÚTEIS - NA RÉGUA

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Instalar Netlify CLI globalmente
npm install -g netlify-cli
```

## 🚀 Desenvolvimento Local

```bash
# Iniciar servidor de desenvolvimento com Netlify Dev
npm run dev
# ou
netlify dev

# Acessar em: http://localhost:8888
```

## 🌐 Deploy

```bash
# Login no Netlify
netlify login

# Deploy de teste (draft)
netlify deploy

# Deploy em produção
netlify deploy --prod
# ou
npm run deploy
```

## 🔧 Configuração

```bash
# Configurar variáveis de ambiente
netlify env:set SUPABASE_URL "https://xxxxx.supabase.co"
netlify env:set SUPABASE_ANON_KEY "sua-chave-anon"
netlify env:set SUPABASE_SERVICE_KEY "sua-chave-service"

# Listar variáveis configuradas
netlify env:list

# Ver variável específica
netlify env:get SUPABASE_URL
```

## 📊 Monitoramento

```bash
# Ver logs em tempo real
netlify logs

# Ver status do site
netlify status

# Abrir dashboard do Netlify
netlify open

# Abrir site deployado
netlify open:site
```

## 🔍 Debug

```bash
# Testar functions localmente
netlify functions:invoke cadastrar --payload '{"usuario":"teste","email":"teste@email.com","senha":"123456"}'

# Ver logs de uma function
netlify functions:logs cadastrar

# Listar todas as functions
netlify functions:list
```

## 🗄️ Supabase

```bash
# Instalar Supabase CLI (opcional)
npm install -g supabase

# Fazer backup do banco
# (Execute no SQL Editor do Supabase)
pg_dump -h db.xxxxx.supabase.co -U postgres -d postgres > backup.sql

# Restaurar backup
psql -h db.xxxxx.supabase.co -U postgres -d postgres < backup.sql
```

## 🔄 Git

```bash
# Inicializar repositório
git init

# Adicionar arquivos
git add .

# Commit
git commit -m "Deploy inicial com Netlify e Supabase"

# Adicionar remote
git remote add origin https://github.com/seu-usuario/na-regua.git

# Push
git push -u origin main

# Conectar Netlify ao Git (para deploy automático)
netlify link
```

## 🧪 Testes

```bash
# Testar endpoint de cadastro
curl -X POST https://seu-site.netlify.app/.netlify/functions/cadastrar \
  -H "Content-Type: application/json" \
  -d '{"usuario":"Teste","email":"teste@email.com","senha":"123456"}'

# Testar endpoint de login
curl -X POST https://seu-site.netlify.app/.netlify/functions/login \
  -H "Content-Type: application/json" \
  -d '{"email":"teste@email.com","senha":"123456"}'

# Testar endpoint de agendamentos (GET)
curl https://seu-site.netlify.app/.netlify/functions/agendamentos

# Testar endpoint de agendamentos (POST)
curl -X POST https://seu-site.netlify.app/.netlify/functions/agendamentos \
  -H "Content-Type: application/json" \
  -d '{"data":"2025-12-26","hora":"14:00","nome":"João","telefone":"81987654321","corte":"degrade"}'
```

## 🔐 Segurança

```bash
# Verificar variáveis de ambiente (não devem aparecer no código)
grep -r "SUPABASE" --exclude-dir=node_modules --exclude-dir=.git .

# Verificar se .env está no .gitignore
cat .gitignore | grep .env

# Limpar cache do Netlify
netlify build --clear-cache
```

## 📱 PWA

```bash
# Validar manifest.json
# Acesse: https://manifest-validator.appspot.com/

# Testar Service Worker
# DevTools > Application > Service Workers

# Testar instalação PWA
# DevTools > Application > Manifest
```

## 🎨 Assets

```bash
# Otimizar imagens (instalar imagemin-cli)
npm install -g imagemin-cli

# Comprimir imagens
imagemin assets/*.png --out-dir=assets/optimized
imagemin Excama/assets/*.jpeg --out-dir=Excama/assets/optimized
```

## 📊 Performance

```bash
# Testar performance com Lighthouse
# DevTools > Lighthouse > Generate report

# Ou via CLI
npm install -g lighthouse
lighthouse https://seu-site.netlify.app --view
```

## 🔄 Rollback

```bash
# Listar deploys
netlify deploy:list

# Fazer rollback para deploy anterior
netlify rollback

# Ou especificar deploy ID
netlify rollback --deploy-id=DEPLOY_ID
```

## 🧹 Limpeza

```bash
# Limpar node_modules
rm -rf node_modules
npm install

# Limpar cache do Netlify
netlify build --clear-cache

# Limpar builds locais
rm -rf .netlify
```

## 📝 Logs Úteis

```bash
# Ver logs de build
netlify logs:deploy

# Ver logs de functions
netlify logs:function cadastrar
netlify logs:function login
netlify logs:function agendamentos

# Ver todos os logs
netlify logs --live
```

## 🎯 Atalhos Rápidos

```bash
# Desenvolvimento completo (um comando)
npm install && netlify dev

# Deploy rápido
git add . && git commit -m "Update" && git push && netlify deploy --prod

# Verificar tudo
netlify status && netlify env:list && netlify functions:list
```

## 📞 Ajuda

```bash
# Ajuda geral do Netlify CLI
netlify help

# Ajuda de comando específico
netlify deploy --help
netlify functions --help
netlify env --help
```

## 🔗 Links Úteis

- **Netlify Dashboard:** https://app.netlify.com
- **Supabase Dashboard:** https://app.supabase.com
- **Documentação Netlify:** https://docs.netlify.com
- **Documentação Supabase:** https://supabase.com/docs
- **Status Netlify:** https://www.netlifystatus.com
- **Status Supabase:** https://status.supabase.com

---

**Dica:** Salve este arquivo como referência rápida durante o desenvolvimento! 🚀
