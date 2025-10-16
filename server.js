const express = require("express");
const cors = require("cors");
const {
  getQuotes,
  getQuote,
  createQuote,
  updateQuote,
  deleteQuote,
  getQuotesForGame,
} = require("./controllers/quoteController.js");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// GET - All quotes
app.get("/api/quotes", getQuotes);

// GET - one quote
app.get("/api/quotes/:id", getQuote);

// GET - quotes after the game
app.get("/api/quotes", getQuotesForGame);

// POST - add new quote
app.post("/api/quotes", createQuote);

// PUT - edit quote
app.put("/api/quotes/:id", updateQuote);

// DELETE - remove quote
app.delete("/api/quotes/:id", deleteQuote);

app.listen(PORT, () => {
  console.log(`Serwer działa na http://localhost:${PORT}`);
});
