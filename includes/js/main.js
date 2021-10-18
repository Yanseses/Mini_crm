import { createPopUp } from './dom/createPopUp.js';
import { renderTable } from './dom/renderTable.js';
import { STYLES_CONST, POPUP_CONST  } from './constants.js';
import { fillPopUp } from './dom/fillPopUp.js';
import { getElementData } from './data.js';

(() => {
    const serchInput = document.querySelector('.header__filter');
    const thead = document.querySelector('.table__head');
    const addedBtn = document.getElementById('added-btn');
    const tableBody = document.querySelector('.table__body');
    const body = document.getElementById('body');
    const createdPopUp = createPopUp(body);
    let timeout;

    // Отрисовка таблицы при загрузке
    renderTable(tableBody, createdPopUp);

    // При наличии хэша в урле открыть поп-ап с нужным айди
    if(location.hash){
        if(location.hash.substr(1) === 'undefined'){
            location.hash = STYLES_CONST.void;
            return;
            }
        let data = {}
        data['id'] = location.hash.substr(1);
        getElementData(data).then(i => {
            fillPopUp(createdPopUp, POPUP_CONST.headings.edit, POPUP_CONST.actions.delete, tableBody, i);
            createdPopUp.popUpWindow.classList.add('popup-active');
            });
        }

    // Форма поиска (поиск по ФИО и id)
    serchInput.oninput = () => {
        if (timeout !== 'undefined'){
            clearInterval(timeout);
            }
        timeout = setTimeout(() => {
            renderTable(tableBody, createdPopUp, serchInput.value);
            }, 300);
        }

    // Кнопка добавления пользователя
    addedBtn.addEventListener('click', function(e){
        e.preventDefault();

        fillPopUp(createdPopUp, POPUP_CONST.headings.new, POPUP_CONST.actions.cancel, tableBody);
        createdPopUp.popUpWindow.classList.add('popup-active');
        });

    // При клике на вариант сортировки, пересортировывать таблицу
    thead.addEventListener('click', function(e){
        if(e.target.id){
            // При наличии визуализации других фильтров - снимаем
            for (let i = 0; i < thead.children[0].children.length; i++) {
                let elem = thead.children[0].children[i];
                if(elem.classList.contains('sort-select') && elem.id !== e.target.id){
                    elem.classList.remove('sort-select');
                    elem.children[0].classList.remove('arrow-rotate');
                    break;
                    }
                }
            sort(e.target);
            }
        });

    function sort(row){
        row.classList.add('sort-select');
        row.children[0].classList.toggle('arrow-rotate');
        let sort;
        if(row.children[0].classList.contains('arrow-rotate')){
            sort = row.id + '-up';
            renderTable(tableBody, createdPopUp, sort);
            } else {
                sort = row.id + '-down';
                renderTable(tableBody, createdPopUp, sort);
                }
        }
})();
