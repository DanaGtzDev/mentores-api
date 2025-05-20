const axios = require('axios');
const { OUT_BASE_URL } = require('../global/global')
const { API_TOKEN } = require('../global/global')

async function sendToAirtable(data) {
  try {
    const response = await axios.post(
      OUT_BASE_URL,
      data,
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Error sending to Airtable:', error.response?.data || error.message);
  }
}

module.exports = { sendToAirtable };