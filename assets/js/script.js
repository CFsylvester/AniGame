var gamespotKey = "e1c898ffd3a1cccaf5ff6ef297f51a43f05238a3";
var searchForm = document.querySelector("#search-form");
var searchBar = document.querySelector("#search-bar");
var GameColumnsContainerEl = document.querySelector("#game-columns-container")

function gameRequest(gameName) {
    var gameApi = "https://cors-anywhere.herokuapp.com/http://www.gamespot.com/api/games/?api_key=" + gamespotKey + "&filter=name:" + gameName + "&format=json";
    // fetch the response
    fetch(gameApi)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            console.log(response);
            
            //Create Element
            var gameColumnEl = document.createElement("div");
            var gameColumnsEl = document.createElement("div");
            var columnImageEl = document.createElement("div");
            var gameImgContainerEl = document.createElement("div");
            var gameImg = document.createElement("img");
            var columnDescriptionEl = document.createElement("div");
            var gameTitleContainerEl = document.createElement("div");
            var gameTitleEl = document.createElement("h1");
            var gameTitleText = document.createTextNode(response.results[0].name)
            var gameStarsEl = document.createElement("div");
            var gameTitleStarSpan = document.createElement("span");
            var gameTitleStar1 = document.createElement("i");
            var gameTitleStar2 = document.createElement("i");
            var gameTitleStar3 = document.createElement("i");
            var gameTitleStar4 = document.createElement("i");
            var gameTitleStar5 = document.createElement("i");
            var gameSummaryEl = document.createElement("div");
            var gameSummary = document.createElement("p");
            var gameSummaryText = document.createTextNode(response.results[0].description);
            //Set Attribute
            gameColumnEl.setAttribute("id", "game-column");
            gameColumnEl.setAttribute("class", "column is-three-fifths is-offset-one-fifth has-background-grey-lighter has-text-black-bis");
            gameColumnsEl.setAttribute("id", "game-column");
            gameColumnsEl.setAttribute("class", "columns is-mobile");
            columnImageEl.setAttribute("id", "column-image");
            columnImageEl.setAttribute("class", "column is-one-third");
            gameImgContainerEl.setAttribute("id", "game-img");
            gameImgContainerEl.setAttribute("class", "container has-text-centered");
            gameImg.setAttribute("id", "game-image");
            gameImg.setAttribute("src", response.results[0].image.square_tiny);
            gameImg.setAttribute("alt", "Image of " + gameName);
            columnDescriptionEl.setAttribute("id", "column-description");
            columnDescriptionEl.setAttribute("class", "column");
            gameTitleContainerEl.setAttribute("id", "game-title");
            gameTitleContainerEl.setAttribute("class", "container has-text-centere");
            gameTitleEl.setAttribute("class", "title");
            gameStarsEl.setAttribute("id", "game-stars");
            gameStarsEl.setAttribute("class", "container has-text-centered");
            gameTitleStarSpan.setAttribute("class", "icon my-2 is-large");
            gameTitleStar1.setAttribute("class", "fas fa-star");
            gameTitleStar2.setAttribute("class", "fas fa-star");
            gameTitleStar3.setAttribute("class", "fas fa-star");
            gameTitleStar4.setAttribute("class", "fas fa-star");
            gameTitleStar5.setAttribute("class", "fas fa-star");
            //Append Child
            GameColumnsContainerEl.appendChild(gameColumnEl);
            gameColumnEl.appendChild(gameColumnsEl);
            gameColumnsEl.appendChild(columnImageEl);
            columnImageEl.appendChild(gameImgContainerEl);
            gameImgContainerEl.appendChild(gameImg);
            gameColumnsEl.appendChild(columnDescriptionEl);
            columnDescriptionEl.appendChild(gameTitleContainerEl);
            gameTitleContainerEl.appendChild(gameTitleEl);
            gameTitleEl.appendChild(gameTitleText);
            columnDescriptionEl.appendChild(gameStarsEl);
            gameStarsEl.appendChild(gameTitleStarSpan);
            gameTitleStarSpan.appendChild(gameTitleStar1);
            gameTitleStarSpan.appendChild(gameTitleStar2);
            gameTitleStarSpan.appendChild(gameTitleStar3);
            gameTitleStarSpan.appendChild(gameTitleStar4);
            gameTitleStarSpan.appendChild(gameTitleStar5);
            gameStarsEl.appendChild(gameTitleStarSpan);
            columnDescriptionEl.appendChild(gameSummaryEl);
            gameSummaryEl.appendChild(gameSummary);
            gameSummary.appendChild(gameSummaryText);

            // fetch gameName from kitsu api
            return fetch("https://kitsu.io/api/edge/anime?filter[text]=" + gameName);
        })
        .then(function (kitsuResponse) {
            return kitsuResponse.json();
        })
        .then(function (kitsuResponse) {
            console.log(kitsuResponse);
            // add endpoints here from the Kitsu API related to gameName value and insert into HTML elements

            // display main image of the anime
            var animeImg = document.createElement("img");
            animeImg.setAttribute("id", "anime-image");
            animeImg.setAttribute("src", kitsuResponse.data[0].attributes.coverImage.small);
            animeImg.setAttribute("alt", "Image of " + gameName);
            resultsContainer.appendChild(animeImg);
        
        })
        .catch(function(error) {
            console.log(error);
            alert("Looks like there's an error :(");
        });
};

var searchGame = function(event) {
    event.preventDefault();
    var searchValue = searchBar.value.trim();
    // clicking search button submits value and calls gameRequest function
    console.log(searchValue);

    if (searchValue) {
        gameRequest(searchValue);
    } else {
        //if search is empty, throw an alert. CHANGE TO A MODAL LATER
        alert("Enter a video game title to search for!");
    }
    // clear search bar after submitting
    searchBar.value = "";
};

searchForm.addEventListener("submit", searchGame);