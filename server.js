import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const client = new OpenAI({
  apiKey: process.env.AZURE_OPENAI_API_KEY,
  baseURL: `${process.env.AZURE_OPENAI_ENDPOINT}openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT}`,
  defaultQuery: { "api-version": "2024-02-15-preview" },
  defaultHeaders: {
    "api-key": process.env.AZURE_OPENAI_API_KEY
  }
});

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await client.chat.completions.create({
      messages: [{ role: "user", content: message }],
      max_tokens: 200
    });

    console.log(response.choices[0].message.content); // DEBUG

    res.json({
      reply: response.choices[0].message.content
    });
  } catch (error) {
    console.error("AI ERROR:", error);
    res.status(500).json({ error: "Błąd AI" });
  }
});


app.listen(3000, () => {
  console.log("✅ Server działa: http://localhost:3000");
});
