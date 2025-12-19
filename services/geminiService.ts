
import { GoogleGenAI } from "@google/genai";
import { NewsArticle, NewsCategory, Language, Region } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const fetchNewsByCategory = async (
  category: NewsCategory, 
  language: Language, 
  region: Region
): Promise<NewsArticle[]> => {
  const model = "gemini-3-flash-preview";
  
  const regionContext = region.code === 'global' ? 'the world' : region.name;
  
  const prompt = `Find the top 4-5 major unique news stories for the category "${category}" from ${regionContext} from the last 24 hours. 
  
  IMPORTANT: You must write the output in the language: ${language.name}.
  
  For each story, provide:
  1. A compelling title in ${language.name}.
  2. Exactly 3-5 bullet points summarizing the article in ${language.name}. Keep them concise and readable in 15 seconds.
  3. Sentiment analysis (Positive, Neutral, or Negative) - use these English labels.
  4. The source name and original URL.
  
  Format the output strictly as a JSON array where each object has these keys: 
  "title", "summary" (array of strings), "sentiment", "source", "url".
  
  Important: Remove any duplicate stories or very similar coverage. Ensure all links are real and functional.`;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "";
    
    // Extract JSON block
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error("Failed to parse news data from Gemini.");
    }

    const rawArticles = JSON.parse(jsonMatch[0]);

    return rawArticles.map((item: any, index: number) => ({
      id: `${category}-${region.code}-${language.code}-${index}-${Date.now()}`,
      title: item.title,
      summary: item.summary || [],
      sentiment: item.sentiment || 'Neutral',
      category: category,
      url: item.url || '#',
      source: item.source || 'News Source',
      timestamp: new Date().toLocaleTimeString(),
    }));
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
};
