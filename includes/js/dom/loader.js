import { ACTION_CONST, POPUP_CONST } from '../constants.js';
import { createElementsTags } from '../createElementsTags.js';

// Лоадер
export function loader(item, tbody = ''){
    if(!tbody){
        switch(item.textContent){
            case ACTION_CONST.btn.edit:
                switch(item.classList[1]){
                    case 'table__action-item--edit':
                        item.classList.remove('table__action-item--edit');
                        item.classList.add('table__action-item--edit-load');
                        break;
                    case 'table__action-item--edit-load':
                        item.classList.remove('table__action-item--edit-load');
                        item.classList.add('table__action-item--edit');
                        break;
                    }
                break;
            case POPUP_CONST.buttons.delete:
                switch(item.classList[2]){
                    case undefined:
                        item.classList.add('button-loader');
                        break;
                    case 'button-loader':
                        item.classList.remove('button-loader');
                        break;
                    }
                break;
            case POPUP_CONST.buttons.save:
                switch(item.classList[2]){
                    case undefined:
                        item.classList.add('button-loader');
                        break;
                    case 'button-loader':
                        item.classList.remove('button-loader');
                        break;
                    }
                break;
            }
        } else {
            switch(tbody.children[0]){
                case undefined:
                    const tableRow = createElementsTags('tr', ['row-loader']);
                    const loader = createElementsTags('div', ['loader-container']);

                    tableRow.append(loader);
                    tbody.append(tableRow);
                    break;
            }
        }
    }
