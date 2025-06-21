export async function fetchChatResponse(userMessage: string) {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "mistralai/mixtral-8x7b", // You can change to gpt-3.5 if needed
      messages: [{ role: "user", content: userMessage }],
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || "OpenRouter API call failed.");
  }

  return data.choices?.[0]?.message?.content || "No response from AI.";
}
