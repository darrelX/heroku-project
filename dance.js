
const openaiApiKey = "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";

// const token = "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";

// const openaiApiKey = "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";
let b = async function getOpenaiResponse() {
  const url = "https://api.openai.com/v1/chat/completions";
  const body = {
// Il s'agit du modele du language OpenAI utilise
    model: "gpt-3.5-turbo",
// le message de l'utilisateur
    messages: [{"role" : "user", "content" : "Pourquoi la mere est salee?"}],

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
    a = `'ai: ${result.trim()}'`;
    return a;
  }
  else{
    return 'System Error';
  }

}

console.log(b);