// API 요청 옵션 설정
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMmM4Y2MwZGRlOTRhODE4YWJlYWYyYjIxNTVhYjBiOSIsInN1YiI6IjY2MjlmNGIzNTBmN2NhMDBiNWM4NmNjOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ia_OR4g3huE6TK64CFT5a2qJZalqQS5K3OnxiD55pLI'
    }
};

// 영화 API 요청
fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    // API 응답 처리
    .then(response => response.json())
    .then(data => {
        // API 응답에서 영화 목록 추출
        const movies = data.results;
        // 카드를 표시할 부모 요소 선택
        const mycards = document.querySelector('.myCards');

        // 영화 목록을 순회하며 카드 생성
        // 한 행에 최대 4개의 카드가 표시되도록 함
        let row = document.createElement('div'); // 행 요소 생성
        row.classList.add('row', 'row-cols-1', 'row-cols-md-4', 'g-4'); // 부트스트랩 그리드 클래스 추가

        movies.forEach(movie => {
            // 카드 요소 생성
            const card = document.createElement('div');
            card.classList.add('col'); // 카드 요소에 그리드 클래스 추가
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
            row.appendChild(card); // 카드를 행에 추가

            // 한 행에 4개의 카드가 표시되면 새로운 행 생성
            if (row.children.length === 4) {
                mycards.appendChild(row); // 기존 행을 부모 요소에 추가
                row = document.createElement('div'); // 새로운 행 요소 생성
                row.classList.add('row', 'row-cols-1', 'row-cols-md-4', 'g-4'); // 부트스트랩 그리드 클래스 추가
            }
        });


        // 이미지 클릭 시 영화 ID 알림창 표시
        const movieImages = document.querySelectorAll('.movie-img');
        movieImages.forEach(image => {
            image.addEventListener('click', () => {
                const movieId = image.dataset.id;
                alert(`영화의 ID는 ${movieId} 입니다.`);
            });
        });

    })
    .catch(err => console.error(err)); // 오류 처리


//검색 구현
// 1. 영화 카드 리스트 선택하기
// 2. 영화 카드 리스트 입력값에 따라서 포함여부 확인
// --> 여기다가 한글로 짜보기
// input 값을 영화 title에 대조해서 겹치는게 있으면 가져오기???


const searchInput = document.getElementById('searchInput');
const searchButton = document.querySelector('.btn-outline-secondary');

// 영화 검색 버튼 클릭 이벤트 리스너 추가
searchButton.addEventListener('click', function () {
    // 입력된 영화 제목 가져오기
    const searchTerm = searchInput.value.trim().toLowerCase();

    // 검색어가 비어 있는지 확인
    if (searchTerm === "") {
        alert("검색어를 입력하세요.");
        return;
    }

    // 알림창에 검색어 표시(갑자기 searchTerm 값이 안떠서 수정함)
    alert(searchTerm);
});
//입력 까지 완료 하고 alert 까지 확인 완료 했고!!
//이제 검색창에 비슷한게 있으면 가지고 오면됨!!
//for문으로 반복해서 제목이 비슷할경우 가져오기
// 26일 날 해야지!!


