const { v4: uuidv4 } = require("uuid");
const mysql = require("mysql2/promise");
require("dotenv").config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

let quotes = [];

async function findAll() {
  const connection = await mysql.createConnection(dbConfig);
  const [rows] = await connection.execute("SELECT * FROM quotes");
  quotes = rows;
  await connection.end();
  return quotes;
}

async function findById(id) {
  const connection = await mysql.createConnection(dbConfig);
  const [rows] = await connection.execute("SELECT * FROM quotes WHERE id = ?", [
    id,
  ]);
  quotes = rows;
  await connection.end();
  return rows[0];
}

async function create(quote) {
  const connection = await mysql.createConnection(dbConfig);

  try {
    const [result] = await connection.execute(
      "INSERT INTO quotes (uuid, `character`, game, quote) VALUES (?, ?, ?, ?)",
      [
        quote.uuid || uuidv4(),
        quote.character || null,
        quote.game || null,
        quote.quote || null,
      ]
    );

    const newQuote = { uuid: uuidv4(), ...quote };

    quotes.push({
      id: result.insertId,
      uuid: quote.uuid,
      character: quote.character,
      game: quote.game,
      quote: quote.quote,
    });

    return newQuote;
  } finally {
    await connection.end();
  }
}

async function findByGame(game) {
  const connection = await mysql.createConnection(dbConfig);
  try {
    const [rows] = await connection.execute(
      "SELECT * FROM quotes WHERE LOWER(TRIM(game)) = LOWER(TRIM(?))",
      [game]
    );
    return rows;
  } catch (err) {
    console.error("Database error: ", err);
    return [];
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

async function update(id, updatedFields) {
  const connection = await mysql.createConnection(dbConfig);

  try {
    const { character, game, quote } = updatedFields;
    await connection.execute(
      "UPDATE quotes SET `character` = ?, game = ?, quote = ? WHERE id = ?",
      [character, game, quote, id]
    );
    return { id, character, game, quote };
  } catch (err) {
    console.error("Database error: ", err);
    return null;
  } finally {
    await connection.end();
  }
}

async function remove(id) {
  const connection = await mysql.createConnection(dbConfig);

  try {
    await connection.execute("DELETE FROM quotes WHERE id = ?", [id]);
  } catch (err) {
    console.error("Database error: ", err);
    return null;
  } finally {
    await connection.end();
  }
}

module.exports = {
  findAll,
  findById,
  findByGame,
  create,
  update,
  remove,
};
