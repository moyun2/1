const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const DEEPSEEK_API_URL = 'https://api.deepseek.ai/v1/chat';

app.use(express.json());

// 调用 DeepSeek API 的路由
app.post('/api/deepseek', async (req, res) => {
  try {
    const { message } = req.body;

    const response = await axios.post(
      DEEPSEEK_API_URL,
      {
        messages: [
          { role: 'user', content: message },
        ],
        model: 'deepseek-chat-v1',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error calling DeepSeek API:', error);
    res.status(500).json({ error: 'Failed to call DeepSeek API' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});