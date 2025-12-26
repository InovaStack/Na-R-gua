# 🚀 Flowcorte - Plataforma de Agendamento para Barbearias

[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR-BADGE-ID/deploy-status)](https://app.netlify.com/sites/YOUR-SITE-NAME/deploys)

## 📋 Sobre o Projeto

**Flowcorte** é uma plataforma web moderna para agregação e gerenciamento de barbearias, permitindo que clientes visualizem serviços, façam agendamentos e avaliem cortes.

### ✨ Funcionalidades

- 🔐 Sistema de autenticação (Login/Cadastro)
- 📅 Agendamento online de cortes
- ⭐ Sistema de avaliações por estrelas
- 🗺️ Integração com Google Maps
- 📱 PWA (Progressive Web App) - Instalável
- 🔔 Sistema de notificações (em desenvolvimento)
- 👨‍💼 Painel administrativo
- 🎨 Design responsivo e moderno

## 🛠️ Tecnologias

### Frontend
- HTML5, CSS3, JavaScript (Vanilla)
- Font Awesome 6.4.0
- Google Fonts (Barlow)
- Service Workers (PWA)

### Backend
- Netlify Functions (Serverless)
- Supabase (Database & Auth)
- Node.js

## 🚀 Deploy no Netlify

### Pré-requisitos

1. Conta no [Netlify](https://www.netlify.com/)
2. Conta no [Supabase](https://supabase.com/)
3. Git instalado

### Passo 1: Configurar Supabase

1. Crie um novo projeto no Supabase
2. Execute as seguintes queries SQL no SQL Editor:

```sql
-- Criar tabela de usuários
CREATE TABLE usuarios (
  id BIGSERIAL PRIMARY KEY,
  usuario TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  auth_user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de agendamentos
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

-- Habilitar RLS (Row Level Security)
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE agendamentos ENABLE ROW LEVEL SECURITY;

-- Políticas de acesso para usuários
CREATE POLICY "Usuários podem ver seus próprios dados"
  ON usuarios FOR SELECT
  USING (auth.uid() = auth_user_id);

CREATE POLICY "Permitir inserção de novos usuários"
  ON usuarios FOR INSERT
  WITH CHECK (true);

-- Políticas de acesso para agendamentos
CREATE POLICY "Todos podem ver agendamentos"
  ON agendamentos FOR SELECT
  USING (true);

CREATE POLICY "Todos podem criar agendamentos"
  ON agendamentos FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Todos podem deletar agendamentos"
  ON agendamentos FOR DELETE
  USING (true);
```

3. Copie as credenciais:
   - Project URL (ex: `https://xxxxx.supabase.co`)
   - Anon/Public Key
   - Service Role Key (⚠️ Mantenha em segredo!)

### Passo 2: Deploy no Netlify

#### Opção A: Deploy via Git (Recomendado)

1. **Inicialize o repositório Git:**
```bash
git init
git add .
git commit -m "Initial commit"
```

2. **Crie um repositório no GitHub/GitLab**

3. **Conecte ao repositório:**
```bash
git remote add origin https://github.com/seu-usuario/flowcorte.git
git branch -M main
git push -u origin main
```

4. **No Netlify:**
   - Clique em "Add new site" → "Import an existing project"
   - Conecte seu repositório
   - Configure:
     - **Build command:** (deixe vazio)
     - **Publish directory:** `.`
     - **Functions directory:** `netlify/functions`

5. **Adicione as variáveis de ambiente:**
   - Vá em "Site settings" → "Environment variables"
   - Adicione:
     ```
     SUPABASE_URL=https://xxxxx.supabase.co
     SUPABASE_ANON_KEY=sua-chave-anon
     SUPABASE_SERVICE_KEY=sua-chave-service
     ```

6. **Deploy!**
   - Clique em "Deploy site"

#### Opção B: Deploy via Netlify CLI

1. **Instale o Netlify CLI:**
```bash
npm install -g netlify-cli
```

2. **Faça login:**
```bash
netlify login
```

3. **Inicialize o site:**
```bash
netlify init
```

4. **Configure as variáveis de ambiente:**
```bash
netlify env:set SUPABASE_URL "https://xxxxx.supabase.co"
netlify env:set SUPABASE_ANON_KEY "sua-chave-anon"
netlify env:set SUPABASE_SERVICE_KEY "sua-chave-service"
```

5. **Deploy:**
```bash
netlify deploy --prod
```

### Passo 3: Configurações Pós-Deploy

1. **Configure domínio customizado** (opcional)
   - Site settings → Domain management

2. **Habilite HTTPS**
   - Automático no Netlify

3. **Configure redirects** (já configurado em `netlify.toml`)

4. **Teste as funcionalidades:**
   - ✅ Cadastro de usuário
   - ✅ Login
   - ✅ Agendamento
   - ✅ Painel administrativo

## 🔧 Desenvolvimento Local

### Com Netlify Dev (Recomendado)

```bash
# Instalar dependências
npm install

# Criar arquivo .env
cp .env.example .env
# Edite .env com suas credenciais do Supabase

# Iniciar servidor de desenvolvimento
npm run dev
```

O site estará disponível em `http://localhost:8888`

### Sem Netlify Dev

Abra `index.html` diretamente no navegador. 

⚠️ **Nota:** As Netlify Functions não funcionarão localmente sem o Netlify Dev.

## 📁 Estrutura do Projeto

```
Flowcorte Beta 1.1/
├── netlify/
│   └── functions/          # Serverless functions
│       ├── cadastrar.js    # API de cadastro
│       ├── login.js        # API de login
│       └── agendamentos.js # API de agendamentos
├── Excama/                 # Módulo da barbearia Excama
├── admin/                  # Painel administrativo
├── pages/                  # Páginas secundárias
├── css/                    # Estilos globais
├── js/                     # Scripts principais
├── icons/                  # Ícones PWA
├── index.html              # Página inicial
├── login.html              # Login/Cadastro
├── manifest.json           # PWA manifest
├── netlify.toml            # Configuração Netlify
└── package.json            # Dependências
```

## 🔐 Segurança

- ✅ Senhas criptografadas com Supabase Auth
- ✅ HTTPS obrigatório
- ✅ CORS configurado
- ✅ Variáveis de ambiente protegidas
- ✅ RLS (Row Level Security) no Supabase

## 🐛 Troubleshooting

### Erro: "Failed to fetch"
- Verifique se as variáveis de ambiente estão configuradas
- Confirme que as Netlify Functions estão deployadas

### Erro: "Invalid API key"
- Verifique se copiou as chaves corretas do Supabase
- Certifique-se de usar a Service Role Key nas functions

### PWA não instala
- Verifique se o site está em HTTPS
- Confirme que `manifest.json` está acessível
- Verifique o Service Worker no DevTools

## 📝 Licença

Desenvolvido por **Lucas Pedro - InovaStack**

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📞 Suporte

Para suporte, entre em contato via Instagram: [@inova_stack](https://www.instagram.com/inova_stack)

---

**Versão:** 1.1.0  
**Última atualização:** Dezembro 2025
