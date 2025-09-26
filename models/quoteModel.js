let quotes = require("../quotes.json");
const path = require("path");
const { writeDataToFile } = require("../utils");
const { v4: uuidv4 } = require("uuid");
const quotesFile = path.join(__dirname, "../quotes.json");

async function findAll() {
  return quotes;
}

async function findById(id) {
  return quotes.find((p) => p.id === id);
}

async function create(quote) {
  const newQuote = { id: uuidv4(), ...quote };
  quotes.push(newQuote);

  if (process.env.NODE_ENV !== "test") {
    await writeDataToFile(quotesFile, quotes);
  }

  return newQuote;
}

async function update(id, updatedFields) {
  const index = quotes.findIndex((p) => p.id === id);
  quotes[index] = { ...quotes[index], ...updatedFields };
  if (process.env.NODE_ENV !== "test") {
    await writeDataToFile(quotesFile, quotes);
  }

  return quotes[index];
}

async function remove(id) {
  quotes = quotes.filter((p) => p.id !== id);
  if (process.env.NODE_ENV !== "test") {
    await writeDataToFile(quotesFile, quotes);
  }
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
