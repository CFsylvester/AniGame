var gamespotKey = "e1c898ffd3a1cccaf5ff6ef297f51a43f05238a3";
var searchForm = document.querySelector("#search-form");
var searchBar = document.querySelector("#search-bar");
var contentEl = document.querySelector("#main-content");
var resultsContainerEL = document.querySelector("#results-container");
var GameColumnsContainerEl = document.querySelector("#game-columns-container");

// anime containervariables


function gameRequest(gameName) {
    var gameApi = "https://cors-anywhere.herokuapp.com/http://www.gamespot.com/api/games/?api_key=" + gamespotKey + "&filter=name:" + gameName + "&format=json";
    // fetch the response
    fetch(gameApi)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            console.log(response);
             //Clear gameColumnsContainerEl
            $(gameColumnsContainerEl).empty();
            for (var i = 0; i < 5; i++) {
                //gameColumnsContainerEl
                var gameColumnEl = document.createElement("div");
                gameColumnEl.setAttribute("id", "game-column");
                gameColumnEl.setAttribute("class", "column is-two-fifths has-background-grey-lighter is-family-monospace has-text-black-bis ");
                gameColumnsContainerEl.appendChild(gameColumnEl.i);
                //Columns 1 (baseSearchEl) Stores IMAGE and TITLE
                var baseSearchEl = document.createElement("div");
                baseSearchEl.setAttribute("id", "base-search");
                baseSearchEl.setAttribute("class", "columns is-vcentered");
                gameColumnEl.appendChild(baseSearchEl);
                //Columns 1 (baseSearchEl) Column 1 (columnImageEl) Stores Image Column 
                var columnImageEl = document.createElement("div");
                columnImageEl.setAttribute("id", "column-image");
                columnImageEl.setAttribute("class", "column is-one-fith");
                baseSearchEl.appendChild(columnImageEl);
                //Image
                var gameImg = document.createElement("img");
                gameImg.setAttribute("id", "game-image");
                gameImg.setAttribute("src", response.results[i].image.square_tiny);
                gameImg.setAttribute("alt", "Image of " + gameName);
                columnImageEl.appendChild(gameImg);
                //Columns 1 (baseSearchEl) Column 2 (gameHeaderEl) Stores Title and Rating
                var gameHeaderEl = document.createElement("div");
                gameHeaderEl.setAttribute("id", "game-header");
                gameHeaderEl.setAttribute("class", "column has-text-centered")
                baseSearchEl.appendChild(gameHeaderEl);
                //Title Text
                var gameTitleEl = document.createElement("h1");
                gameTitleEl.setAttribute("class", "title");
                gameHeaderEl.appendChild(gameTitleEl);
                var gameTitleText = document.createTextNode(response.results[i].name)
                gameTitleEl.appendChild(gameTitleText);

                //If Columns 1 (baseSearchEl) Clicked
                $("#base-search").click(function() {
                    //$(columnDescriptionEl).hide();
                    $(columnDescriptionEl).fadeToggle("slow");
                    //Create Columns 2 (baseClickEl)
                    var baseClickEl = document.createElement("div");
                    baseClickEl.setAttribute("id", "base-click");
                    baseClickEl.setAttribute("class", "columns is-mobile");
                    gameColumnEl.appendChild(baseClickEl);
                    //Create Columns 2 (baseClickEl) Column 1 For Description (columnDescriptionEl)
                    var columnDescriptionEl = document.createElement("div");
                    columnDescriptionEl.setAttribute("id", "column-description");
                    columnDescriptionEl.setAttribute("class", "column");
                    baseClickEl.appendChild(columnDescriptionEl);
                    //Game Stars Element
                    var gameStarsEl = document.createElement("div");
                    gameStarsEl.setAttribute("id", "game-stars");
                    gameStarsEl.setAttribute("class", "container has-text-centered");
                    columnDescriptionEl.appendChild(gameStarsEl);
                    //Game Stars
                    var gameTitleStarSpan = document.createElement("h3");
                    gameTitleStarSpan.setAttribute("class", "title has-text-centered is-size-3");
                    gameStarsEl.appendChild(gameTitleStarSpan);
                    var gameTitleStar1 = document.createElement("i");
                    var gameTitleStar2 = document.createElement("i");
                    var gameTitleStar3 = document.createElement("i");
                    var gameTitleStar4 = document.createElement("i");
                    var gameTitleStar5 = document.createElement("i");
                    gameTitleStar1.setAttribute("class", "fas fa-star");
                    gameTitleStar2.setAttribute("class", "fas fa-star");
                    gameTitleStar3.setAttribute("class", "fas fa-star");
                    gameTitleStar4.setAttribute("class", "fas fa-star");
                    gameTitleStar5.setAttribute("class", "fas fa-star");
                    gameTitleStarSpan.appendChild(gameTitleStar1);
                    gameTitleStarSpan.appendChild(gameTitleStar2);
                    gameTitleStarSpan.appendChild(gameTitleStar3);
                    gameTitleStarSpan.appendChild(gameTitleStar4);
                    gameTitleStarSpan.appendChild(gameTitleStar5);
                    //Summary Text
                    var gameSummary = document.createElement("p");
                    var gameSummaryText = document.createTextNode(response.results[0].description);
                    gameSummary.appendChild(gameSummaryText);
                    columnDescriptionEl.appendChild(gameSummary);
                });

            }

            // run gameName through animeRequest function
            animeRequest(gameName);
        })
        .catch(function (error) {
            console.log(error);
        });
};

function animeRequest(gameName) {

    var animeApi = "https://kitsu.io/api/edge/anime?";
    fetch(animeApi + "filter[text]=" + gameName)
        .then(function (animeResponse) {
            return animeResponse.json();
        })
        .then(function (animeResponse) {
            console.log(animeResponse);
            $("#results-container").empty();

            // convert game title and anime title to uppercase to check for correct titles
            var animeName = animeResponse.data[0].attributes.canonicalTitle;
            var animeNameUp = animeName.toUpperCase();
            var gameNameUp = gameName.toUpperCase();

            if (animeNameUp.includes(gameNameUp) === false) {
                $("#anime-alert-header").html("No Anime Found...");
                $("#anime-alert-icon").removeClass("fa-laugh-beam");
                $("#anime-alert-icon").addClass("fa-sad-cry");
                $("#anime-alert").addClass("is-active");
                $("#anime-alert-text").html("<p>There weren't any Anime found for " + gameName + ".</p>");
                $("#anime-alert-btn").on("click", function () {
                    ($("#anime-alert").removeClass("is-active"));
                });
                return;
            }

            for (var i = 0; i < 5; i++) {
                var animeName = animeResponse.data[i].attributes.canonicalTitle;
                var animeNameUp = animeName.toUpperCase();
                var gameNameUp = gameName.toUpperCase();

                if (animeNameUp.includes(gameNameUp) === false) {
                    $("#anime-alert-header").html("Some Anime Were Found!");
                    $("#anime-alert-icon").removeClass("fa-sad-cry");
                    $("#anime-alert-icon").addClass("fa-laugh-beam");
                    $("#anime-alert").addClass("is-active");
                    $("#anime-alert-text").html("<p>There were " + i + " Anime found for " + gameName + "! Not bad!</p>");
                    $("#anime-alert-btn").on("click", function () {
                        ($("#anime-alert").removeClass("is-active"));
                    });
                    return;
                }

                // Kitsu API results related to gameName value
                // create a container for all the kitsu api results
                var animeContainer = document.createElement("div");
                animeContainer.setAttribute("id", "anime-container");
                animeContainer.classList = "column anime-class is-three-fifths is-offset-one-fifth has-text-centered is-family-monospace has-background-grey-lighter has-text-black-bis";
                resultsContainerEL.appendChild(animeContainer);

                // div to contain title, rating and //description
                var animeInfoEl = document.createElement("div");
                animeInfoEl.setAttribute("id", "anime-info");
                animeInfoEl.classList = "container has-text-centered is-size-5";
                animeInfoEl.innerHTML = "Anime found for " + gameName + ":";
                animeContainer.appendChild(animeInfoEl);

                // display title 
                var animeTitle = document.createElement("h3");
                animeTitle.setAttribute("id", "anime-title");
                animeTitle.classList = "title has-text-centered is-size-3";
                animeTitle.innerHTML = animeResponse.data[i].attributes.canonicalTitle;
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
                var animeRating = animeResponse.data[i].attributes.averageRating;
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
                var animeVidContainer = document.createElement("div");
                animeVidContainer.classList = "container is-centered";
                animeContainer.appendChild(animeVidContainer);

                var animeVid = document.createElement("iframe");
                animeVid.setAttribute("id", "anime-video");
                animeVid.setAttribute("src", "https://www.youtube.com/embed/" + animeResponse.data[i].attributes.youtubeVideoId + "?controls=1");
                animeVid.setAttribute("allowfullscreen", "");
                animeVid.setAttribute("alt", "Trailer for " + gameName);
                animeVidContainer.appendChild(animeVid);

                // display description
                var animeDescription = document.createElement("p");
                animeDescription.setAttribute("id", "anime-description");
                animeDescription.classList = "container has-text-left is-family-monospace is-size-6 has-text-black-bis";
                animeDescription.innerHTML = animeResponse.data[i].attributes.description;
                animeVidContainer.appendChild(animeDescription);
            }
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
