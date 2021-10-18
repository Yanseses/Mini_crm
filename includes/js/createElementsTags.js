// Функция для создания элементов
export function createElementsTags(tag, className = [], settings = null, text = null){
    const element = document.createElement(tag);

    element.classList.add(...className);

    if(settings !== null){
        for(let key in settings){
            element.setAttribute(key, settings[key]);
            }
        }

    if(text !== null){
      element.textContent = text;
      }

    return element;
    }
