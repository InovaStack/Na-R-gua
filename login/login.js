// === Alternar abas entre Login e Cadastro ===
const tabLogin = document.getElementById('tab-login');
const tabCadastro = document.getElementById('tab-cadastro');
const formLogin = document.getElementById('form-login');
const formCadastro = document.getElementById('form-cadastro');

// Quando clica na aba "Login"
tabLogin.addEventListener('click', () => {
  tabLogin.classList.add('active');
  tabCadastro.classList.remove('active');
  formLogin.classList.add('active');
  formCadastro.classList.remove('active');
});

// Quando clica na aba "Cadastro"
tabCadastro.addEventListener('click', () => {
  tabCadastro.classList.add('active');
  tabLogin.classList.remove('active');
  formCadastro.classList.add('active');
  formLogin.classList.remove('active');
});

// === Função auxiliar para exibir mensagens ===
function showMessage(message, isError = false) {
  const alertType = isError ? 'Erro' : 'Sucesso';
  alert(`${alertType}: ${message}`);
}

// === Envio do formulário de Login ===
formLogin.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email-login').value.trim();
  const senha = document.getElementById('senha-login').value.trim();

  // Validação básica
  if (!email || !senha) {
    showMessage('Por favor, preencha todos os campos.', true);
    return;
  }

  try {
    // Desabilitar botão durante o request
    const submitBtn = formLogin.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Entrando...';

    // Fazer request para a Netlify Function
    const response = await fetch('/.netlify/functions/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, senha })
    });

    const data = await response.json();

    if (response.ok && data.sucesso) {
      // Salvar dados do usuário no localStorage
      localStorage.setItem('nomeUsuario', data.nome);
      localStorage.setItem('userEmail', data.email);
      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }

      showMessage('Login realizado com sucesso!');

      // Redirecionar para página principal
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 500);
    } else {
      showMessage(data.erro || 'Erro ao fazer login', true);
      submitBtn.disabled = false;
      submitBtn.textContent = 'Entrar';
    }
  } catch (error) {
    console.error('Erro no login:', error);
    showMessage('Erro de conexão. Tente novamente.', true);

    const submitBtn = formLogin.querySelector('button[type="submit"]');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Entrar';
  }
});

// === Envio do formulário de Cadastro ===
formCadastro.addEventListener('submit', async (e) => {
  e.preventDefault();

  const usuario = document.getElementById('usuario-cadastro').value.trim();
  const email = document.getElementById('email-cadastro').value.trim();
  const senha = document.getElementById('senha-cadastro').value.trim();

  // Validação básica
  if (!usuario || !email || !senha) {
    showMessage('Por favor, preencha todos os campos.', true);
    return;
  }

  // Validação de senha
  if (senha.length < 6) {
    showMessage('A senha deve ter pelo menos 6 caracteres.', true);
    return;
  }

  try {
    // Desabilitar botão durante o request
    const submitBtn = formCadastro.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Cadastrando...';

    // Fazer request para a Netlify Function
    const response = await fetch('/.netlify/functions/cadastrar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ usuario, email, senha })
    });

    const data = await response.json();

    if (response.ok && data.sucesso) {
      showMessage(data.mensagem || 'Cadastro realizado com sucesso!');

      // Salvar nome do usuário
      localStorage.setItem('nomeUsuario', usuario);
      localStorage.setItem('userEmail', email);

      // Redirecionar para página principal
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 500);
    } else {
      showMessage(data.erro || 'Erro ao fazer cadastro', true);
      submitBtn.disabled = false;
      submitBtn.textContent = 'Cadastrar';
    }
  } catch (error) {
    console.error('Erro no cadastro:', error);
    showMessage('Erro de conexão. Tente novamente.', true);

    const submitBtn = formCadastro.querySelector('button[type="submit"]');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Cadastrar';
  }
});
