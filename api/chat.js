export default async function handler(req, res) {

  try {

    const userMessage = req.body.messages?.slice(-1)[0]?.content || "";

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-3-haiku-20240307",
        max_tokens: 800,
        messages: [
          {
            role: "user",
            content: userMessage
          }
        ]
      })
    });

    const data = await response.json();

    const text = data?.content?.[0]?.text || "Não consegui gerar resposta.";

    res.status(200).json({
      content: [
        { text }
      ]
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      content: [
        { text: "Erro ao conectar com a IA." }
      ]
    });
  }

}
