import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  let aiClient: GoogleGenAI | null = null;
  function getAIClient(): GoogleGenAI | null {
    if (!aiClient && process.env.GEMINI_API_KEY) {
      aiClient = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
    }
    return aiClient;
  }

  // API endpoint for generating stylized cartoon/video game fantasy character portraits
  app.post('/api/generate-portrait', async (req, res) => {
    try {
      const { name, characterClass, race, trait, affinity, weapon } = req.body;
      const ai = getAIClient();

      if (ai) {
        try {
          const prompt = `A colorful stylized cartoon and video game avatar portrait of ${name || 'a hero'}, a ${race || 'fantasy'} ${characterClass || 'adventurer'}. Wielding ${weapon || 'weapons'}, glowing with ${affinity || 'elemental power'}. Distinctive feature: ${trait || 'sharp gaze'}. Modern fantasy video game concept art, stylized cel-shaded character design, vibrant digital art, highly detailed face and shoulders headshot, dynamic lighting, high contrast, clean backdrop, 1:1 square game icon avatar portrait.`;

          const response = await ai.models.generateContent({
            model: 'gemini-3.1-flash-lite-image',
            contents: {
              parts: [{ text: prompt }],
            },
            config: {
              imageConfig: {
                aspectRatio: '1:1',
              },
            },
          });

          if (response.candidates?.[0]?.content?.parts) {
            for (const part of response.candidates[0].content.parts) {
              if (part.inlineData?.data) {
                const mimeType = part.inlineData.mimeType || 'image/png';
                const imageUrl = `data:${mimeType};base64,${part.inlineData.data}`;
                return res.json({ imageUrl, source: 'gemini' });
              }
            }
          }
        } catch (geminiError: any) {
          console.warn('Gemini image generation attempt notice:', geminiError?.message || geminiError);
        }
      }

      // High-grade stylized cartoon/game avatar procedural fallback
      const seed = encodeURIComponent(`${name}-${characterClass}-${race}-${Date.now()}-${Math.floor(Math.random() * 10000)}`);
      const fallbackUrl = `https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}&backgroundColor=0a0a0a,121212,1c1917&radius=12`;

      return res.json({ imageUrl: fallbackUrl, source: 'procedural' });
    } catch (error: any) {
      console.error('Portrait generation error:', error);
      res.status(500).json({ error: error.message || 'Failed to generate portrait' });
    }
  });

  // API endpoint for generating a unique 1-to-2 sentence origin backstory
  app.post('/api/generate-backstory', async (req, res) => {
    try {
      const { name, characterClass, race, trait, origin, affinity, weapon } = req.body;
      const ai = getAIClient();

      if (ai) {
        try {
          const prompt = `Write a vivid, legendary origin backstory of EXACTLY 1 to 2 sentences for the fantasy character:
Name: ${name}
Class: ${characterClass}
Race: ${race || 'Mythic'}
Homeland / Origin: ${origin || 'the ancient realms'}
Distinctive Trait: ${trait || 'unyielding grit'}
Primary Armament: ${weapon || 'arcane relics'}
Affinity: ${affinity || 'elemental fury'}

Requirements:
- Exactly 1 or 2 sentences total.
- Rich fantasy tone suited for an ancient chronicle or RPG lorebook.
- Highlight how their background shaped their mastery as a ${characterClass}.
- Do not include quotation marks or extra labels around the text.`;

          const response = await ai.models.generateContent({
            model: 'gemini-3.7-flash',
            contents: prompt,
            config: {
              temperature: 0.85,
            },
          });

          const backstoryText = response.text?.trim();
          if (backstoryText) {
            return res.json({ backstory: backstoryText, source: 'gemini' });
          }
        } catch (geminiError: any) {
          console.warn('Gemini backstory generation attempt notice:', geminiError?.message || geminiError);
        }
      }

      // Procedural fallback backstory synthesis
      const templates = [
        `Born amidst the shadowed crags of ${origin || 'the Forgotten Reaches'}, ${name} mastered the discipline of the ${characterClass} after uncovering an ancient relic tied to ${affinity || 'primal power'}. Now wielding the ${weapon || 'blessed armament'}, they wander the realms guided by an oath to protect the defenseless.`,
        `Once a humble apprentice in ${origin || 'the Astral Spire'}, ${name} survived a cataclysmic surge of ${affinity || 'raw essence'} that permanently marked their destiny. Today, they stand as a revered ${characterClass}, feared by tyrants for their ${trait ? trait.toLowerCase() : 'unyielding focus'}.`,
        `Exiled from ${origin || 'the High Sanctum'} for defying corrupted elders, ${name} forged their own path as an elite ${characterClass}. With ${weapon || 'their trusted armament'} in hand and ${affinity || 'mystic force'} at their command, their name has become legend across the frontier.`
      ];

      const fallbackBackstory = templates[Math.floor(Math.random() * templates.length)];
      return res.json({ backstory: fallbackBackstory, source: 'procedural' });
    } catch (error: any) {
      console.error('Backstory generation error:', error);
      res.status(500).json({ error: error.message || 'Failed to generate backstory' });
    }
  });

  // Health endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
