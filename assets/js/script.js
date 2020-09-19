var gamespotKey = "e1c898ffd3a1cccaf5ff6ef297f51a43f05238a3";
var searchForm = document.querySelector("#search-form");
var searchBar = document.querySelector("#search-bar");
var contentEl = document.querySelector("#main-content");
var resultsContainer = document.createElement("section");

function gameRequest(gameName) {
    var gameApi = "https://cors-anywhere.herokuapp.com/http://www.gamespot.com/api/games/?api_key=" + gamespotKey + "&filter=name:" + gameName + "&format=json";
    // fetch the response
    fetch(gameApi)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            // log the fetch response
            console.log(response);

            // append results container to hold fetch results
            resultsContainer.classList = "section";
            resultsContainer.setAttribute("id", "results-container");
            contentEl.appendChild(resultsContainer);

            // add endpoints from the Gamespot API to insert into HTML elements

            // display main image of the game
            var gameImg = document.createElement("img");
            gameImg.setAttribute("id", "game-image");
            gameImg.setAttribute("src", response.results[0].image.square_small);
            gameImg.setAttribute("alt", "Image of " + gameName);
            resultsContainer.appendChild(gameImg);

            // fetch gameName from kitsu api
            return fetch("https://kitsu.io/api/edge/anime?filter[text]=" + gameName);
        })
        .then(function (animeResponse) {
            return animeResponse.json();
        })
        .then(function (animeResponse) {
            console.log(animeResponse);
            // Kitsu API results related to gameName value

            // create a container for all the kitsu api results
            var animeContainer = document.createElement("div");
            animeContainer.setAttribute("id", "anime-container");
            animeContainer.classList = "columns is-vcentered anime-class has-background-grey-lighter";
            resultsContainer.appendChild(animeContainer);

            // div to contain title, rating and description
            var animeInfoEl = document.createElement("div");
            animeInfoEl.setAttribute("id", "anime-info");
            animeInfoEl.classList = "column container is-family-monospace is-size-5 has-text-black-bis";
            animeContainer.appendChild(animeInfoEl);

            // display title 
            var animeTitle = document.createElement("h2");
            animeTitle.setAttribute("id", "anime-title");
            animeTitle.classList = "column container has-text-centered is-family-monospace is-size-3 has-text-black-bis";
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
            animeInfoEl.appendChild(animeRatingEl);
            animeRatingEl.appendChild(animeStar1);
            animeRatingEl.appendChild(animeStar2);
            animeRatingEl.appendChild(animeStar3);
            animeRatingEl.appendChild(animeStar4);
            animeRatingEl.appendChild(animeStar5);

            // create an if else statement to highlight or fill star icons depending on value of animeRating
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

            // display description
            var animeDescription = document.createElement("p");
            animeDescription.setAttribute("id", "anime-description");
            animeDescription.classList = "column container has-text-left is-family-monospace is-size-6 has-text-black-bis";
            animeDescription.innerHTML = animeResponse.data[0].attributes.description;
            animeInfoEl.appendChild(animeDescription);

            // display video of the anime
            var animeVidContainer = document.createElement("div");
            animeVidContainer.classList = "is-centered";
            animeContainer.appendChild(animeVidContainer);

            var animeVid = document.createElement("iframe");
            animeVid.setAttribute("id", "anime-video");
            animeVid.classList = "column is-centered";
            animeVid.setAttribute("src", "https://www.youtube.com/embed/" + animeResponse.data[0].attributes.youtubeVideoId + "?controls=1");
            animeVid.setAttribute("width", "560px");
            animeVid.setAttribute("height", "340px");
            animeVid.setAttribute("alt", "Trailer for " + gameName);
            animeVidContainer.appendChild(animeVid);

        })
        .catch(function (error) {
            console.log(error);
            alert("Looks like there's an error :(");
        });
};

var searchGame = function (event) {
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