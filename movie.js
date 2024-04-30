// API 요청 옵션 설정
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMmM4Y2MwZGRlOTRhODE4YWJlYWYyYjIxNTVhYjBiOSIsInN1YiI6IjY2MjlmNGIzNTBmN2NhMDBiNWM4NmNjOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ia_OR4g3huE6TK64CFT5a2qJZalqQS5K3OnxiD55pLI"
  }
};

fetch("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1", options)
  .then((response) => response.json())
  .then((data) => {
    const movies = data.results;
    const mycards = document.querySelector(".myCards");

    let row = document.createElement("div");
    row.classList.add("row", "row-cols-1", "row-cols-md-4", "g-4");

    movies.forEach((movie) => {
      const card = document.createElement("div");
      card.classList.add("col");
      card.innerHTML = `
                <div class="card">
                    <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" class="card-img-top movie-img" alt="${movie.title}" data-id="${movie.id}">
                    <div class="card-body">
                        <h5 class="card-title">${movie.title}</h5>
                        <p class="card-text">${movie.overview}</p>
                        <p class="card-text">평점: ${movie.vote_average}</p>
                       
                    </div>
                </div>
            `;
      row.appendChild(card);

      if (row.children.length === 4) {
        mycards.appendChild(row);
        row = document.createElement("div");
        row.classList.add("row", "row-cols-1", "row-cols-md-4", "g-4");
      }
    });

    const movieImages = document.querySelectorAll(".movie-img");
    movieImages.forEach((image) => {
      image.addEventListener("click", () => {
        const movieId = image.dataset.id;
        alert(`영화의 ID는 ${movieId} 입니다.`);
      });
    });
  })
  .catch((err) => console.error(err));

const searchInput = document.getElementById("searchInput");
const searchButton = document.querySelector(".btn-outline-secondary");

searchButton.addEventListener("click", function () {
  const searchTerm = searchInput.value.trim().toLowerCase();

  if (searchTerm === "") {
    alert("검색어를 입력하세요.");
    return;
  }

  const cards = document.querySelectorAll(".card");

  // 카드를 순회하며 검색어와 일치하는 영화만 표시하기
  cards.forEach((card) => {
    // 카드에 있는 영화 제목 가져오기
    const cardTitle = card.querySelector(".card-title").textContent.trim().toLowerCase();

    // 검색어와 일치하는 경우 해당 카드를 표시
    if (cardTitle.includes(searchTerm)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});
