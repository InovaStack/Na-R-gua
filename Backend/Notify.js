// notify.js
document.addEventListener("DOMContentLoaded", () => {
    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    }

    // Envia uma notificação de teste a cada 30 segundos
    setInterval(() => {
        if (Notification.permission === "granted") {
            new Notification("🔔 Novo agendamento disponível!", {
                body: "Você recebeu uma nova solicitação.",
                icon: "/icons/web-app-manifest-192x192.png"
            });
        }
    }, 30000); // 30 segundos
});
