const { createClient } = require('@supabase/supabase-js');

// Inicializar Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async (event, context) => {
  // Configurar CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Lidar com preflight request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Apenas aceitar POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ erro: 'Método não permitido' })
    };
  }

  try {
    const { usuario, email, senha } = JSON.parse(event.body);

    // Validar dados
    if (!usuario || !email || !senha) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ erro: 'Todos os campos são obrigatórios' })
      };
    }

    // Verificar se o email já existe
    const { data: existingUser } = await supabase
      .from('usuarios')
      .select('email')
      .eq('email', email)
      .single();

    if (existingUser) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ erro: 'E-mail já cadastrado' })
      };
    }

    // Criar hash da senha usando Supabase Auth (mais seguro)
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: email,
      password: senha,
      options: {
        data: {
          nome: usuario
        }
      }
    });

    if (authError) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ erro: authError.message })
      };
    }

    // Inserir usuário na tabela customizada
    const { data, error } = await supabase
      .from('usuarios')
      .insert([
        {
          usuario: usuario,
          email: email,
          auth_user_id: authData.user.id
        }
      ])
      .select();

    if (error) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ erro: error.message })
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        sucesso: true,
        mensagem: 'Cadastro realizado com sucesso!'
      })
    };

  } catch (error) {
    console.error('Erro no cadastro:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ erro: 'Erro interno do servidor' })
    };
  }
};
