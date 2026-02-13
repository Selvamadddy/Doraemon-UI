
export default async function SelHostLLMGetResponse(input: string): Promise<string> {
    let response = await fetch("/selfhostllm/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "user_id": "123",
            "message": input
        }
        )
    });

    // Extract the assistant message with reasoning_details and save it to the response variable
    const result = await response.json();
    const reply: string = result?.response ?? "Failed to reply";
    return reply;
}