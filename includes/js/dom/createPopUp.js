import { createElementsTags } from '../createElementsTags.js';

// Форма добавления
export function createPopUp(body){
    const popUpWindow = createElementsTags('div', ['popup']);
    const container = createElementsTags('section', ['popup__section']);

    const form = createElementsTags('form', ['client-form'], {action:'#', method: 'POST', enctype:'multipart/form-data'});

    const heading = createElementsTags('h2', ['client-form__heading']);
    const identifier = createElementsTags('span', ['client-form__identifier']);
    const cross = createElementsTags('button', ['client-form__cross'], {type: 'button'});
    const text = createElementsTags('p', ['client-form__description']);

    const inputsFieldset = createElementsTags('fieldset', ['client-form__fieldset', 'client-form__fieldset--bio']);
    const inputFamily = createElementsTags('input', ['client-form__text'], {type:'text', autocomplete: 'off', placeholder: 'Фамилия*', id: 'family'});
    const inputName = createElementsTags('input', ['client-form__text'], {type:'text', autocomplete: 'off', placeholder: 'Имя*', id: 'name'});
    const inputLastName = createElementsTags('input', ['client-form__text'], {type:'text', autocomplete: 'off', placeholder: 'Отчество', id:'lastName'});
    const contactFieldset = createElementsTags('fieldset', ['client-form__fieldset', 'client-form__fieldset--contact']);
    const contactContainer = createElementsTags('div', ['client-form__contacts-container']);
    const addedContact = createElementsTags('button', ['client-form__add-contact'], {type: 'button'});
    const buttonsFieldset = createElementsTags('fieldset', ['client-form__fieldset', 'client-form__form__fieldset--btns']);

    const errorContainer = createElementsTags('div', ['client-form__error-container']);
    const saveBtn = createElementsTags('button', ['btn', 'btn__primary'], {type:'submit'});
    const actionBtn = createElementsTags('a', ['client-form__action']);

    // Сборка элементов в поп-ап
    inputsFieldset.append(heading, identifier, cross, text, inputFamily, inputName, inputLastName);
    contactFieldset.append(contactContainer, addedContact);
    buttonsFieldset.append(errorContainer, saveBtn, actionBtn);
    form.append(inputsFieldset, contactFieldset, buttonsFieldset);

    container.append(form);
    popUpWindow.append(container);

    body.append(popUpWindow);

    return {popUpWindow, form, heading, cross, identifier, text, inputsFieldset, inputFamily, inputName, inputLastName, contactFieldset, contactContainer, addedContact, errorContainer, saveBtn, actionBtn};
    }
