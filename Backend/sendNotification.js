const admin = require('firebase-admin');
const fs = require('fs');

// Caminho para o arquivo .json da conta de serviço
const serviceAccount = require('./na-regua-24889-firebase-adminsdk-fbsvc-377d00ba29.json');

// Inicializa o Firebase Admin com a conta de serviço
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// 🔔 Token do dispositivo do admin (você pega esse token no navegador quando ele entra)
const registrationToken = 'COLE_AQUI_O_TOKEN_DO_ADMIN';

const message = {
  notification: {
    title: 'Novo agendamento na barbearia!',
    body: 'João marcou um corte para 14:30.',
  },
  token: registrationToken,
  webpush: {
    notification: {
      icon: 'https://seusite.com/icons/icon-192x192.png',
      click_action: 'https://seusite.com/admin.html' // redirecionamento ao clicar
    }
  }
};

// Envia a notificação
admin.messaging().send(message)
  .then((response) => {
    console.log('✅ Notificação enviada com sucesso:', response);
  })
  .catch((error) => {
    console.error('❌ Erro ao enviar notificação:', error);
  });
