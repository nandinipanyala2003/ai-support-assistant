const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function test() {
  try {
    console.log("Testing Gemini...");

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Say Hello in one sentence.",
    });

    console.log("SUCCESS:");
    console.log(response.text);
  } catch (err) {
    console.error("ERROR:");
    console.error(err);
  }
}

test();