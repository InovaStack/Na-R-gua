// Configuração do Supabase para uso no frontend
// Este arquivo pode ser usado para inicializar o cliente Supabase

const SUPABASE_CONFIG = {
    // Estas variáveis serão substituídas em produção
    // No Netlify, use variáveis de ambiente
    url: process.env.SUPABASE_URL || 'https://seu-projeto.supabase.co',
    anonKey: process.env.SUPABASE_ANON_KEY || 'sua-chave-anon-aqui'
};

// Função para criar cliente Supabase (se necessário no futuro)
// Descomente se quiser usar Supabase diretamente no frontend
/*
async function createSupabaseClient() {
  const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm');
  return createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
}
*/

// Exportar configuração
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SUPABASE_CONFIG;
}
