const Quote = require("../models/quoteModel.js");
let quotes = require("../quotes.json");

// @desc  Gets All Quotes
// @route GET /api/quotes
async function getQuotes(req, res) {
  try {
    const game = req.query.game;
    const result = game ? await Quote.findByGame(game) : await Quote.findAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

// @desc Gets single Quote
// @route GET /api/quotes/[:id]
async function getQuote(req, res) {
  try {
    const id = req.params.id;
    const quote = await Quote.findById(id);

    if (!quote) {
      return res.status(404).json({ message: "Quote Not Found" });
    }

    res.status(200).json(quote);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
}

async function getQuotesForGame(req, res) {
  const game = req.query.game;
  console.log("game: ", game);
  if (!game) {
    return res.status(404).json({ message: "'game' parameter is required" });
  }

  try {
    const quotes = await Quote.findByGame(game);

    if (quotes.length === 0) {
      return res.status(404).json({ message: "Game Not Found" });
    }

    res.status(200).json(quotes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
}

// @desc Create a new Quote
// @route POST /api/quotes
async function createQuote(req, res) {
  try {
    const { character, game, quote } = req.body;

    if (!character || !game || !quote) {
      return res
        .status(400)
        .json({ message: "Complete all fields correctly." });
    }

    const newQuoteData = { character, game, quote };
    const newQuote = await Quote.create(newQuoteData);

    res.status(201).json(newQuote);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
}

// @desc Update a Quote
// @route PUT /api/quotes/:id
async function updateQuote(req, res) {
  try {
    const id = req.params.id;
    const quote = await Quote.findById(id);

    if (!quote) {
      return res.status(404).json({ message: "Quote Not Found" });
    }
    const { character, game, quote: newQuoteText } = req.body;

    const quoteData = {
      character: character || quote.character,
      game: game || quote.game,
      quote: newQuoteText || quote.quote,
    };

    const updQuote = await Quote.update(id, quoteData);
    res.status(200).json(updQuote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

// @desc Delete a Quote
// @route DELETE /api/quotes/:id
async function deleteQuote(req, res) {
  try {
    const id = req.params.id;
    const quote = await Quote.findById(id);
    if (!quote) {
      return res.status(404).json({ message: "Quote Not Found" });
    }
    await Quote.remove(id);
    res.status(200).json({ message: `Quote: ${id} removed` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  getQuotes,
  getQuote,
  getQuotesForGame,
  createQuote,
  updateQuote,
  deleteQuote,
};
