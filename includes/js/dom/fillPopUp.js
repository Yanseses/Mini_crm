import { POPUP_CONST, STYLES_CONST, ERRORS } from '../constants.js';
import { closePopUp } from './closePopUp.js';
import { createElementsTags } from '../createElementsTags.js';
import { createContactInput } from './createContactInput.js';
import { blockWindow } from './createTableElem.js';
import { loader } from './loader.js';
import { newClient, patchData, deleteData } from '../data.js';
import { validator } from '../validator.js';

// Наполнение формы контентом
export function fillPopUp(createdForm, head, action, table, clientInfo = ''){
    createdForm.heading.textContent = head;
    createdForm.actionBtn.textContent = action;

    if(head !== POPUP_CONST.headings.delete){
        createdForm.addedContact.textContent = POPUP_CONST.buttons.added;
        createdForm.saveBtn.textContent = POPUP_CONST.buttons.save;
        if(head == POPUP_CONST.headings.edit){
            location.hash = clientInfo.id;
            createdForm.inputFamily.value = clientInfo.surname;
            createdForm.inputName.value = clientInfo.name;
            if(clientInfo.lastName){
                createdForm.inputLastName.value = clientInfo.lastName;
                }
            createdForm.identifier.textContent = POPUP_CONST.content.identifier + clientInfo.id;
            if(clientInfo.contacts.length > 0){
                createdForm.contactFieldset.style.padding = STYLES_CONST.contactPadding;
                for (let i = 0; i < clientInfo.contacts.length; i++) {
                    createContactInput(createdForm, i + 1, clientInfo.contacts[i]);
                    }
                if(createdForm.contactContainer.children.length > 9){
                    createdForm.addedContact.style.display = STYLES_CONST.displayNone;
                    }
                }
            }
        } else {
            createdForm.contactFieldset.style.display = STYLES_CONST.displayNone;
            createdForm.inputName.style.display = STYLES_CONST.displayNone;
            createdForm.inputLastName.style.display = STYLES_CONST.displayNone;
            createdForm.inputFamily.style.display = STYLES_CONST.displayNone;
            createdForm.text.style.display = STYLES_CONST.displayBlock;
            createdForm.heading.style.textAlign = STYLES_CONST.alignCenter;
            createdForm.text.textContent = POPUP_CONST.content.text;
            createdForm.inputsFieldset.style.justifyContent = STYLES_CONST.alignCenter;

            createdForm.saveBtn.textContent = POPUP_CONST.buttons.delete;
            }

    // Проверка наличия окна блокировщика
    if(document.querySelector('.disabled-window')){
        document.querySelector('.disabled-window').remove();
        }

    // Закрытие по нажатию на фон
    createdForm.popUpWindow.addEventListener('click', function(e){
        if(e.target === this){
            removeListener();
            closePopUp(createdForm, head);
            }
        });

    // Закрытие по нажатию на крестик
    createdForm.cross.addEventListener('click', function(){
        removeListener();
        closePopUp(createdForm, head);
        });

    // Нажатие на кнопку события (отмена/удалить)
    createdForm.actionBtn.addEventListener('click', actionLink)
    function actionLink(){
        if(action === POPUP_CONST.actions.cancel){
            removeListener();
            closePopUp(createdForm, head);
            }
        if(action === POPUP_CONST.actions.delete){
            removeListener();
            closePopUp(createdForm, head);
            setTimeout(() => {
                fillPopUp(createdForm, POPUP_CONST.headings.delete, POPUP_CONST.actions.cancel, table, clientInfo);
                createdForm.popUpWindow.classList.add('popup-active');
                }, 800);
            }
        }

    // Нажатие кнопку на добавление контакта
    createdForm.addedContact.addEventListener('click', addedContact);
    function addedContact(e){
        e.preventDefault();
        let counter = 0;
        if(createdForm.contactContainer.children.length > 0){
            counter = Number(createdForm.contactContainer.children[createdForm.contactContainer.children.length - 1].id);
            }

        createdForm.contactFieldset.style.padding = STYLES_CONST.contactPadding;
        createContactInput(createdForm, counter + 1);

        if(createdForm.contactContainer.children.length > 9){
            createdForm.addedContact.style.display = STYLES_CONST.displayNone;
            }
        }

    // Нажатие на submit
    createdForm.form.addEventListener('submit', submitForm)
    function submitForm(e){
        e.preventDefault();

        const validation = validator(createdForm, head);
        if(validation.status){
            if(head === POPUP_CONST.headings.new){
                loader(createdForm.saveBtn);
                removeListener();
                blockWindow();
                newClient(createdForm, table);
                }
            if(head === POPUP_CONST.headings.edit){
                loader(createdForm.saveBtn);
                removeListener();
                blockWindow();
                patchData(clientInfo, createdForm, table);
                }
            if(head === POPUP_CONST.headings.delete){
                loader(createdForm.saveBtn);
                removeListener();
                blockWindow();
                deleteData(clientInfo, table, createdForm);
                }
            // closePopUp(createdForm, head);
            } else {
                for(let i in validation.errors){
                    if(validation.errors[i] && validation.errors[i].includes('contactType')){
                        createError(validation, i, 'contactType');
                        }
                    if(validation.errors[i] && validation.errors[i].includes('contactValue')){
                        createError(validation, i, 'contactValue');
                        }
                    if(validation.errors[i].length > 0 && validation.errors[i].includes('sumbols')){
                        createError(validation, i, 'sumbols');
                        }
                    if(validation.errors[i].length > 0 && validation.errors[i].includes('noneContent')){
                        createError(validation, i, 'noneContent');
                        }
                    if(validation.errors[i].length > 0 && validation.errors[i].includes('isNaN')){
                        createError(validation, i, 'isNaN');
                        }
                    }
                createdForm.errorContainer.style.display = STYLES_CONST.displayBlock;
                createdForm.contactFieldset.style.marginBottom = STYLES_CONST.marginBottom;
            }
        }

    // Проверка наличия подчеркивания инпута и сброс
    createdForm.form.oninput = (e) => {
        if(e.target.style.borderColor){
            e.target.style = STYLES_CONST.void;
            }
        }

    // Создание ошибки
    function createError(validation, i, errorValue = ''){
        const errorText = createElementsTags('p', ['client-form__error-message']);
        borderColor(validation, i, errorValue);
        if(i === 'name' || i === 'family' || i === 'lastName'){
            switch(i){
                case 'name':
                    errorText.textContent = `${ERRORS.typeName}: ${ERRORS[errorValue]}`;
                    break;
                case 'family':
                    errorText.textContent = `${ERRORS.typeFamily}: ${ERRORS[errorValue]}`;
                    break;
                case 'lastName':
                    errorText.textContent = `${ERRORS.typeLastName}: ${ERRORS[errorValue]}`;
                    break;
                }
            } else {
                errorText.textContent = `Контакт ${i}: ${ERRORS[errorValue]}`;
                }
        createdForm.errorContainer.append(errorText);
        }

    // Получение типа input по его id, и окраска его в цвет ошибки
    function borderColor(validation, elem, contactErr = ''){
        for(let i = 0; i < validation.arrayBio.length; i++){
            if(validation.arrayBio[i].id === elem){
                validation.arrayBio[i].style.borderColor = STYLES_CONST.errorBorder;
                }
            }
        if(!isNaN(parseFloat(elem))){
            for (let i = 0; i < validation.arrayContacts.length; i++) {
                if(validation.arrayContacts[i].id === elem){
                    switch(contactErr){
                        case 'contactType':
                            validation.arrayContacts[i].children[0].children[0].style.borderColor = STYLES_CONST.errorBorder;
                            break;
                        case 'contactValue':
                            validation.arrayContacts[i].children[1].style.borderColor = STYLES_CONST.errorBorder;
                            break;
                        }
                    }
                }
            }
        }

    // Сброс обработчиков
    function removeListener(){
        createdForm.form.removeEventListener('submit', submitForm);
        createdForm.addedContact.removeEventListener('click', addedContact);
        createdForm.actionBtn.removeEventListener('click', actionLink);
        }
    }
