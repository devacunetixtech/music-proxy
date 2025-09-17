import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());

const CLIENT_ID = "4d5a4658"; // put your real client_id here

// Search tracks
app.get("/api/search", async (req, res) => {
  try {
    const { q } = req.query;
    const response = await axios.get(
      `https://api.jamendo.com/v3.0/tracks`,
      {
        params: {
          client_id: CLIENT_ID,
          format: "json",
          limit: 20,
          search: q,
        },
      }
    );
    res.json(response.data.results);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Search failed" });
  }
});

// Top tracks (popular hits)
app.get("/api/top", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.jamendo.com/v3.0/tracks`,
      {
        params: {
          client_id: CLIENT_ID,
          format: "json",
          limit: 20,
          order: "popularity_total",
        },
      }
    );
    res.json(response.data.results);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to fetch top tracks" });
  }
});

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`🎵 Jamendo Proxy running at http://localhost:${PORT}`)
);
