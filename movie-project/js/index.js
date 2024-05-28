const movieDbBaseUrl = 'https://api.themoviedb.org/3/';
const imageBaseUrl = 'https://image.tmdb.org/t/p/w500/';

const apiKey =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmY2M4MDhhYjkxMzRmZjFjZDExYWIzNzNiYzliYTMwNyIsInN1YiI6IjY2NTA4MjdkODJhMmZmYWRmMDliMzgzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vt6eLn7mOhDWHxW3bY0MsL1yUPSjjnqzMYCGDRdj1h8';

const swiper = new Swiper('.swiper', {
  slidesPerView: 4,
  //   autoplay: {
  //     delay: 2500,
  //     disableOnInteraction: false,
  //   },

  spaceBetween: 30,
  // Optional parameters
  direction: 'horizontal',
  loop: true,

  // If we need pagination
  // pagination: {
  //   el: '.swiper-pagination',
  // },

  // // Navigation arrows
  // navigation: {
  //   nextEl: '.swiper-button-next',
  //   prevEl: '.swiper-button-prev',
  // },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});

async function getNowPlayingMovies() {
  const response = await fetch(
    movieDbBaseUrl +
      `discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );

  const data = await response.json();

  console.log(data);

  inserSwipperSlides(data.results);
}

getNowPlayingMovies();

function createSwipperSlide(data) {
  const swipperSlide = document.createElement('div');
  const swipperLink = document.createElement('a');
  const swipperImg = document.createElement('img');
  const rating = document.createElement('h4');

  swipperSlide.classList.add('swiper-slide');

  swipperLink.href = data.href = '';
  swipperImg.src = `${imageBaseUrl}${data.poster_path}`;

  swipperLink.appendChild(swipperImg);

  rating.classList.add('swiper-rating');
  rating.innerHTML = `<i class="fas fa-star text-secondary"></i> ${data.vote_average}/10`;

  swipperSlide.appendChild(swipperImg);
  swipperSlide.appendChild(rating);

  return swipperSlide;
}

async function inserSwipperSlides(elements) {
  const swipper = document.querySelector('.swiper-wrapper');
  elements.forEach((element) => {
    swipper.appendChild(createSwipperSlide(element));
  });
}
