import OpenAI from 'openai';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

export const openai = new OpenAI({
  apiKey: apiKey || '',
  dangerouslyAllowBrowser: true // This is needed to run OpenAI from Vite frontend
});

export const generateThumbnailOpenAI = async (prompt: string, format: '16:9' | '9:16' | '1:1'): Promise<string> => {
  if (!apiKey) {
    throw new Error("La clé API OpenAI n'est pas configurée dans le fichier .env");
  }

  // DALL-E 3 supporte principalement 1024x1024, 1024x1792, et 1792x1024.
  // Mapping the requested format to DALL-E 3 compatible sizes.
  let size: '1024x1024' | '1024x1792' | '1792x1024' = '1792x1024'; // Default 16:9 equivalent
  
  if (format === '9:16') {
    size = '1024x1792';
  } else if (format === '1:1') {
    size = '1024x1024';
  }

  try {
    // Étape 1 : Demander à GPT-4o (ChatGPT) de réécrire et sublimer le prompt comme le vrai ChatGPT le ferait.
    const chatResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a world-class YouTube thumbnail designer and DALL-E 3 prompt engineer. 
The user will give you a rough description of their video and what they want for the thumbnail. 
Your job is to write the ULTIMATE, highly-detailed DALL-E 3 image generation prompt in English.
Focus on: High contrast, extreme vibrancy, cinematic and dramatic lighting, expressive faces (if humans are involved), and a composition that maximizes click-through rate (CTR).
If text is requested, describe it as "bold, massive, 3D floating text, easily readable".
Make it look like top-tier YouTube content creators' thumbnails (MrBeast, etc.).
OUTPUT ONLY THE DALL-E PROMPT, NOTHING ELSE. NO INTRO, NO OUTRO.`
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
    });

    const optimizedPrompt = chatResponse.choices[0]?.message?.content || prompt;
    console.log("Prompt optimisé par GPT-4o :", optimizedPrompt);

    // Étape 2 : Envoyer le prompt optimisé à DALL-E 3
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: optimizedPrompt.substring(0, 4000), // DALL-E 3 limite à 4000 caractères
      n: 1,
      size: size,
      quality: "standard", // "hd" could also be used if needed, but standard is fine
    });

    if (response.data && response.data[0] && response.data[0].url) {
      return response.data[0].url;
    } else {
      throw new Error("L'API OpenAI n'a pas renvoyé d'URL d'image valide.");
    }
  } catch (error) {
    console.error("Erreur lors de la génération de l'image avec OpenAI:", error);
    throw error;
  }
};
