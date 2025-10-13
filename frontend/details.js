const id = new URLSearchParams(window.location.search).get("id");
const container = document.getElementById("quote-details");

fetch(`http://localhost:3000/api/quotes/${id}`)
  .then((res) => res.json())
  .then((quotation) => {
    container.innerHTML = `
        <h2>${quotation.game}</h2>
        <p>${quotation.character}</p>
        <p>${quotation.quote}</p>
    `;
  });
