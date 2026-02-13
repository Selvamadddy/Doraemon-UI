export default async function GetResponse(input: string): Promise<string> {
    const response = await fetch("/llmapi/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: "deepseek/deepseek-r1-0528:free",
            messages: [
                {
                    role: "user",
                    content: input
                }
            ],
            reasoning: { enabled: true }
        })
    });

    const result = await response.json();
    const reply: string =
        result?.choices?.[0]?.message?.content ?? "Failed to reply";

    return reply;
}
