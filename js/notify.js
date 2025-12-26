
// notify.js - Sistema de notificações local (simulação sem Firebase)

// Função para disparar notificações do navegador
function showNotification(title, message) {
    if (Notification.permission === "granted") {
        new Notification(title, {
            body: message,
            icon: '/icons/web-app-manifest-192x192.png'
        });
    }
}

// Solicita permissão para notificações
function requestNotificationPermission() {
    if ("Notification" in window) {
        Notification.requestPermission().then(permission => {
            console.log("Permissão de notificação:", permission);
        });
    }
}

// Simula um novo agendamento e dispara notificação
function simulateNewAppointment(cliente, horario) {
    showNotification("Novo agendamento!", cliente + " marcou um corte para " + horario);
}

// Exemplo: verificar a cada 10 segundos se há novos agendamentos (simulação)
setInterval(() => {
    // Aqui futuramente será feita a verificação real no backend
    // Por enquanto vamos simular 1 notificação a cada 30s
    if (Math.random() > 0.8) {
        simulateNewAppointment("Cliente Teste", "14:30");
    }
}, 10000);

// Inicia solicitação de permissão ao carregar a página
document.addEventListener("DOMContentLoaded", requestNotificationPermission);
