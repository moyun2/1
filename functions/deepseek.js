const axios = require('axios');

exports.handler = async (event, context) => {
  try {
    const { message } = JSON.parse(event.body);
    const apiKey = process.env.DEEPSEEK_API_KEY;
    const apiUrl = 'https://api.deepseek.com/chat/completions';

    console.log('API Key:', apiKey); // 添加日志输出，验证环境变量是否正确配置

    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'API key is not configured' }),
      };
    }

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