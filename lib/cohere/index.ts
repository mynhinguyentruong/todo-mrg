import cohere from 'cohere-ai'

cohere.init(process.env.COHERE_TRIAL_KEY as string); // This is your trial API key

export async function generate_text(prompt: string): Promise<string> {
  const response = await cohere.generate({
    model: 'command',
    prompt: `Write a todo list with a goal to "${prompt}". Each task start with -`,
    max_tokens: 300,
    temperature: 0.9,
    k: 0,
    stop_sequences: [],
    return_likelihoods: 'NONE'
  });
  console.log(`Prediction: ${response.body.generations[0].text}`);

  return response.body.generations[0].text
};
