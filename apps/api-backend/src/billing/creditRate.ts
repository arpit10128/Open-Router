const RATE: Record<string, number> = {
  "meta-llama/Llama-3.1-8B-Instruct:novita": 0.3,
  "openai/gpt-oss-120b": 1.5,
  "google/gemini-2.5-flash": 0.7,
};

export function getRate(model: string) {
  if (model in RATE) {
    return RATE[model as keyof typeof RATE];
  } else {
    throw new Error(
      "Invalid model. We don't support this model yet.",
    );
  }
}
