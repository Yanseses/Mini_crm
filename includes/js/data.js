import { URL_CONST, METHODS } from './constants.js';
import { closePopUp } from './dom/closePopUp.js';
import { renderTable } from './dom/renderTable.js';
import { loader } from './dom/loader.js';
import { statusWindow } from './dom/statusWindow.js';

// Получить список клиентов из базы
export async function getData(){
    const request = await fetch(URL_CONST, {
        method: METHODS.get,
        headers: {
            'Content-Type': 'application/json'
            }
        }).then(function(response){
            if(response.status >= 200 && response.status < 300){
                return Promise.resolve(response);
                } else {
                    return Promise.reject(response);
                    }
        }).then(function(response){
            return response.json();
        }).catch(function(error){
            statusWindow(error);
        });
    return request;
    }

// Получить данные определенного клиента из базы
export async function getElementData(data, item = ''){
    const request = await fetch(URL_CONST + data.id, {
        method: METHODS.get,
        headers: {
            'Content-Type': 'application/json'
            }
        }).then(function(response){
            if(response.status >= 200 && response.status < 300){
                return Promise.resolve(response);
                } else {
                    return Promise.reject(response);
                }
        }).then(function(response){
            return response.json();
        }).catch(function(error){
            statusWindow(error);
        });
    loader(item);
    return request;
    }

// Запись нового элемента
export async function newClient(createdForm, table, item = ''){
    const contacts = getContact(createdForm);
    const request = await fetch(URL_CONST, {
        method: METHODS.post,
        headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify({
            name: createdForm.inputName.value,
            surname: createdForm.inputFamily.value,
            lastName: createdForm.inputLastName.value,
            contacts: contacts
            })
        }).then(function(response){
            if(response.status >= 200 && response.status < 300){
                statusWindow(response);
                return Promise.resolve(response);
                } else {
                    return Promise.reject(response);
                }
        }).then(function(response){
            return response.json();
        }).catch(function(error){
            statusWindow(error);
        });
    loader(item);
    closePopUp(createdForm, createdForm.heading.textContent);
    renderTable(table, createdForm);
    }

// Изменение элемента базы
export async function patchData(data, createdForm, table, item = ''){
    const contacts = getContact(createdForm);
    const request = await fetch(URL_CONST + data.id, {
        method: METHODS.patch,
        headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify({
            name: createdForm.inputName.value,
            surname: createdForm.inputFamily.value,
            lastName: createdForm.inputLastName.value,
            contacts: contacts
            })
        }).then(function(response){
            if(response.status >= 200 && response.status < 300){
                statusWindow(response);
                return Promise.resolve(response);
                } else {
                    return Promise.reject(response);
                }
        }).then(function(response){
            return response.json();
        }).catch(function(error){
            statusWindow(error);
        });
    loader(item);
    closePopUp(createdForm, createdForm.heading.textContent);
    renderTable(table, createdForm);
    }

// Удаление элемента базы
export async function deleteData(data, table, createdForm, item = ''){
    const request = await fetch(URL_CONST + data.id, {
        method: METHODS.delete,
        }).then(function(response){
            if(response.status >= 200 && response.status < 300){
                statusWindow(response);
                return Promise.resolve(response);
                } else {
                    return Promise.reject(response);
                }
        }).catch(function(error){
            statusWindow(error);;
        });
    loader(item);
    closePopUp(createdForm, createdForm.heading.textContent);
    renderTable(table, createdForm);
    }

// Создание массива контактов
function getContact(createdForm){
    let contacts = [];

    for (let i = 0; i < createdForm.contactContainer.children.length; i++) {
        let contact = new Object();
        let container = createdForm.contactContainer.children[i];

        let contactType = container.querySelector('.contacts__type-button');
        let contactValue = container.querySelector('.contacts__input').value;
        contact.type = contactType.id;
        contact.value = contactValue
        contacts.push(contact);
        }

    return contacts;
    }
