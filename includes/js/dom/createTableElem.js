import { POPUP_CONST, STYLES_CONST, ACTION_CONST, HASH, STATUS } from '../constants.JS';
import { statusWindow } from './statusWindow.js';
import { getElementData } from '../data.js';
import { loader } from './loader.js';
import { createContactIcon } from './createContactIcon.js';
import { createElementsTags } from '../createElementsTags.js';
import { fillPopUp } from './fillPopUp.js';

// Создание строки таблицы с данными
export function createTableElem(tbody, data, createdPopUp){
    const tableRow = createElementsTags('tr', ['table__body-row']);
    const dataId = createElementsTags('td', ['table__body-data'], null, data.id);
    const dataBio = createElementsTags('td', ['table__body-data'], null, `${data.surname} ${data.name} ${data.lastName}`);
    const dataCreatedDate = createElementsTags('td', ['table__body-data'], null, data.createdAt.split('').slice(0, 10).join(''));
    const dataCreateTime = createElementsTags('span', ['table__data-time'], null, data.createdAt.split('').slice(11, 16).join(''));
    const dataModifindDate = createElementsTags('td', ['table__body-data'], null, data.updatedAt.split('').slice(0, 10).join(''));
    const dataModifindTime = createElementsTags('span', ['table__data-time'], null, data.updatedAt.split('').slice(11, 16).join(''));
    const dataContacts = createElementsTags('td', ['table__body-data']);
    const contactsContainer = createElementsTags('ul', ['table__contact']);
    const dataActions = createElementsTags('td', ['table__body-data']);
    const editItem = createElementsTags('div', ['table__action-item', 'table__action-item--edit'], null, ACTION_CONST.btn.edit);
    const copyItem = createElementsTags('div', ['table__action-item', 'table__action-item--copy'], null, ACTION_CONST.btn.copy);
    const copyAlert = createElementsTags('p', ['table__edit-alert'], null, ACTION_CONST.alert);
    const deleteItem = createElementsTags('div', ['table__action-item', 'table__action-item--delete'], null, ACTION_CONST.btn.delete);

    copyItem.append(copyAlert);
    dataActions.append(editItem, copyItem, deleteItem);
    dataModifindDate.append(dataModifindTime);
    dataCreatedDate.append(dataCreateTime);
    dataContacts.append(contactsContainer);
    tableRow.append(dataId, dataBio, dataCreatedDate, dataModifindDate, dataContacts, dataActions);
    tbody.append(tableRow);

    if(data.contacts.length > 0){
        data.contacts.forEach(element => {
            let createdContactIcon = createContactIcon(element);
            contactsContainer.append(createdContactIcon);
            });
        }

    editItem.addEventListener('click', function(e){
        e.preventDefault()

        blockWindow();
        loader(editItem);
        getElementData(data, editItem).then(i => {
            fillPopUp(createdPopUp, POPUP_CONST.headings.edit, POPUP_CONST.actions.delete, tbody, i);
            createdPopUp.popUpWindow.classList.add('popup-active');
            });
        });

    copyItem.addEventListener('click', function(){
        let link = HASH.file + location.pathname + HASH.grid + dataId.textContent;
        if(navigator.clipboard !== undefined){
          navigator.clipboard.writeText(link);

          // Показ диалогового окна что скопировано и убираем его через 2с
          copyAlert.style.opacity = STYLES_CONST.opacityFull;
          setTimeout(() => {
              copyAlert.style = STYLES_CONST.void;
              }, 2000)
          } else {
            statusWindow(STATUS);
            }
        });

    deleteItem.addEventListener('click', function(e){
        e.preventDefault();

        fillPopUp(createdPopUp, POPUP_CONST.headings.delete, POPUP_CONST.actions.cancel, tbody, data);
        createdPopUp.popUpWindow.classList.add('popup-active');
        })
    }

// Блокировка окна
export function blockWindow(){
    const disabledWindow = createElementsTags('div', ['disabled-window']);
    window.body.append(disabledWindow);
    }
