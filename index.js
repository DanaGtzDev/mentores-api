const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const { v4: uuidv4 } = require('uuid');

dotenv.config();

const app = express();

app.use(express.json());

const API_TOKEN = process.env.API_TOKEN;
const BASE_ID = process.env.BASE_ID;
const IN_TABLE_NAME = process.env.IN_TABLE_NAME;
const IN_BASE_URL = `https://api.airtable.com/v0/${BASE_ID}/${IN_TABLE_NAME}`;
const OUT_TABLE_NAME = process.env.OUT_TABLE_NAME;
const OUT_BASE_URL = `https://api.airtable.com/v0/${BASE_ID}/${OUT_TABLE_NAME}`

app.post('/filter-expertos', async (req, res) => {
  try {
    const query = req.body;
    const expertos = await fetchRecords();
    const filteredExpertos = filterExpertos(query, expertos);
    const result = filteredExpertos.slice(0, 10).map((ex) => {
      return {
        fields: {
          Id: uuidv4(),
          "Project Name": query.project_name,
          "Project Email": query.email,
          "Expert Name": ex.fields.Name,
          "Expert Email": ex.fields.Email,
          "Expert Experience": ex.fields.Experience
        }
      };
    });
    const records = {"records": result}
    sendToAirtable(records)
    
    res.json({"response": "Records saved correctly"});
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred while fetching and filtering records.');
  }
});


async function fetchRecords() {
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

const filterExpertos = (query, data) => {
  return data.filter(item =>
    (item.fields?.['Verticals']?.some(v => query['vertical']?.includes(v)) ?? false) &&
    (item.fields?.['Languages']?.some(l => query['language']?.includes(l)) ?? false) &&
    (item.fields?.['Entrepreneur Superpowers']?.some(es => query['entrepreneur_superpower']?.includes(es)) ?? false) &&
    (item.fields?.['Main approach']?.some(ma => query['main_approach']?.includes(ma)) ?? false)
  );
};

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
    console.log('Airtable response:', response.data);
  } catch (error) {
    console.error('Error sending to Airtable:', error.response?.data || error.message);
  }
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
