const movie_To_Search_Node = document.querySelector('#searchMovie');
const search_Btn = document.querySelector('#searchBtn');
const movieList = document.querySelector('#listFilms')

let movies = JSON.parse(localStorage.getItem("movies"));

// const params = new URLSearchParams(location.search);
// const id = params.get('name');

renderMoviesList();
document.querySelector('#searchMovieForm').addEventListener('submit', searchBtnHeandler);

function searchBtnHeandler(event) {
   alert("запуск searchBtnHeandler");
   event.preventDefault();

   if (validation(this) == false) {
      movie_To_Search_Node.focus();
      console.error('Валидация НЕ пройдена')
      return null;
   }
   console.log('Валидация пройдена')
   
   localStorage.clear();
   alert("localStorage очищен");
   searchMovies();
};
// Валидация поля ввода
function validation(form) {
   alert("запуск validation");

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
   alert("окончание validation");
   return result;
};
//Поиск фильма 
function searchMovies() {
   alert("запуск searchMovies");
   const movieTitle = movie_To_Search_Node.value;
   removeError(movie_To_Search_Node);
   search_Btn.style.cssText = 'background-color: gray;';
   search_Btn.setAttribute("disabled", "disabled");
   alert("Кнопка отправки disabled");
   fetch(`https://api.kinopoisk.dev/v1.3/movie?name=${movieTitle}&poster.url=%21null`, {   // Ограничение 200 запросов в сутки!!
      method: 'GET',
      headers: {
         'X-API-KEY': 'V6697KC-1MZM6PN-HWFGXH5-FCMKD9X',
      }
   })
   .then (data => {
      alert("fetch data");
      if (data.status !== 200) {
         search_Btn.removeAttribute("disabled", "disabled");
         search_Btn.style.cssText = "";
         animateElement(movie_To_Search_Node);
         createError(movie_To_Search_Node, 'Ошибка на сервере, попробуйте еще раз позже!')
         clearValue(movie_To_Search_Node);
         movie_To_Search_Node.focus();
         return null;
      }
      return data.json()})
   .then (response => {
      if (response.docs.length < 1) {
         search_Btn.removeAttribute("disabled", "disabled");
         search_Btn.style.cssText = "";
         animateElement(movie_To_Search_Node);
         createError(movie_To_Search_Node, 'Неизвестная ошибка, попробуйте еще раз!')
         clearValue(movie_To_Search_Node);
         movie_To_Search_Node.focus();
         return null
      }
      alert("Response получен");
      movies = response.docs;
      localStorage.setItem("movies", JSON.stringify(movies));
      alert("Response записан в localStorage");
      console.log(response.docs[0].name)

      search_Btn.removeAttribute("disabled", "disabled");
      search_Btn.style.cssText = "";
      clearValue(movie_To_Search_Node);
      alert("Очищено поле input");
      renderMoviesList();
   })
};
// Очищение поля input
function clearValue(element) {
   alert("запуск clearValue");
   element.value = null;
};
// Анимация элемента
function animateElement(element) {
   alert("запуск animateElement");
   element.classList.add('animation')
   
   setTimeout(() => {
      element.classList.remove('animation')
   }, 400);
   alert("окончание работы animateElement");
};
function renderMoviesList() {
   alert("запуск renderMovieList");
   if (!movies) {
      return null
   }
   console.log(movies);
   console.log(movies.length)
   // let li = document.createElement('li');
   // li.classList = 'item';
   // movieList.appendChild(li);

   let movieListHTML = '';
   for (let i = 0; i < movies.length; i++) {
      movieListHTML +=
      `<li id="${[i]}" class="film">
         <div class="film__inner">
            <div class="film__poster">
               <img src="${movies[i]?.poster.url}"
                  alt="${movies[i]?.name}" title="${movies[i]?.name}">
               <p class="rating" title="Рейтинг IMDB">${movies[i]?.rating?.imdb}</p>
            </div>
            <div class="film__body">
               <div class="film__header">
                  <p class="title">${movies[i]?.name}</p>
                  <div class="film__info">
                     <p class="genres">${movies[i]?.genres[0]?.name}</p>
                     <p class="years">${movies[i]?.year}</p>
                  </div>
               </div>
               <p class="shortDescription">${movies[i]?.shortDescription}</p>
            </div>
         </div>
      </li>`
   }
   alert("Все циклы в renderMovieList пройдены");
   movieList.innerHTML = movieListHTML;
   alert("окончание работы renderMovieList");
}
function createError(input, text) {
   alert("запуск createError");
   const parent = input.parentNode;
   const errorLabel = document.createElement('label');

   errorLabel.classList.add('error__label');
   errorLabel.innerText = text;
   parent.appendChild(errorLabel);
   parent.classList.add('error');
   alert("окончание работы createError");
}
function removeError(input) {
   alert("запуск removeError");
   const parent = input.parentNode;
   if (parent.classList.contains('error')) {
      parent.querySelector('.error__label').remove()
      parent.classList.remove('error')
   }
   alert("окончание работы removeError");
}
const isMobile = {
   Android: function () {
      return navigator.userAgent.match(/Android/i);
   },
   BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
   },
   iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
   },
   Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
   },
   Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
   },
   any: function () {
      return (
         isMobile.Android() ||
         isMobile.BlackBerry() ||
         isMobile.iOS() ||
         isMobile.Opera() ||
         isMobile.Windows()
      );
   },
};

if (isMobile.any()) {
   document.body.classList.add("_touch");
} else {
   document.body.classList.add("_pc");
}

// `<li id="${[i]}" class="film">
//    <div class="film__inner">
//       <div class="film__poster">
//          <img src="${movies[i]?.poster.url}"
//             alt="${movies[i]?.name}" title="${movies[i]?.name}">
//          <p class="rating" title="Рейтинг IMDB">${movies[i]?.rating?.imdb}</p>
//       </div>
//       <div class="film__body">
//          <div class="film__header">
//             <p class="title">${movies[i]?.name}</p>
//             <div class="film__info">
//                <p class="genres">${movies[i]?.genres[0]?.name}</p>
//                <p class="years">${movies[i]?.year}</p>
//             </div>
//          </div>
//          <p class="shortDescription">${movies[i]?.shortDescription}</p>
//       </div>
//    </div>
// </li>`