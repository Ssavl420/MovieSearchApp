const movie_To_Search_Node = document.querySelector('#searchMovie');
const search_Btn = document.querySelector('#searchBtn');
const movieList = document.querySelector('#listFilms')

let movies = JSON.parse(localStorage.getItem("movies"));

// const params = new URLSearchParams(location.search);
// const id = params.get('name');

renderMoviesList();
document.querySelector('#searchMovieForm').addEventListener('submit', searchBtnHeandler);

function searchBtnHeandler() {
   event.preventDefault();

   if (validation(this) == false) {
      movie_To_Search_Node.focus();
      console.error('Валидация НЕ пройдена')
      return null;
   }
   console.log('Валидация пройдена')
   
   localStorage.clear();
   searchMovies();
   // clearValue(movie_To_Search_Node);
   // renderMoviesList();
};
// Валидация поля ввода
function validation(form) {

   function createError(input, text) {
      const parent = input.parentNode;
      const errorLabel = document.createElement('label');

      errorLabel.classList.add('error__label');
      errorLabel.innerText = text;
      parent.appendChild(errorLabel);
      parent.classList.add('error');
   }
   function removeError(input) {
      const parent = input.parentNode;
      if (parent.classList.contains('error')) {
         parent.querySelector('.error__label').remove()
         parent.classList.remove('error')
      }
   }

   let result = true;


   const allInputs = form.querySelectorAll('input');
   const pattern = /[^а-яА-ЯёЁ0-9\s\.\,\:\!\?\(\)\/]+/g;

   for (const input of allInputs) {
      removeError(input);
      if(input.value == "") {
         createError(input, 'Поле не заполнено')
         animateElement(input);
         result = false;
      }
      if(!input.value == "" && input.value.trim() == "") {
         createError(input, 'Недопустимые символы')
         clearValue(input)
         animateElement(input);
         result = false;
      }
      if(!input.value == "" && pattern.test(input.value)) {
         createError(input, 'Недопустимые или иностранные символы')
         clearValue(input)
         animateElement(input);
         result = false;
      }
   }

   return result;
};
//Поиск фильма 
function searchMovies() {
   const movieTitle = movie_To_Search_Node.value;
   search_Btn.style.cssText = 'background-color: gray;';
   search_Btn.setAttribute("disabled", "disabled");
   fetch(`https://api.kinopoisk.dev/v1.3/movie?name=${movieTitle}&poster.url=%21null`, {   // Ограничение 200 запросов в сутки!!
      headers: {
         'X-API-KEY': 'V6697KC-1MZM6PN-HWFGXH5-FCMKD9X',
      }
   })
   .then (data => data.json())
   .then (response => {
      movies = response.docs;
      localStorage.setItem("movies", JSON.stringify(movies));
      console.log(response.docs[0].name)

      search_Btn.removeAttribute("disabled", "disabled");
      search_Btn.style.cssText = "";
      clearValue(movie_To_Search_Node);
      renderMoviesList();
   })
};
// Очищение поля input
function clearValue(element) {
   element.value = null;
};
// Анимация элемента
function animateElement(element) {
   element.classList.add('animation')
   
   setTimeout(() => {
      element.classList.remove('animation')
   }, 400);
};
function renderMoviesList() {
   console.log(movies);
   // console.log(movies[0][0].poster.url)
   console.log(movies.length)
   // let li = document.createElement('li');
   // li.classList = 'item';
   // movieList.appendChild(li);

   let movieListHTML = '';
   for (let i = 0; i < movies.length; i++) {
      movieListHTML +=
      `<li class="film">
         <div class="film__inner">
            <div class="film__poster">
               <img src="${movies[i].poster.url}"
                  alt="${movies[i].name}">
               <p class="rating" title="Рейтинг ImDB">${movies[i].rating.imdb}</p>
            </div>
            <div class="film__body">
               <p class="title">${movies[i].name}</p>
               <p class="years">${movies[i].year}</p>
               <p class="genres">${movies[i].genres[0].name}</p>
            </div>
         </div>
      </li>`
   }
   movieList.innerHTML = movieListHTML;
}

// `<li class="film">
// <div class="film__inner">
//    <div class="film__poster">
//       <img src="${movies[0][i].poster.url}"
//          alt="${movies[0][i].name}">
//       <p class="rating" title="Рейтинг ImDB">${movies[0][i].rating.imdb}</p>
//    </div>
//    <div class="film__body">
//       <p class="title">${movies[0][i].name}</p>
//       <p class="years">${movies[0][i].releaseYears[0].start} - ${movies[0][i].releaseYears[0].end}</p>
//       <p class="type">${movies[0][i].type}</p>
//       <p class="genres">${movies[0][i].genres[0].name}, ${movies[0][i].genres[1].name}</p>
//    </div>
// </div>
// </li>`