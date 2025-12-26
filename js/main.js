const btnLogin = document.querySelector('.btn-login');
const nomeUsuarioDiv = document.getElementById('nomeUsuario');

function atualizarInterface() {
  const usuario = localStorage.getItem('nomeUsuario');

  if (usuario) {
    nomeUsuarioDiv.textContent = `Olá, ${usuario}!`;
    nomeUsuarioDiv.style.display = 'block';
    btnLogin.querySelector('span').textContent = 'Sair';
  } else {
    nomeUsuarioDiv.textContent = '';
    nomeUsuarioDiv.style.display = 'none';
    btnLogin.querySelector('span').textContent = 'Login';
  }
}

btnLogin.addEventListener('click', (e) => {
  e.preventDefault();
  const usuario = localStorage.getItem('nomeUsuario');

  if (usuario) {
    // Logout
    localStorage.removeItem('nomeUsuario');
    atualizarInterface();
  } else {
    // Redirecionar para página de login
    window.location.href = 'login.html'; // ajuste o caminho se precisar
  }
});

// Atualiza interface ao carregar a página
atualizarInterface();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registrado com sucesso:', registration);
      })
      .catch(error => {
        console.log('Falha ao registrar Service Worker:', error);
      });
  });
}

