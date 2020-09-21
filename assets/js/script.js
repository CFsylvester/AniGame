var gamespotKey = "e1c898ffd3a1cccaf5ff6ef297f51a43f05238a3";
var searchForm = document.querySelector("#search-form");
var searchBar = document.querySelector("#search-bar");
var contentEl = document.querySelector("#main-content");
var resultsContainerEL = document.querySelector("#results-container");
var GameColumnsContainerEl = document.querySelector("#game-columns-container");

// anime result containers
var animeContainer = document.createElement("div");
var animeInfoEl = document.createElement("div");
var animeVidContainer = document.createElement("div");
var animeRatingEl = document.createElement("span");
var animeVid = document.createElement("iframe");
var animeDescription = document.createElement("p");

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
            var gameTitleText = document.createTextNode(response.results[0].name);

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
            gameColumnEl.setAttribute("class", "column is-three-fifths is-offset-one-fifth has-background-grey-lighter is-family-monospace has-text-black-bis");
            gameColumnsEl.setAttribute("id", "game-column");
            gameColumnsEl.setAttribute("class", "columns is-mobile");
            columnImageEl.setAttribute("id", "column-image");
            columnImageEl.setAttribute("class", "column is-one-third is-centered");
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


            // SHOULD WE MOVE THE KITSU API FETCH INTO A SEPERATE FUNCTION AND CALL?

            return fetch("https://kitsu.io/api/edge/anime?filter[text]=" + gameName);
        })
        .then(function (animeResponse) {
            return animeResponse.json();
        })
        .then(function (animeResponse) {
            console.log(animeResponse);

            // convert game title and anime title to uppercase to check for correct titles
            var animeName = animeResponse.data[0].attributes.canonicalTitle;
            var animeNameUp = animeName.toUpperCase();
            var gameNameUp = gameName.toUpperCase();

            if (animeNameUp.includes(gameNameUp) === false) {
                console.log("testing error");
                $("#anime-alert").addClass("is-active");
                $("#anime-alert-text").html("<p>There weren't any anime found for " + gameName + ".</p>");
                $("#anime-alert-btn").on("click", function () {
                    ($("#anime-alert").removeClass("is-active"));
                });
                return;
            }
            // Kitsu API results related to gameName valuE

            // create a container for all the kitsu api results
            animeContainer.setAttribute("id", "anime-container");
            animeContainer.classList = "column anime-class is-three-fifths is-offset-one-fifth has-text-centered is-family-monospace has-background-grey-lighter has-text-black-bis";
            resultsContainerEL.appendChild(animeContainer);

            // div to contain title, rating and //description
            animeInfoEl.setAttribute("id", "anime-info");
            animeInfoEl.classList = "container has-text-centered is-size-5";
            animeInfoEl.innerHTML = "Anime found for " + gameName + ":";
            animeContainer.appendChild(animeInfoEl);

            // display title 
            var animeTitle = document.createElement("h3");
            animeTitle.setAttribute("id", "anime-title");
            animeTitle.classList = "title has-text-centered is-size-3";
            animeTitle.innerHTML = animeResponse.data[0].attributes.canonicalTitle;
            animeInfoEl.appendChild(animeTitle);

            // display rating/stars
            var animeRatingEl = document.createElement("span");
            animeRatingEl.setAttribute("id", "anime-rating");
            var animeStar1 = document.createElement("i");
            animeStar1.classList = "far fa-star";
            var animeStar2 = document.createElement("i");
            animeStar2.classList = "far fa-star";
            var animeStar3 = document.createElement("i");
            animeStar3.classList = "far fa-star";
            var animeStar4 = document.createElement("i");
            animeStar4.classList = "far fa-star";
            var animeStar5 = document.createElement("i");
            animeStar5.classList = "far fa-star";

            animeRatingEl.classList = "column container has-text-centered is-family-monospace is-size-4 has-text-black-bis";
            animeTitle.appendChild(animeRatingEl);
            animeRatingEl.appendChild(animeStar1);
            animeRatingEl.appendChild(animeStar2);
            animeRatingEl.appendChild(animeStar3);
            animeRatingEl.appendChild(animeStar4);
            animeRatingEl.appendChild(animeStar5);

            // create an if else statement to highlight or fill star icons depending on value of animeRating
            // SHOULD THIS GET MOVED INTO A SEPERATE FUNCTION?
            var animeRating = animeResponse.data[0].attributes.averageRating;
            console.log(animeRating);

            if (animeRating < 30) {
                animeStar1.classList.remove("far");
                animeStar1.classList.add("fas");
            } else if (animeRating > 30 && animeRating < 50) {
                animeStar1.classList.remove("far");
                animeStar1.classList.add("fas");
                animeStar2.classList.remove("far");
                animeStar2.classList.add("fas");
            } else if (animeRating > 50 && animeRating < 70) {
                animeStar1.classList.remove("far");
                animeStar1.classList.add("fas");
                animeStar2.classList.remove("far");
                animeStar2.classList.add("fas");
                animeStar3.classList.remove("far");
                animeStar3.classList.add("fas");
            } else if (animeRating > 70 && animeRating < 90) {
                animeStar1.classList.remove("far");
                animeStar1.classList.add("fas");
                animeStar2.classList.remove("far");
                animeStar2.classList.add("fas");
                animeStar3.classList.remove("far");
                animeStar3.classList.add("fas");
                animeStar4.classList.remove("far");
                animeStar4.classList.add("fas");
            } else if (animeRating > 90 && animeRating <= 100) {
                animeStar1.classList.remove("far");
                animeStar1.classList.add("fas");
                animeStar2.classList.remove("far");
                animeStar2.classList.add("fas");
                animeStar3.classList.remove("far");
                animeStar3.classList.add("fas");
                animeStar4.classList.remove("far");
                animeStar4.classList.add("fas");
                animeStar5.classList.remove("far");
                animeStar5.classList.add("fas");
            };

            // display video of the anime
            animeVidContainer.classList = "container is-centered";
            animeContainer.appendChild(animeVidContainer);

            animeVid.setAttribute("id", "anime-video");
            animeVid.setAttribute("src", "https://www.youtube.com/embed/" + animeResponse.data[0].attributes.youtubeVideoId + "?controls=1");
            animeVid.setAttribute("alt", "Trailer for " + gameName);
            animeVidContainer.appendChild(animeVid);

            // display description
            animeDescription.setAttribute("id", "anime-description");
            animeDescription.classList = "container has-text-left is-family-monospace is-size-6 has-text-black-bis";
            animeDescription.innerHTML = animeResponse.data[0].attributes.description;
            animeVidContainer.appendChild(animeDescription);
        })
        .catch(function (error) {
            console.log(error);
        });
};

var searchGame = function (event) {
    event.preventDefault();

    // remove previous anime results
    removeAnime();

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

function removeAnime() {
    animeContainer.remove()
    animeInfoEl.remove();
    animeVidContainer.remove();
};

searchForm.addEventListener("submit", searchGame);