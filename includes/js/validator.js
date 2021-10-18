import { STYLES_CONST, POPUP_CONST } from './constants.js';

// Валидатор формы
export function validator(createdForm, head){
    createdForm.errorContainer.textContent = STYLES_CONST.void;
    createdForm.contactFieldset.style.marginBottom = STYLES_CONST.void;
    createdForm.errorContainer.style.display = STYLES_CONST.void;

    const sumbols = /[^\d\sA-ZА-Я]/gi;
    const regexp = /\d+/;
    let arrayBio = [];
    let arrayContacts = [];
    let errors = {};
    let status = true;

    if(head !== POPUP_CONST.headings.delete){
        let statusArr = [];

        for (let i = 0; i < createdForm.contactContainer.children.length; i++) {
            const contact = createdForm.contactContainer.children[i];
            const input = contact.querySelector('.contacts__input').value;
            const type = contact.querySelector('.contacts__type-button').id;
            arrayContacts.push(contact);

            errors[contact.id] = [];
            if(!type){
                errors[contact.id].push('contactType');
                statusArr.push(false);
                } else {
                    statusArr.push(true);
                    }
            if(input == ''){
                errors[contact.id].push('contactValue');
                statusArr.push(false);
                } else {
                    statusArr.push(true);
                    }
            }

        arrayBio.push(createdForm.inputName, createdForm.inputFamily, createdForm.inputLastName);
        arrayBio.forEach(e => {
            errors[e.id] = [];
            if(e.id !== 'lastName'){
                if(e.value.length < 1){
                    statusArr.push(false);
                    errors[e.id].push('noneContent');
                    } else {
                        statusArr.push(true);
                        }
                }
            if(!e.value.match(sumbols)){
                statusArr.push(true);
                } else {
                    statusArr.push(false);
                    errors[e.id].push('sumbols');
                    }
            if(!e.value.match(regexp)){
                statusArr.push(true);
                } else {
                    statusArr.push(false);
                    errors[e.id].push('isNaN');
                    }
            });
        if(statusArr.includes(false)){
            status = false;
            }
        }

    return {status, errors, arrayBio, arrayContacts};
    }
