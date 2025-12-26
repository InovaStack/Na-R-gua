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
        const { email, senha } = JSON.parse(event.body);

        // Validar dados
        if (!email || !senha) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ erro: 'Email e senha são obrigatórios' })
            };
        }

        // Autenticar com Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email: email,
            password: senha
        });

        if (authError) {
            return {
                statusCode: 401,
                headers,
                body: JSON.stringify({ erro: 'Email ou senha incorretos' })
            };
        }

        // Buscar dados do usuário na tabela customizada
        const { data: userData, error: userError } = await supabase
            .from('usuarios')
            .select('usuario, email')
            .eq('auth_user_id', authData.user.id)
            .single();

        if (userError || !userData) {
            return {
                statusCode: 404,
                headers,
                body: JSON.stringify({ erro: 'Usuário não encontrado' })
            };
        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                sucesso: true,
                nome: userData.usuario,
                email: userData.email,
                token: authData.session.access_token
            })
        };

    } catch (error) {
        console.error('Erro no login:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ erro: 'Erro interno do servidor' })
        };
    }
};
