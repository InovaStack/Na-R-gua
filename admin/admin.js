document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const redirectLink = document.getElementById("redirectLink");

  // Configura o usuário autorizado (coloque o email e senha que deseja permitir)
  const usuarioAutorizado = {
    email: "lucaspedro@gmail.com",
    senha: "senha123"
  };

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const emailInput = document.getElementById("username").value.trim();
    const senhaInput = document.getElementById("password").value;

    if (
      emailInput.toLowerCase() === usuarioAutorizado.email.toLowerCase() &&
      senhaInput === usuarioAutorizado.senha
    ) {
      // Login autorizado
      alert("Login efetuado com sucesso!");
      redirectLink.click(); // redireciona para a página painel.html
    } else {
      alert("Usuário ou senha inválidos.");
    }
  });
});


 src="/js/notify.js"
    
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js')
          .then(reg => console.log('✅ Service Worker registrado:', reg.scope))
          .catch(err => console.error('❌ Erro no Service Worker:', err));
      }



document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  const usuarioAutorizado = {
    email: "lucaspedro@gmail.com",
    senha: "senha123"
  };

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const emailInput = document.getElementById("username").value.trim();
    const senhaInput = document.getElementById("password").value;

    if (
      emailInput.toLowerCase() === usuarioAutorizado.email.toLowerCase() &&
      senhaInput === usuarioAutorizado.senha
    ) {
      alert("Login efetuado com sucesso!");
      window.location.href = "painel.html";
    } else {
      alert("Usuário ou senha inválidos.");
    }
  });
});




