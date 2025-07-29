interface Architecture {
  modality: string;
  input_modalities: string[];
  output_modalities: string[];
  tokenizer: string;
  instruct_type: string | null;
}

interface Pricing {
  prompt: string;
  completion: string;
  request: string;
  image: string;
  web_search: string;
  internal_reasoning: string;
}

interface TopProvider {
  context_length: number;
  max_completion_tokens: number | null;
  is_moderated: boolean;
}

interface Model {
  id: string;
  name: string;
  created: number;
  description: string;
  context_length: number;
  architecture: Architecture;
  pricing: Pricing;
  top_provider: TopProvider;
  per_request_limits: null;
  supported_parameters: string[];
}

const getModels = async (): Promise<Model[]> => {
  const response = await fetch("https://openrouter.ai/api/v1/models", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  return data.data;
};

export { getModels };
