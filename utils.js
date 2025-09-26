const fs = require("fs/promises");

async function writeDataToFile(filename, content) {
  try {
    await fs.writeFile(filename, JSON.stringify(content, null, 2), "utf8");
    console.log("Zapisano pomyślnie");
  } catch (err) {
    console.log("Błąd zapisu: ", err);
  }
}

module.exports = {
  writeDataToFile,
};
