const axios = require('axios');

module.exports.config = {
  name: 'ai',
  version: '1.0.0',
  role: 0,
  hasPrefix: false,
  aliases: ['snow', 'ai'],
  description: "An AI command powered by Snowflakes AI",
  usage: "snowflakes [prompt]",
  credits: 'churchill',
  cooldown: 3,
};

module.exports.run = async function({ api, event, args }) {
  const input = args.join(' ');
  
  if (!input) {
    api.sendMessage(`𝑯𝑬𝑳𝑳𝑶! Nelzy 𝑨𝑰 𝑩𝑶𝑻  

━━━━━━━━━━━━━━━

 𝑷𝑳𝑬𝑨𝑺𝑬 𝑷𝑹𝑶𝑽𝑰𝑫𝑬 𝑨 𝑸𝑼𝑬𝑺𝑻𝑰𝑶𝑵/𝑸𝑼𝑬𝑹𝒀`, event.threadID, event.messageID);
    return;
  }
  
  api.sendMessage(`🔍Searching for Nelzy  AI response....`, event.threadID, event.messageID);
  
  try {
      const userData = await api.getUserInfo(event.senderID);
      const userName = userData[event.senderID].name;
      
      api.setMessageReaction("🔎", event.messageID);
      
    const { data } = await axios.get(`https://hashier-api-snowflake.vercel.app/api/snowflake?ask=${encodeURIComponent(input)}`);
    if (data.response) {
      api.sendMessage(data.response + "\n\nQuestion Asked By: {userName} ", event.threadID, event.messageID);
    } else {
      api.sendMessage('No response found.', event.threadID, event.messageID);
    }
  } catch (error) {
    api.sendMessage('An error occurred while processing your request.', event.threadID, event.messageID);
  }
};
