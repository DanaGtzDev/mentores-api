const axios = require('axios');
const { API_TOKEN } = require("../global/global")
const { IN_BASE_URL } = require("../global/global")

async function fetchRecords(){
  try {
    const response = await axios.get(IN_BASE_URL, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`
      }
    });
    return response.data.records;
  } catch (error) {
    console.error('Error:', error.response?.status, error.message);
    throw new Error('Failed to fetch records');
  }
}

module.exports = { fetchRecords };
