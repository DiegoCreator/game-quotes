const express = require("express");
const {
  getQuotes,
  getQuote,
  createQuote,
  updateQuote,
  deleteQuote,
} = require("./controllers/quoteController.js");

const app = express();
const PORT = 3000;

app.use(express.json());

// GET - wszystkie cytaty
app.get("/api/quotes", getQuotes);

// GET - jeden cytat
app.get("/api/quotes/:id", getQuote);

// POST - dodawanie nowego cytatu
app.post("/api/quotes", createQuote);

// PUT - edycja cytatu
app.put("/api/quotes/:id", updateQuote);

// DELETE - usuwanie cytatu
app.delete("/api/quotes/:id", deleteQuote);

app.listen(PORT, () => {
  console.log(`Serwer działa na http://localhost:${PORT}`);
});
