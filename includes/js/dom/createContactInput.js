import { createElementsTags } from '../createElementsTags.js';
import { POPUP_CONST, STYLES_CONST } from '../constants.js';

// Создание элемента контакт в поп-апе
export function createContactInput(container, count = '', info = ''){
    const label = createElementsTags('label', ['contacts'], {id: count});

    const typeContainer = createElementsTags('div', ['contacts__type-container']);
    const button = createElementsTags('button', ['contacts__type-button'], null, POPUP_CONST.contacts.default);
    const list = createElementsTags('ul', ['contacts__type-list']);
    const phone = createElementsTags('li', ['contacts__type-item'], {id: 'phone'}, POPUP_CONST.contacts.phone);
    const mail = createElementsTags('li', ['contacts__type-item'], {id: 'mail'}, POPUP_CONST.contacts.mail);
    const fb = createElementsTags('li', ['contacts__type-item'], {id: 'fb'}, POPUP_CONST.contacts.Fb);
    const Vk = createElementsTags('li', ['contacts__type-item'], {id: 'vk'}, POPUP_CONST.contacts.Vk);
    const other = createElementsTags('li', ['contacts__type-item'], {id: 'another'}, POPUP_CONST.contacts.another);

    const input = createElementsTags('input', ['contacts__input'], {type: 'text', autocomplete: 'off', placeholder: 'Введите данные контакта'});
    const cross = createElementsTags('button', ['contacts__cross'], {type: 'button'});
    const crossText = createElementsTags('p', ['contacts__cross-text'], null, POPUP_CONST.contacts.delete);

    cross.append(crossText);
    list.append(phone, mail, fb, Vk, other);
    typeContainer.append(button, list);
    label.append(typeContainer, input);
    container.contactContainer.append(label);

    // Отрисовка блока контактов
    if(info){
        let arrayItems = [];
        arrayItems.push(phone, mail, fb, Vk, other);
        arrayItems.forEach(e => {
            if(info.type == e.id){
                e.classList.add('contacts__type-item--selected');
                button.setAttribute('id', e.id);
                button.textContent = e.textContent;
                }
            });
        input.value = info.value;
        label.append(cross);
        }

    // Поворот стрелки
    button.addEventListener('click', function(e){
        e.preventDefault();

        list.classList.toggle('type-list-active');
        if(list.classList.contains('type-list-active')){
            button.classList.add('arrow-rotate');
            } else {
                button.classList.remove('arrow-rotate');
            }
        });

    // Нажатие на крестик удаления контакта
    cross.addEventListener('click', function(){
        if(container.contactContainer.children.length == 1){
            container.contactFieldset.style = STYLES_CONST.void;
            }
        label.remove();
        if(container.contactContainer.children.length < 10){
            container.addedContact.style = STYLES_CONST.void;
            }
        });

    // Изменение выпадающего окна с типом
    list.addEventListener('click', function(e){
        if(e.target.classList.contains('contacts__type-item')){
            for (let i = 0; i < list.children.length; i++) {
                if(list.children[i].classList.contains('contacts__type-item--selected')){
                    list.children[i].classList.remove('contacts__type-item--selected');
                    break;
                    }
                }
            selectVal(e.target);
            }
        });

    function selectVal(val){
        val.classList.add('contacts__type-item--selected');
        button.textContent = val.textContent;
        button.setAttribute('id', val.id);
        if(button.style){
            button.style = STYLES_CONST.void;
            }
        switch(val.id){
            case 'phone':
                input.placeholder = '+7 (123) 456-78-90';
                break;
            case 'mail':
                input.placeholder = 'example@example.ru'
                break;
            case 'fb':
                input.placeholder = 'Введите id пользователя'
                break;
            case 'vk':
                input.placeholder = 'Введите id пользователя'
                break;
            case 'another':
                input.placeholder = 'Вставьте ссылку контакта'
                break;
            default:
                input.placeholder = 'Введите данные контакта'
            }
        }
    }
