import { createTableElem } from './createTableElem.js';
import { loader } from './loader.js';
import { getData } from '../data.js';

// Отрисовка таблицы
export function renderTable(tbody, popUp, sort = ''){
    tbody.textContent = '';
    loader('', tbody);
    getData().then(array => {
        tbody.textContent = '';
        if(array.length > 0){
            // Сортировка
            if((sort.substr(-2) === 'up' || sort.substr(-4) === 'down') || sort.length < 1){
                switch(true){
                    case sort.substr(0, 2) == 'id':
                        if(sort.substr(-2) == 'up'){
                            array.sort((a, b) => {
                                return b.id - a.id
                                });
                            } else {
                                array.sort((a, b) => {
                                    return a.id - b.id
                                    });
                                }
                        break;
                    case sort.substr(0, 4) == 'name':
                        if(sort.substr(-2) == 'up'){
                            array.sort((a, b) => {
                                let nameA = a.name.toLowerCase()
                                let nameB = b.name.toLowerCase();
                                if(nameA < nameB){
                                    return -1;
                                    }
                                return 0;
                                });
                            } else {
                                array.sort((a, b) => {
                                    let nameA = a.name.toLowerCase()
                                    let nameB = b.name.toLowerCase();
                                    if(nameA > nameB){
                                        return 1;
                                        }
                                    return 0;
                                    })
                                }
                        break;
                    case sort.substr(0, 9) == 'createdAt':
                        if(sort.substr(-2) == 'up'){
                            array.sort((a, b) => {
                                let createA = a.createdAt.toLowerCase();
                                let createB = b.createdAt.toLowerCase();
                                if(createA < createB){
                                    return 1;
                                    }
                                return 0;
                                });
                            } else {
                                array.sort((a, b) => {
                                    let createA = a.createdAt.toLowerCase();
                                    let createB = b.createdAt.toLowerCase();
                                    if(createA > createB){
                                        return -1;
                                        }
                                    return 0;
                                    });
                                }
                        break;
                    case sort.substr(0, 9) == 'updatedAt':
                        if(sort.substr(-2) == 'up'){
                            array.sort((a, b) => {
                                let updateA = a.updatedAt.toLowerCase();
                                let updateB = b.updatedAt.toLowerCase();
                                if(updateA > updateB){
                                    return -1;
                                    }
                                return 0;
                                });
                            } else {
                                array.sort((a, b) => {
                                    let updateA = a.updatedAt.toLowerCase();
                                    let updateB = b.updatedAt.toLowerCase();
                                    if(updateA < updateB){
                                        return 1;
                                        }
                                    return 0;
                                    });
                                }
                        break;
                    }
                    array.forEach(element => {
                        createTableElem(tbody, element, popUp);
                        });
                } else {
                    if(isNaN(sort)){
                        let filteredArray = array.filter(el => {
                            let bio = `${el.name.toLowerCase()} ${el.surname.toLowerCase()} ${el.lastName.toLowerCase()}`;
                            if(bio.includes(sort.toLowerCase())){
                                return el;
                                }
                            })
                            filteredArray.forEach(element => {
                                createTableElem(tbody, element, popUp);
                                });
                        } else {
                            let filteredArray = array.filter(el => {
                                if(el.id.includes(sort)){
                                    return el;
                                    }
                                })
                                filteredArray.forEach(element => {
                                    createTableElem(tbody, element, popUp);
                                    });
                            }
                    }
            }
        });
    }
