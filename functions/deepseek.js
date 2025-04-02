const axios = require('axios');

exports.handler = async (event, context) => {
  try {
    const { message } = JSON.parse(event.body);
    const apiKey = process.env.DEEPSEEK_API_KEY;
    const apiUrl = 'https://api.deepseek.ai/v1/chat';

    const response = await axios.post(
      apiUrl,
      {
        messages: [
          { role: 'user', content: message },
        ],
        model: 'deepseek-chat-v1',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error('Error calling DeepSeek API:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to call DeepSeek API' }),
    };
  }
};