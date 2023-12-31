const input = document.querySelector('#movieTitle');
const movieList = document.querySelector('#listFilms')

const addMovie = document.querySelector('#addMovie')

const LS = localStorage;
const MOVIES_STORAGE_LABEL = 'moviesToWatch';

let moviesToWatch = [];
//=======================================================================================

addMovie.addEventListener('submit', addMovieHandler)
renderMovieList();
//=======================================================================================

// Валидация формы (инпут)
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
   const pattern = /[^а-яА-ЯёЁa-zA-Z0-9\s]\.\,\:\!\?\(\)\/]+/g;

   for (const input of allInputs) {
      removeError(input);
      if(input.value == "") {
         createError(input, 'Поле не заполнено')
         result = false;
      }
      if(!input.value == "" && input.value.trim() == "") {
         createError(input, 'Пробел, не фильм')
         clearValue(input)
         result = false;
      }
      if(!input.value == "" && pattern.test(input.value)) {
         createError(input, 'Недопустимые символы')
         clearValue(input)
         result = false;
      }
   }
   return result;
} 

// Запуск: чтение инпута, создание объекта, запись в LS, показ данных
function addMovieHandler(event) {
   event.preventDefault();

   if (validation(this) == false) {
      input.focus();
      return null;
   }

   const title = input.value;
   let checkboxValue = 'unchecked';

   createMovie(title, checkboxValue);
   clearValue(input);
   recLS(MOVIES_STORAGE_LABEL, moviesToWatch);
   renderMovieList();
   input.focus();
}

// Вывод movieList
function renderMovieList() {
   input.focus();
   getMoviesArray(MOVIES_STORAGE_LABEL, moviesToWatch)
   renderMovieItem()
};

// Получение массива
function getMoviesArray(key, array) {
   if (!LS.getItem(key) == []) {moviesToWatch = readLS(key)}
   else {array = []}
   return array;
};

// Отрисовка movieItem
function renderMovieItem() {
   movieList.innerHTML = '';
   for (let i = 0; i < moviesToWatch.length; i++) {


      let film = document.createElement('li');
      let filmInner = document.createElement('label')
      let filmCheckbox = document.createElement('input');
      let fakeCheckbox = document.createElement('span');
      let filmName = document.createElement('span');
      let filmBtn = document.createElement('div');

      film.className = 'film';
      filmInner.className = 'film__inner';
      filmCheckbox.className = 'film__checkbox';
      fakeCheckbox.className = 'fake__checkbox';
      filmName.className = 'film__name';
      filmBtn.className = 'film__btn';

      film.setAttribute('id', i);
      filmCheckbox.setAttribute('id', i);
      filmCheckbox.setAttribute('type', 'checkbox');
      filmCheckbox.setAttribute(`${moviesToWatch[i].checkboxValue}`, '');
      filmBtn.setAttribute('id', i);
      filmBtn.setAttribute('title', 'Удалить');

      movieList.appendChild(film);
      film.appendChild(filmInner);
      filmInner.appendChild(filmCheckbox);
      filmInner.appendChild(fakeCheckbox);
      filmInner.appendChild(filmName);
      film.appendChild(filmBtn);

      filmName.innerHTML = `${moviesToWatch[i].title}`;
      
      filmCheckbox.addEventListener('click', () => {
         if (moviesToWatch[i].checkboxValue === 'unchecked') {moviesToWatch[i].checkboxValue = 'checked'}
         else {moviesToWatch[i].checkboxValue = 'unchecked'}
         recLS(MOVIES_STORAGE_LABEL, moviesToWatch)
      })
      
      filmBtn.addEventListener('click', () => {
         removeFilm(i);
         recLS(MOVIES_STORAGE_LABEL, moviesToWatch);
         renderMovieItem();
      })
   }
};

// Создание объекта "фильм"
function createMovie(title, checkboxValue) {
   const movie = {
      title: title,
      checkboxValue: checkboxValue,
   }
   moviesToWatch.unshift(movie);
   return movie;
};

// Очищение поля input
function clearValue(element) {
   element.value = null;
};

// Запись данных в localStorage
function recLS(key, value) {
   return LS.setItem(key, JSON.stringify(value))
};

// Чтение данных из localStorage
function readLS(key) {
   return JSON.parse(LS.getItem(key))
};

// Удаление элемента из списка
function removeFilm(i) {
   moviesToWatch.splice(i,1)
}
//-------------------------------------------------------------------------------------------------

// Отрисовка movieList
// function renderMovieItem(array) {
//    let movieListHTML = '';
//
//    for (let i = 0; i < array.length; i++) {
//       movieListHTML += `
//          <li id="${i}" class="film">
//             <label class="film__inner">
//                <input id="${i}" class="film__checkbox" type="checkbox" ${array[i].checkboxValue}>
//                <span class="fake__checkbox"></span>
//                <span class="film__name">${array[i].title}</span>
//             </label>
//             <div id="${i}" class="film__btn" title="Удалить"></div>
//          </li>
//       `
//    }
//    movieList.innerHTML = movieListHTML;
// };

// Сохранение по клику на чекбокс значения checkbox в localStorage или удаление фильма
// movieList.addEventListener ('click', (event) => {
//    if (event.target.classList.contains('film__checkbox')) {
//       if (movies[event.target.id].checkboxValue === 'unchecked') {movies[event.target.id].checkboxValue = 'checked'}
//       else {movies[event.target.id].checkboxValue = 'unchecked'}
//       recLS(MOVIES_STORAGE_LABEL, movies)
//    } 
//    if (event.target.classList.contains('film__btn')) {
//       removeFilm(movies)
//       recLS(MOVIES_STORAGE_LABEL, movies)
//       renderMovieList();
//    }
// });

// function createElement (tag, className, id = '', text = '') {
//    tag = document.createElement(tag);
//    tag.setAttribute('class', className)
//    tag.setAttribute('id', id)
//    tag.innerText = text;

//    return tag;
// }
// function createInputElement (tag, className, id = '', type = '') {
//    tag = document.createElement(tag);
//    tag.setAttribute('class', className)
//    tag.setAttribute('id', id)
//    tag.setAttribute('type', type)

//    return tag;
// }

