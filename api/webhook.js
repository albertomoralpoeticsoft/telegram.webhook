// https://vercel.com/alberto-morals-projects/telegram-webhook
// 
export default async function handler(req, res) {

  if (req.method !== 'POST') {

    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  
  const TELEGRAM_SECRET = 'JsAU80987654';
  const receivedSecret = req.headers['x-telegram-bot-api-secret-token'];

  if (receivedSecret !== TELEGRAM_SECRET) {

    return res.status(403).json({ error: 'Invalid secret token' });
  }

  try {
    
    const response = await fetch('https://poeticsoft.com/wp-json/poeticsoft/telegram/webhook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'TelegramProxyBot/1.0'
      },
      body: JSON.stringify(req.body),
    });

    const result = await response.text();
    res.status(200).send('Enviado a WP: ' + result);

  } catch (err) {

    console.error('Error enviando a WP:', err);
    res.status(500).send('Failed to forward');
  }
}
