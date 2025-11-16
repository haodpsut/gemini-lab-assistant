
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("Gemini API key not found. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const getReviewContent = async (topics: string[]): Promise<string> => {
  try {
    const prompt = `You are an expert university lecturer. Provide a concise yet comprehensive review of the following topics for a computer science student preparing for a lab. Use markdown for formatting, including headers, bold text, and bullet points to structure the information clearly. The topics are: ${topics.join(', ')}.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching review content:", error);
    return "Sorry, I couldn't fetch the review content at the moment. Please check the console for more details.";
  }
};

export const getHint = async (problem: string, currentAnswer: string): Promise<string> => {
  try {
    const prompt = `You are a helpful teaching assistant. A student is working on the following problem:
---
**Problem:**
${problem}
---
**Their current attempt is:**
\`\`\`
${currentAnswer || 'The student has not started yet.'}
\`\`\`
---
Provide a single, concise, and helpful hint to guide the student in the right direction. Do not give away the solution. Focus on the next logical step or a potential misunderstanding.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching hint:", error);
    return "Sorry, I couldn't generate a hint right now. Please try again later.";
  }
};

export const evaluateAnswer = async (problem: string, answer: string): Promise<string> => {
  try {
    const prompt = `You are an expert programming instructor and lab evaluator. Evaluate the following solution for the given problem. 
---
**Problem:**
${problem}
---
**Student's Solution:**
\`\`\`
${answer}
\`\`\`
---
Provide constructive feedback using markdown. Start with an overall assessment (e.g., "### Overall Assessment: Correct", "### Overall Assessment: Partially Correct", "### Overall Assessment: Needs Improvement"). Then, provide a "### Detailed Feedback" section explaining why, pointing out any errors, and suggesting improvements for correctness, efficiency, or code style.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error evaluating answer:", error);
    return "Sorry, I couldn't evaluate your answer at the moment. Please check your submission and try again.";
  }
};
