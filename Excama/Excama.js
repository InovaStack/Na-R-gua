document.addEventListener("DOMContentLoaded", () => {
  // Avaliação por estrelas
  const cortes = document.querySelectorAll(".corte");

  cortes.forEach((corte) => {
    const estrelas = corte.querySelectorAll(".estrela");
    const nomeCorte = corte.dataset.nome;

    const notaSalva = localStorage.getItem(`avaliacao_${nomeCorte}`);
    if (notaSalva) {
      marcarEstrelas(estrelas, parseInt(notaSalva));
    }

    estrelas.forEach((estrela, i) => {
      estrela.addEventListener("click", (e) => {
        e.stopPropagation(); // Não abrir modal ao avaliar
        marcarEstrelas(estrelas, i + 1);
        localStorage.setItem(`avaliacao_${nomeCorte}`, i + 1);
      });
    });

    // Abrir modal ao clicar no card de corte
    corte.addEventListener("click", () => {
      abrirModalAgendamento(nomeCorte);
    });
  });

  function abrirModalAgendamento(nomeCorte) {
    const modal = document.getElementById("modal-agendamento");
    const selectCorte = document.getElementById("corte-selecionado");

    modal.classList.remove("hidden");

    if (selectCorte && nomeCorte) {
      selectCorte.value = nomeCorte;
    }
  }

  // Fechar Modal
  const btnFecharModal = document.getElementById("fechar-modal");
  const modalContainer = document.getElementById("modal-agendamento");

  if (btnFecharModal) {
    btnFecharModal.addEventListener("click", () => {
      modalContainer.classList.add("hidden");
    });
  }

  // Fechar ao clicar fora
  window.addEventListener("click", (e) => {
    if (e.target === modalContainer) {
      modalContainer.classList.add("hidden");
    }
  });

  function marcarEstrelas(estrelas, nota) {
    estrelas.forEach((estrela, index) => {
      estrela.textContent = index < nota ? "★" : "☆";
      estrela.style.color = index < nota ? "#d4af37" : "#ccc";
    });
  }

  // Botão "Ver Mais"
  const btnVerMais = document.getElementById("btnVerMais");
  if (btnVerMais) {
    btnVerMais.addEventListener("click", function () {
      const extras = document.querySelector(".cortes-extras");
      if (extras) {
        extras.classList.remove("hidden");
        this.style.display = "none";
      }
    });
  }



  // Filtro
  const btnFiltro = document.querySelector(".btn-filtro");
  const filtroMenu = document.querySelector(".filtro-menu");
  const cortesContainer = document.querySelector(".fotos-cortes");
  const cortesArray = Array.from(cortes);

  btnFiltro.addEventListener("click", (e) => {
    e.stopPropagation();
    filtroMenu.classList.toggle("hidden");
  });

  document.addEventListener("click", () => {
    if (!filtroMenu.classList.contains("hidden")) {
      filtroMenu.classList.add("hidden");
    }
  });

  filtroMenu.querySelectorAll(".filtro-opcao").forEach(btn => {
    btn.addEventListener("click", () => {
      const filtro = btn.dataset.filtro;
      filtrarCortes(filtro);
    });
  });

  function filtrarCortes(criterio) {
    let sorted = [];

    if (criterio === "mais-barato") {
      sorted = cortesArray.sort((a, b) => parseFloat(a.dataset.preco) - parseFloat(b.dataset.preco));
    } else if (criterio === "mais-caro") {
      sorted = cortesArray.sort((a, b) => parseFloat(b.dataset.preco) - parseFloat(a.dataset.preco));
    } else if (criterio === "mais-avaliado") {
      sorted = cortesArray.sort((a, b) => parseFloat(b.dataset.avaliacao) - parseFloat(a.dataset.avaliacao));
    }

    cortesContainer.innerHTML = "";
    sorted.forEach(corte => cortesContainer.appendChild(corte));
    filtroMenu.classList.add("hidden");
  }

  // Localização
  const btnLocalizacao = document.querySelector(".btn-localizacao");
  const mapaContainer = document.getElementById("mapa-container");
  const iframeMapa = document.getElementById("iframe-mapa");
  const btnRota = document.getElementById("btn-rota");

  btnLocalizacao.addEventListener("click", () => {
    mapaContainer.classList.toggle("hidden");

    if (!mapaContainer.classList.contains("hidden")) {
      iframeMapa.src = "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3952.460623386984!2d-35.32206982499428!3d-7.846763592174682!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zN8KwNTAnNDguNCJTIDM1wrAxOScxMC4yIlc!5e0!3m2!1spt-BR!2sbr!4v1754965053927!5m2!1spt-BR!2sbr";
      btnRota.style.display = "inline-block";
    } else {
      iframeMapa.src = "";
      btnRota.style.display = "none";
    }
  });

  // AGENDAMENTO - SALVAR E VALIDAR
  const formAgendamento = document.getElementById("form-agendamento");

  formAgendamento.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = formAgendamento.data.value;
    const hora = formAgendamento.hora.value;
    const nome = formAgendamento.nome.value.trim();
    const telefone = formAgendamento.telefone.value.trim();
    const corte = formAgendamento.querySelector('#corte-selecionado').value;

    if (!nome) {
      alert("Por favor, preencha o seu nome.");
      return;
    }

    if (!data || !hora || !telefone || !corte) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    try {
      // Desabilitar botão durante o envio
      const submitBtn = formAgendamento.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Agendando...';

      // Enviar para a API
      const response = await fetch('/.netlify/functions/agendamentos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          data: data,
          hora: hora,
          nome: nome,
          telefone: telefone,
          corte: corte,
          barbearia_id: 1 // Excama Cortes
        })
      });

      const result = await response.json();

      if (response.ok && result.sucesso) {
        alert(result.mensagem || "Agendamento realizado com sucesso!");
        formAgendamento.reset();
        modalContainer.classList.add("hidden"); // Fechar modal após sucesso
      } else {
        alert(result.erro || "Erro ao realizar agendamento. Tente novamente.");
      }

      submitBtn.disabled = false;
      submitBtn.textContent = 'Agendar';

    } catch (error) {
      console.error('Erro ao agendar:', error);
      alert("Erro de conexão. Tente novamente mais tarde.");

      const submitBtn = formAgendamento.querySelector('button[type="submit"]');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Agendar';
    }
  });

  // Máscara simples para telefone
  const inputTelefone = document.getElementById("telefone");

  inputTelefone.addEventListener("input", () => {
    let telefone = inputTelefone.value.replace(/\D/g, "");

    if (telefone.length > 11) telefone = telefone.slice(0, 11);

    if (telefone.length > 6) {
      telefone = `(${telefone.slice(0, 2)})${telefone.slice(2, 7)}-${telefone.slice(7)}`;
    } else if (telefone.length > 2) {
      telefone = `(${telefone.slice(0, 2)})${telefone.slice(2)}`;
    } else if (telefone.length > 0) {
      telefone = `(${telefone}`;
    }

    inputTelefone.value = telefone;
  });
});


