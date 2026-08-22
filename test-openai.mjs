import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.VITE_OPENAI_API_KEY
});

async function testKey() {
  try {
    const models = await openai.models.list();
    console.log("SUCCESS: The OpenAI key is valid! Found " + models.data.length + " models.");
  } catch (error) {
    console.error("ERROR: Failed to validate the OpenAI key.");
    console.error(error.message);
    process.exit(1);
  }
}

testKey();
