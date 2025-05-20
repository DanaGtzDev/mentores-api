const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { fetchRecords } = require('./utils/fetchRecords')
const { filterExpertos } = require('./utils/filterExpertos')
const { sendToAirtable } = require('./utils/sendToAirtable');
const { sendByEmail } = require('./utils/sendByEmail');

const app = express();

app.use(express.json());


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
    sendByEmail(query,records)
    //sendToAirtable(records)
    
    res.json({"response": "Records saved correctly"});
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred while fetching and filtering records.');
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
