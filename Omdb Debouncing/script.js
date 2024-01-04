const apiKey = "b428d3ba";
const searchContainer = document.getElementById("searchContainer");

function MakeApiCall() {
    let search = document.getElementById("search").value;

    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${search}`)
        .then(response => response.json())
        .then(resData => display(resData))
        .catch(error => alert(error));
}

let timerId;

function debounce(callBackfn, delay) {
    if (timerId) {
        clearTimeout(timerId);
    }

    timerId = setTimeout(function () {
        callBackfn();
    }, delay);
}

function display(movieData) {
    searchContainer.innerHTML = "";

    if (movieData.Response === "False") {
        let noData = document.createElement('div');
        noData.textContent = "No Result Found!";
        searchContainer.appendChild(noData);
    } else {
        movieData.Search.forEach((movie) => {
            const card = document.createElement("div");
            card.className = "card";

            let poster = document.createElement("img");
            poster.src = movie.Poster;
            poster.className = "poster";

            let title = document.createElement("p");
            title.textContent = "Title : " + movie.Title;
            title.className = "title";

            let release = document.createElement("p");
            release.textContent = "Year : " + movie.Year;
            release.className = "rel";

            let id = document.createElement("p");
            id.textContent = "IMDB-ID : " + movie.imdbID;
            id.className = "id";

            let genre = document.createElement("p");
            genre.textContent = "Type : " + movie.Type;
            genre.className = "genre";

            card.append(poster, title, release, genre);
            searchContainer.appendChild(card);
        });
    }

    
    searchContainer.style.display = movieData.Search ? "block" : "none";
}


searchContainer.style.display = "none";
