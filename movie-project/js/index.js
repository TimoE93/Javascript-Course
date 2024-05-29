const global = {
  currentPage: window.location.pathname,
};

const imageBaseUrl = 'https://image.tmdb.org/t/p/w500/';

function init() {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      createSwiper();
      displayNowPlayingMovies();
      displayPopularMovies();
      break;
    case '/shows.html':
      console.log('Shows');
      break;
    case '/movie-details.html':
      displayMovieDetails();
      console.log('Movie details');
      break;
    case '/tv-details.html':
      console.log('TV details');
      break;
    case '/search.html':
      console.log('Search');
      break;
  }

  highlightActiveLink();
}

init();

function highlightActiveLink() {
  const links = document.querySelectorAll('.nav-link');
  links.forEach((link) => {
    if (link.getAttribute('href') === global.currentPage) {
      link.classList.add('active');
    }
  });
}

async function fetchAPIData(endpoint) {
  const API_KEY =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmY2M4MDhhYjkxMzRmZjFjZDExYWIzNzNiYzliYTMwNyIsInN1YiI6IjY2NTA4MjdkODJhMmZmYWRmMDliMzgzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vt6eLn7mOhDWHxW3bY0MsL1yUPSjjnqzMYCGDRdj1h8';

  const BASE_URL = 'https://api.themoviedb.org/3/';

  const response = await fetch(BASE_URL + endpoint, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });

  const data = await response.json();

  console.log(data);

  return data;
}

function createSwiper() {
  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    autoplay: {
      delay: 4000,
      disableOnInteraction: true,
    },

    spaceBetween: 30,
    direction: 'horizontal',
    loop: true,
    freeMode: true,
    breakpoints: {
      // when window width is >= 320px
      768: {
        slidesPerView: 4,
      },
    },
  });
}

async function displayNowPlayingMovies() {
  const data = await fetchAPIData(
    `discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3`
  );

  inserSwipperSlides(data.results);
}

async function displayPopularMovies() {
  const data = await fetchAPIData(`movie/popular`);
  console.log(data);

  insertCards(data.results);
}

function createSwipperSlide(data) {
  const swipperSlide = document.createElement('div');
  const swipperLink = document.createElement('a');
  const swipperImg = document.createElement('img');
  const rating = document.createElement('h4');

  swipperSlide.classList.add('swiper-slide');

  swipperLink.href = `/movie-details.html?id=${data.id}`;
  swipperImg.src = `${imageBaseUrl}${data.poster_path}`;

  swipperLink.appendChild(swipperImg);

  rating.classList.add('swiper-rating');
  rating.innerHTML = `<i class="fas fa-star text-secondary"></i> ${data.vote_average}/10`;

  swipperSlide.appendChild(swipperLink);
  swipperSlide.appendChild(rating);

  return swipperSlide;
}

function inserSwipperSlides(elements) {
  const swipper = document.querySelector('.swiper-wrapper');
  elements.forEach((element) => {
    swipper.appendChild(createSwipperSlide(element));
  });
}

function insertCards(elements) {
  const popularMovies = document.querySelector('.popular-movies');

  elements.forEach((element) => {
    popularMovies.appendChild(createCard(element));
  });
}

function createCard(data) {
  const card = document.createElement('div');
  const cardLink = document.createElement('a');
  const cardImage = document.createElement('img');
  const cardBody = document.createElement('div');

  card.classList.add('card');

  cardLink.href = `/movie-details.html?id=${data.id}`;
  cardImage.src = `${imageBaseUrl}${data.poster_path}`;

  cardBody.classList.add('card-body');

  cardBody.innerHTML = `<p class="title">${data.original_title}</p><p>Release: ${data.release_date}</p>`;

  cardLink.appendChild(cardImage);

  card.appendChild(cardLink);
  card.appendChild(cardBody);

  return card;
}

async function displayMovieDetails() {
  const id = getQueryParams('id');
  console.log(id);
}

function getQueryParams(param) {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);

  return params.get(param);
}
