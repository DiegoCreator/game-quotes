const listContainer = document.getElementById("quotes-list");
const detailsContainer = document.getElementById("quoteDetails");
const addQuoteBtn = document.getElementById("addQuoteBtn");

async function showList() {
  listContainer.style.display = "flex";
  detailsContainer.style.display = "none";
}

async function showDetails(id) {
  const res = await fetch(`http://localhost:3000/api/quotes/${id}`);
  const quotation = await res.json();
  detailsContainer.innerHTML = `
    <h2>${quotation.game}</h2>
    <p><b>${quotation.character}</b></p>
    <blockquote>${quotation.quote}</blockquote>
    <button id="backBtn">Wróć</button>
    <button id="deleteBtn" class="delete-btn">Usuń</button>
  `;

  document.getElementById("backBtn").onclick = showList;

  listContainer.style.display = "none";
  detailsContainer.style.display = "block";
}

async function loadQuotes() {
  const res = await fetch("http://localhost:3000/api/quotes");
  const data = await res.json();
  console.log("Data:", data);

  listContainer.innerHTML = "";

  data.forEach((quotation) => {
    const div = document.createElement("div");
    div.classList.add("quote-card");
    div.textContent = quotation.quote.slice(0, 50) + "...";
    div.onclick = () => {
      console.log("Kliknięto cytat", quotation.id);
      showDetails(quotation.id);
    };

    listContainer.appendChild(div);
  });
}

function showAddQuoteForm() {
  detailsContainer.innerHTML = `
    <h2>Dodaj nowy cytat</h2>
    <form id="addQuoteForm">
      <input type="text" id="game" placeholder="Gra" required><br><br> 
      <input type="text" id="character" placeholder="Postać" required><br><br> 
      <textarea id="quote" placeholder="Cytat" required></textarea><br><br>
      <button type="submit" id="submit">Dodaj</button> 
      <button type="button" id="cancelAddBtn">Anuluj</button> 
    </form>
  `;

  listContainer.style.display = "none";
  detailsContainer.style.display = "block";

  document.getElementById("cancelAddBtn").onclick = showList;

  document.getElementById("addQuoteForm").onsubmit = async (e) => {
    e.preventDefault();
    const newQuote = {
      game: document.getElementById("game").value,
      character: document.getElementById("character").value,
      quote: document.getElementById("quote").value,
    };

    await fetch("http://localhost:3000/api/quotes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newQuote),
    });

    showList();
    loadQuotes();
  };
}

addQuoteBtn.onclick = () => {
  showAddQuoteForm();
};

loadQuotes();
