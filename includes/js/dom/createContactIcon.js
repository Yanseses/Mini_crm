import { createElementsTags } from '../createElementsTags.js';

// Функция отрисовки иконки
export function createContactIcon(element){
    const icon = createElementsTags('li', ['table__icon-contact']);
    const contactText = createElementsTags('a', ['table__icon-value']);

    switch(element.type){
        case 'phone':
            contactText.setAttribute('href', `tel:${element.value}`);
            break;
        case 'mail':
            contactText.setAttribute('href', `mailTo:${element.value}`);
            break;
        case 'vk':
            contactText.setAttribute('href', `https://vk.com/${element.value}`);
            contactText.setAttribute('target', '_blank');
            break;
        case 'fb':
            contactText.setAttribute('href', `https://fb.com/profile.php?id=${element.value}`);
            contactText.setAttribute('target', '_blank');
            break;
        default:
            contactText.setAttribute('href', element.value);
            contactText.setAttribute('target', '_blank');
            }

    icon.classList.add(`table__icon-contact--${element.type}`);
    contactText.textContent = element.value;
    icon.append(contactText);
    return icon;
    }
