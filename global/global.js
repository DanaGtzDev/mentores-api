const dotenv = require('dotenv');

dotenv.config();

const API_TOKEN = process.env.API_TOKEN;
const BASE_ID = process.env.BASE_ID;
const IN_TABLE_NAME = process.env.IN_TABLE_NAME;
const IN_BASE_URL = `https://api.airtable.com/v0/${BASE_ID}/${IN_TABLE_NAME}`;
const OUT_TABLE_NAME = process.env.OUT_TABLE_NAME;
const OUT_BASE_URL = `https://api.airtable.com/v0/${BASE_ID}/${OUT_TABLE_NAME}`;
const EMAIL_SERVICE = process.env.EMAIL_SERVICE;
const SENDER_EMAIL = process.env.SENDER_EMAIL;
const SENDER_PASSWORD = process.env.SENDER_PASSWORD
const RECEIVER_EMAIL = process.env.RECEIVER_EMAIL;

module.exports = { 
    API_TOKEN,  
    BASE_ID, 
    IN_TABLE_NAME, 
    IN_BASE_URL, 
    OUT_TABLE_NAME, 
    OUT_BASE_URL, 
    EMAIL_SERVICE,
    SENDER_EMAIL,
    SENDER_PASSWORD,
    RECEIVER_EMAIL
};