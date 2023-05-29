const TelegramBot = require("node-telegram-bot-api");
const token = "5976193678:AAEmFDt9dSR3WsXZot34_G_A8XXdoOennEU";
const openaiApiKey = "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";
const bot = new TelegramBot(token, { polling: true });

// Définit les commandes pour le bot
bot.setMyCommands([
  { command: 'code', description: 'Obtenir une réponse à une question de code' },
  { command: 'help', description: 'Afficher l\'aide' }
]);

// Événement de réception de message
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;

  // Vérifie si le message commence par "/code"
  if (messageText.startsWith("/code")) {
    // Récupère la question de l'utilisateur
    const question = messageText.slice(6);
    b = await getOpenaiResponse(question);
    bot.sendMessage(chatId, b);
    // Envoie la question de l'utilisateur en réponse
  }
});

async function getOpenaiResponse(message) {
  const url = "https://api.openai.com/v1/chat/completions";
  const body = {
    // Il s'agit du modele du language OpenAI utilise
    model: "gpt-3.5-turbo",
    // le message de l'utilisateur
    messages: [{ role: "user", content: message }],

    max_tokens: 4000,
    //Il définit le nombre maximum de tokens (unités de texte) qui doivent être générés dans la réponse.
    temperature: 0.5,
    // Compris entre 0 et 1, il definit le niveau de pertinence et de originalite des reponses
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  };
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${openaiApiKey}`,
  };

  const response = await fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
  });

  // La fonction renvoie ensuite la réponse JSON de l'API
  // après l'avoir convertie en objet JavaScript à l'aide de la méthode json().

  let result = "";
  let data = await response.json();
  if (response.status == 200) {
    for (element of data.choices) {
      result += element.message["content"];
    }
    return result.trim();
  } else {
    return "System Error";
  }
}
