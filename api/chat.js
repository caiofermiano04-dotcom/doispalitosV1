export default async function handler(req, res) {
  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();

    // extrai o texto corretamente
    const reply = data.content?.[0]?.text || "Erro ao gerar resposta";

    res.status(200).json({
      content: [{ text: reply }]
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao conectar com Claude" });
  }
}
