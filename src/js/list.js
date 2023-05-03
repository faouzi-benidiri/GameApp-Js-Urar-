const apiKey = "55c4f2fd83f446628e103fcfeeda7c5f";
const endpoint = `https://api.rawg.io/api/games?key=${apiKey}`;

const cardContainer = document.getElementById("card");
const showMoreButton = document.getElementById("load-more");
console.log(cardContainer);

// affichage des cartes
let gamesData = [];

const displayGames = (games) => {
  games.forEach((game) => {
    const name = game.name;
    const ratings = game.rating;
    const released = game.released;
    const genres = game.genres.map((genre) => genre.name).join(", ");
    const imageBackground = game.background_image;
    const platformsList = game.parent_platforms
      .map(
        (platform) =>
          `<div class="platforms">
          <span class="platform-icon ${platform.platform.slug}"></span>
          </div>`
      )
      .join("");

    const card = `
      <div class="row flex-wrap ">
        <div class="card col-xs-12">
          <img class="card-img-top img-fluid" src="${imageBackground}" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <ul class="list-group list-group-flush platforms-list">
              ${platformsList}
            </ul>
            <div class="game-details">
            <p class="game-description">${genres}</p>
            <p class="game-rating">Ratings : ${ratings}</p>
            <p class="game-rating">released :${released}</p>
          </div>
          </div>
          <button id="details-${game.id}" type="button" href="#" class="btn btn-outline-light">details</button>
        </div>
      </div>
    `;
    cardContainer.innerHTML += card;
  });

  if (gamesData.length <= 9) {
    showMoreButton.style.display = "none";
  } else {
    showMoreButton.style.display = "block";
  }
};

// -----------

// recuprer les données et afficher seulement 9 carte
fetch(endpoint)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    gamesData = data.results;
    displayGames(gamesData.slice(0, 9));
  })
  .catch((error) => console.error(error));

let displayedGames = 9;
// -----------

// --dropdown--
const dropdownMenu = document.querySelector(".dropdown-menu");

document.querySelector(".dropdown-toggle").addEventListener("click", () => {
  if (dropdownMenu.classList.contains("show")) {
    cardContainer.style.marginTop = "190px";
  } else {
    cardContainer.style.marginTop = "calc(30px - 60px)";
  }
});
// ---------------

// show more button
showMoreButton.addEventListener("click", () => {
  const remainingGames = gamesData.slice(displayedGames, displayedGames + 9);
  displayGames(remainingGames);
  displayedGames += 9;

  if (displayedGames >= gamesData.length) {
    showMoreButton.style.display = "none";
  }
});
// ------------
