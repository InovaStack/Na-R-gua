
============================================
📌 Guia Rápido - Sistema de Notificações
============================================

1️⃣ Como usar
----------------------------
- Suba o site para seu servidor normalmente.
- Acesse as páginas:
    • /painel.html
    • /Admin.html
- O navegador pedirá permissão para exibir notificações. Clique em **Permitir**.

2️⃣ Como funciona
----------------------------
- O sistema está configurado para simular novos agendamentos a cada ~30s.
- Notificações aparecem no canto inferior direito do navegador (desktop).
- Este é um sistema de teste, sem integração com backend real ainda.

3️⃣ Service Worker
----------------------------
- Arquivo: /service-worker.js
- Responsável por exibir notificações mesmo com a aba em segundo plano.

4️⃣ Personalização
----------------------------
- Ícone da notificação: /icons/web-app-manifest-192x192.png
- Intervalo de simulação: ajuste em /js/notify.js (linha com 'setInterval').

5️⃣ Futuro (Integração Firebase)
----------------------------
- Para usar notificações reais via Firebase Cloud Messaging (FCM):
    a) Crie um projeto no Firebase.
    b) Baixe a chave de conta de serviço (.json).
    c) Configure seu backend para enviar mensagens push usando o arquivo sendNotification.js.
    d) Substitua a lógica de simulação em notify.js por chamadas ao servidor.

6️⃣ Suporte
----------------------------
- Qualquer dúvida, basta reabrir o projeto e inserir a chave do Firebase para ativar as notificações reais.
- O sistema já está pronto para receber essa atualização.
