-- ============================================
-- SCRIPT DE CONFIGURAÇÃO DO SUPABASE
-- Projeto: Na Régua - Plataforma de Barbearias
-- ============================================

-- ============================================
-- 1. CRIAR TABELAS
-- ============================================

-- Tabela de usuários customizada
CREATE TABLE IF NOT EXISTS usuarios (
  id BIGSERIAL PRIMARY KEY,
  usuario TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  auth_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de barbearias
CREATE TABLE IF NOT EXISTS barbearias (
  id BIGSERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  descricao TEXT,
  endereco TEXT,
  telefone TEXT,
  instagram TEXT,
  whatsapp TEXT,
  logo_url TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de agendamentos
CREATE TABLE IF NOT EXISTS agendamentos (
  id BIGSERIAL PRIMARY KEY,
  data DATE NOT NULL,
  hora TIME NOT NULL,
  nome TEXT NOT NULL,
  telefone TEXT NOT NULL,
  corte TEXT NOT NULL,
  barbearia_id BIGINT REFERENCES barbearias(id) ON DELETE CASCADE,
  usuario_id BIGINT REFERENCES usuarios(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'pendente' CHECK (status IN ('pendente', 'confirmado', 'cancelado', 'concluido')),
  observacoes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de avaliações
CREATE TABLE IF NOT EXISTS avaliacoes (
  id BIGSERIAL PRIMARY KEY,
  barbearia_id BIGINT REFERENCES barbearias(id) ON DELETE CASCADE,
  usuario_id BIGINT REFERENCES usuarios(id) ON DELETE CASCADE,
  corte_nome TEXT NOT NULL,
  nota INTEGER CHECK (nota >= 1 AND nota <= 5),
  comentario TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(barbearia_id, usuario_id, corte_nome)
);

-- ============================================
-- 2. CRIAR ÍNDICES PARA PERFORMANCE
-- ============================================

CREATE INDEX IF NOT EXISTS idx_usuarios_email ON usuarios(email);
CREATE INDEX IF NOT EXISTS idx_usuarios_auth_user_id ON usuarios(auth_user_id);
CREATE INDEX IF NOT EXISTS idx_agendamentos_data ON agendamentos(data);
CREATE INDEX IF NOT EXISTS idx_agendamentos_barbearia ON agendamentos(barbearia_id);
CREATE INDEX IF NOT EXISTS idx_agendamentos_usuario ON agendamentos(usuario_id);
CREATE INDEX IF NOT EXISTS idx_avaliacoes_barbearia ON avaliacoes(barbearia_id);

-- ============================================
-- 3. HABILITAR ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE barbearias ENABLE ROW LEVEL SECURITY;
ALTER TABLE agendamentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE avaliacoes ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 4. CRIAR POLÍTICAS DE ACESSO
-- ============================================

-- Políticas para USUARIOS
DROP POLICY IF EXISTS "usuarios_select_own" ON usuarios;
CREATE POLICY "usuarios_select_own" 
  ON usuarios FOR SELECT 
  USING (auth.uid() = auth_user_id);

DROP POLICY IF EXISTS "usuarios_insert" ON usuarios;
CREATE POLICY "usuarios_insert" 
  ON usuarios FOR INSERT 
  WITH CHECK (true);

DROP POLICY IF EXISTS "usuarios_update_own" ON usuarios;
CREATE POLICY "usuarios_update_own" 
  ON usuarios FOR UPDATE 
  USING (auth.uid() = auth_user_id);

-- Políticas para BARBEARIAS
DROP POLICY IF EXISTS "barbearias_select_all" ON barbearias;
CREATE POLICY "barbearias_select_all" 
  ON barbearias FOR SELECT 
  USING (ativo = true);

DROP POLICY IF EXISTS "barbearias_insert_admin" ON barbearias;
CREATE POLICY "barbearias_insert_admin" 
  ON barbearias FOR INSERT 
  WITH CHECK (true); -- Ajustar para admin apenas

-- Políticas para AGENDAMENTOS
DROP POLICY IF EXISTS "agendamentos_select_all" ON agendamentos;
CREATE POLICY "agendamentos_select_all" 
  ON agendamentos FOR SELECT 
  USING (true);

DROP POLICY IF EXISTS "agendamentos_insert_all" ON agendamentos;
CREATE POLICY "agendamentos_insert_all" 
  ON agendamentos FOR INSERT 
  WITH CHECK (true);

DROP POLICY IF EXISTS "agendamentos_update_own" ON agendamentos;
CREATE POLICY "agendamentos_update_own" 
  ON agendamentos FOR UPDATE 
  USING (true); -- Ajustar para permitir apenas dono ou admin

DROP POLICY IF EXISTS "agendamentos_delete_all" ON agendamentos;
CREATE POLICY "agendamentos_delete_all" 
  ON agendamentos FOR DELETE 
  USING (true); -- Ajustar para admin apenas

-- Políticas para AVALIACOES
DROP POLICY IF EXISTS "avaliacoes_select_all" ON avaliacoes;
CREATE POLICY "avaliacoes_select_all" 
  ON avaliacoes FOR SELECT 
  USING (true);

DROP POLICY IF EXISTS "avaliacoes_insert_authenticated" ON avaliacoes;
CREATE POLICY "avaliacoes_insert_authenticated" 
  ON avaliacoes FOR INSERT 
  WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "avaliacoes_update_own" ON avaliacoes;
CREATE POLICY "avaliacoes_update_own" 
  ON avaliacoes FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM usuarios 
      WHERE usuarios.id = avaliacoes.usuario_id 
      AND usuarios.auth_user_id = auth.uid()
    )
  );

-- ============================================
-- 5. CRIAR TRIGGERS PARA UPDATED_AT
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_usuarios_updated_at ON usuarios;
CREATE TRIGGER update_usuarios_updated_at
  BEFORE UPDATE ON usuarios
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_barbearias_updated_at ON barbearias;
CREATE TRIGGER update_barbearias_updated_at
  BEFORE UPDATE ON barbearias
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_agendamentos_updated_at ON agendamentos;
CREATE TRIGGER update_agendamentos_updated_at
  BEFORE UPDATE ON agendamentos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_avaliacoes_updated_at ON avaliacoes;
CREATE TRIGGER update_avaliacoes_updated_at
  BEFORE UPDATE ON avaliacoes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 6. INSERIR DADOS INICIAIS
-- ============================================

-- Inserir barbearia Excama Cortes
INSERT INTO barbearias (nome, descricao, endereco, telefone, instagram, whatsapp, latitude, longitude)
VALUES (
  'Excama Cortes',
  'No Excama a régua é certa, só os brabo passam aqui!',
  'Loteamento Prolar N°893 Rua do Cruzeiro',
  '(81) 98765-4321',
  'https://www.instagram.com/excama_cortes',
  'https://chat.whatsapp.com/FI7RHEkQnDULhDTgDh0CDf',
  -7.846764,
  -35.319206
)
ON CONFLICT DO NOTHING;

-- ============================================
-- 7. CRIAR VIEWS ÚTEIS
-- ============================================

-- View de agendamentos com informações da barbearia
CREATE OR REPLACE VIEW vw_agendamentos_completos AS
SELECT 
  a.id,
  a.data,
  a.hora,
  a.nome,
  a.telefone,
  a.corte,
  a.status,
  a.observacoes,
  b.nome AS barbearia_nome,
  b.endereco AS barbearia_endereco,
  a.created_at
FROM agendamentos a
LEFT JOIN barbearias b ON a.barbearia_id = b.id
ORDER BY a.data DESC, a.hora DESC;

-- View de estatísticas de barbearias
CREATE OR REPLACE VIEW vw_estatisticas_barbearias AS
SELECT 
  b.id,
  b.nome,
  COUNT(DISTINCT a.id) AS total_agendamentos,
  COUNT(DISTINCT av.id) AS total_avaliacoes,
  ROUND(AVG(av.nota), 2) AS media_avaliacoes
FROM barbearias b
LEFT JOIN agendamentos a ON b.id = a.barbearia_id
LEFT JOIN avaliacoes av ON b.id = av.barbearia_id
GROUP BY b.id, b.nome;

-- ============================================
-- 8. COMENTÁRIOS NAS TABELAS
-- ============================================

COMMENT ON TABLE usuarios IS 'Tabela de usuários do sistema';
COMMENT ON TABLE barbearias IS 'Tabela de barbearias cadastradas';
COMMENT ON TABLE agendamentos IS 'Tabela de agendamentos de cortes';
COMMENT ON TABLE avaliacoes IS 'Tabela de avaliações de cortes';

-- ============================================
-- FIM DO SCRIPT
-- ============================================

-- Para verificar se tudo foi criado corretamente:
SELECT 
  'Tabelas criadas' AS status,
  COUNT(*) AS total
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN ('usuarios', 'barbearias', 'agendamentos', 'avaliacoes');
