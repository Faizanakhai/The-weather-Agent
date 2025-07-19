export const streamWeatherReply = async (query, onChunk, onMeta) => {
  try {
    const response = await fetch(
      "https://millions-screeching-vultur.mastra.cloud/api/agents/weatherAgent/stream",
      {
        method: "POST",
        headers: {
          "x-mastra-dev-playground": "true",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [{ role: "user", content: query }],
          runId: "weatherAgent",
          maxRetries: 2,
          maxSteps: 5,
          temperature: 0.5,
          topP: 1,
          runtimeContext: {},
          threadId: 2,
          resourceId: "weatherAgent",
        }),
      }
    );
    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split(/\r?\n/);
      buffer = lines.pop();

      for (let line of lines) {
        if (!line.trim()) continue;
        const delimiterIndex = line.indexOf(":");
        if (delimiterIndex === -1) continue;

        const prefix = line.substring(0, delimiterIndex);
        const dataPart = line.substring(delimiterIndex + 1);

        try {
          const parsedData = JSON.parse(dataPart);
          if (prefix === "0") {
            const cleaned =
              typeof parsedData === "string"
                ? parsedData.replace(/\*\*(.*?)\*\*/g, "$1")
                : parsedData?.text || "";
            onChunk?.(cleaned);
          } else {
            onMeta?.({ prefix, data: parsedData });
          }
        } catch (err) {
          console.warn("Skipped malformed line:", err);
        }
      }
    }
  } catch (error) {
    console.error("Stream error:", error);
  }
};
