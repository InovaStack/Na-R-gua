# 📋 GUIA RÁPIDO DE DEPLOY - NETLIFY

## ⚡ Deploy Rápido (5 minutos)

### 1️⃣ Preparar Supabase

1. Acesse [supabase.com](https://supabase.com) e crie uma conta
2. Crie um novo projeto
3. Vá em SQL Editor e execute:

```sql
-- Tabela de usuários
CREATE TABLE usuarios (
  id BIGSERIAL PRIMARY KEY,
  usuario TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  auth_user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de agendamentos
CREATE TABLE agendamentos (
  id BIGSERIAL PRIMARY KEY,
  data DATE NOT NULL,
  hora TIME NOT NULL,
  nome TEXT NOT NULL,
  telefone TEXT NOT NULL,
  corte TEXT NOT NULL,
  barbearia_id INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE agendamentos ENABLE ROW LEVEL SECURITY;

-- Políticas
CREATE POLICY "usuarios_select" ON usuarios FOR SELECT USING (auth.uid() = auth_user_id);
CREATE POLICY "usuarios_insert" ON usuarios FOR INSERT WITH CHECK (true);
CREATE POLICY "agendamentos_select" ON agendamentos FOR SELECT USING (true);
CREATE POLICY "agendamentos_insert" ON agendamentos FOR INSERT WITH CHECK (true);
CREATE POLICY "agendamentos_delete" ON agendamentos FOR DELETE USING (true);
```

4. Copie as credenciais em Settings → API:
   - Project URL
   - anon/public key
   - service_role key

### 2️⃣ Deploy no Netlify

#### Via Interface Web:

1. Acesse [app.netlify.com](https://app.netlify.com)
2. Arraste a pasta do projeto para a área de drop
3. Aguarde o deploy
4. Vá em Site settings → Environment variables
5. Adicione:
   - `SUPABASE_URL` = sua URL do Supabase
   - `SUPABASE_ANON_KEY` = sua chave anon
   - `SUPABASE_SERVICE_KEY` = sua chave service
6. Vá em Deploys → Trigger deploy → Deploy site

#### Via CLI:

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
cd "d:/Arquivos/Projetos em andamentos/Na régua/Na Régua Beta 1.1"
netlify deploy --prod

# Configurar variáveis
netlify env:set SUPABASE_URL "SUA_URL"
netlify env:set SUPABASE_ANON_KEY "SUA_CHAVE_ANON"
netlify env:set SUPABASE_SERVICE_KEY "SUA_CHAVE_SERVICE"

# Re-deploy
netlify deploy --prod
```

### 3️⃣ Testar

1. Acesse a URL do Netlify
2. Teste cadastro de usuário
3. Teste login
4. Teste agendamento
5. Acesse painel administrativo

## 🔍 Checklist de Deploy

- [ ] Projeto Supabase criado
- [ ] Tabelas criadas no banco
- [ ] Políticas RLS configuradas
- [ ] Credenciais copiadas
- [ ] Deploy no Netlify realizado
- [ ] Variáveis de ambiente configuradas
- [ ] Site re-deployado após variáveis
- [ ] Cadastro funcionando
- [ ] Login funcionando
- [ ] Agendamento funcionando
- [ ] PWA instalável
- [ ] HTTPS ativo

## ⚠️ Problemas Comuns

**Erro 500 nas APIs:**
- Verifique se as variáveis de ambiente estão corretas
- Re-deploy o site após adicionar variáveis

**Login não funciona:**
- Confirme que usou a Service Role Key (não a anon key)
- Verifique se as políticas RLS estão criadas

**PWA não instala:**
- Certifique-se que está em HTTPS
- Verifique se manifest.json está acessível

## 📞 Suporte

Dúvidas? Entre em contato:
- Instagram: [@inova_stack](https://www.instagram.com/inova_stack)
- Email: (adicione seu email)

---

**Desenvolvido por Lucas Pedro - InovaStack**
