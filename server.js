import express from 'express';
import cors from 'cors';
import axios from 'axios';
import * as dotenv from "dotenv";

dotenv.config();
const app = express();
const port = 3000;

app.use(cors());

app.get('/api/football-data', async (req, res) => {
  try {
    const response = await axios.get('https://api.football-data.org/v4/matches', {
      headers: {
        'X-Auth-Token': process.env.FOOTBALL_DATA_API,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching soccer results:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/football-news', async (req, res) => {
  try {
    const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=de&apiKey=${process.env.NEWS_API}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching soccer news:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});