const { createClient } = require('@supabase/supabase-js');

// Inicializar Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async (event, context) => {
    // Configurar CORS
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
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

    try {
        // GET - Listar todos os agendamentos
        if (event.httpMethod === 'GET') {
            const { data, error } = await supabase
                .from('agendamentos')
                .select('*')
                .order('data', { ascending: true })
                .order('hora', { ascending: true });

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
                body: JSON.stringify({ agendamentos: data })
            };
        }

        // POST - Criar novo agendamento
        if (event.httpMethod === 'POST') {
            const { data: agendamentoData, hora, nome, telefone, corte, barbearia_id } = JSON.parse(event.body);

            // Validar dados
            if (!agendamentoData || !hora || !nome || !telefone || !corte) {
                return {
                    statusCode: 400,
                    headers,
                    body: JSON.stringify({ erro: 'Todos os campos são obrigatórios' })
                };
            }

            // Inserir agendamento
            const { data, error } = await supabase
                .from('agendamentos')
                .insert([
                    {
                        data: agendamentoData,
                        hora: hora,
                        nome: nome,
                        telefone: telefone,
                        corte: corte,
                        barbearia_id: barbearia_id || 1 // Default para Excama
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
                statusCode: 201,
                headers,
                body: JSON.stringify({
                    sucesso: true,
                    agendamento: data[0],
                    mensagem: 'Agendamento realizado com sucesso!'
                })
            };
        }

        // DELETE - Remover agendamento
        if (event.httpMethod === 'DELETE') {
            const { id } = JSON.parse(event.body);

            if (!id) {
                return {
                    statusCode: 400,
                    headers,
                    body: JSON.stringify({ erro: 'ID do agendamento é obrigatório' })
                };
            }

            const { error } = await supabase
                .from('agendamentos')
                .delete()
                .eq('id', id);

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
                    mensagem: 'Agendamento removido com sucesso!'
                })
            };
        }

        // Método não suportado
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ erro: 'Método não permitido' })
        };

    } catch (error) {
        console.error('Erro na função agendamentos:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ erro: 'Erro interno do servidor' })
        };
    }
};
