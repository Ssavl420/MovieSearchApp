// Валидация поля ввода
export function validation(form) {
   let result = true;

   const allInputs = form.querySelectorAll('input');
   const pattern = /[^а-яА-ЯёЁ0-9\s\.\,\:\!\?\/]+/g;

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
}

// Создание элементов
export function newElement(options) {
   const el = document.createElement(options.tag);

   for (const[key, value] of Object.entries(options.params)) {
      if (key == 'classList') {
         for (const newClass of value) {
            el.classList.add(newClass)
         }
      } if (el[key] = !value) {
         // options.params.value = null
         console.log(options.params)
         
         console.log(`${el[key]} innerHTML EMPTY!`)
      } else {
         el[key] = value
      }
   }

   if (options.elements !== undefined) {
      for (const element of options.elements) {
         newElement({
            tag: element.tag,
            params: element.params,
            parent: el
         })
      }
   }

   if (options.parent !== undefined) options.parent.append(el)

   return el;
}

// Удаление ошибки
export function removeError(input) {
   const parent = input.parentNode;
   if (parent.classList.contains('error')) {
      parent.querySelector('.error__label').remove()
      parent.classList.remove('error')
   }
}

// Создание ошибки
export function createError(input, text) {
   const parent = input.parentNode;
   const errorLabel = document.createElement('label');

   errorLabel.classList.add('error__label');
   errorLabel.innerText = text;
   parent.appendChild(errorLabel);
   parent.classList.add('error');
}

// Анимация элемента
export function animateElement(element) {
   element.classList.add('animation')
   
   setTimeout(() => {
      element.classList.remove('animation')
   }, 400);
}