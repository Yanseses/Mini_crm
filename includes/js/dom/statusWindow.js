import { STATUS } from '../constants.js';
import { createElementsTags } from '../createElementsTags.js';

// Кастомная отрисовка окна аллерта
export function statusWindow(status){
    const messageWindow = createElementsTags('div', ['status-window']);
    const messageText = createElementsTags('p', ['status-window__text']);
    const cross = createElementsTags('button', ['status-window__cross']);

    messageWindow.append(messageText, cross);

    if(status){
        if(status.ok){
            messageWindow.classList.add('status-ok');
            messageText.textContent = STATUS.success;
            } else {
                messageWindow.classList.add('status-error');
                let mess = new String(status.statusText);
                messageText.textContent = mess;
                if(mess === 'undefined'){
                    messageText.textContent = STATUS.error;
                    }
                }
            }

    cross.addEventListener('click', clouseStatus);
    function clouseStatus(){
        messageWindow.classList.remove('status-window__active');
        setTimeout(() => {
            messageWindow.remove();
            }, 500);
        }

    setTimeout(() => {
        messageWindow.classList.add('status-window__active');
        }, 10);

    window.body.append(messageWindow);
    setTimeout(() => {
        messageWindow.classList.remove('status-window__active');
        setTimeout(() => {
            messageWindow.remove();
            cross.removeEventListener('click', clouseStatus);
            }, 50);
        }, 5000);
    }
