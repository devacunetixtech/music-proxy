import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());

// Search endpoint
app.get("/api/search", async (req, res) => {
  try {
    const { q } = req.query;
    const response = await axios.get(
      `https://api.deezer.com/search?q=${encodeURIComponent(q)}`
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Search failed" });
  }
});

// New: Top tracks endpoint
app.get("/api/top", async (req, res) => {
  try {
    const response = await axios.get("https://api.deezer.com/chart");
    res.json(response.data.tracks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch top tracks" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Proxy running at http://localhost:${PORT}`));
