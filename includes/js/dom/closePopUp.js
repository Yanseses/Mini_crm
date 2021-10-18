import { STYLES_CONST, POPUP_CONST } from '../constants.js';

// Закрыть окно
export function closePopUp(createdForm, head){
    const disabled = document.querySelector('.disabled-window');
    createdForm.popUpWindow.classList.remove('popup-active');
    setTimeout(() => {
        // Сброс формы и всех заполненных значений
        createdForm.form.reset();
        createdForm.identifier.textContent = STYLES_CONST.void;
        createdForm.contactContainer.textContent = STYLES_CONST.void;
        createdForm.saveBtn.classList.remove('button-loader');
        location.hash = STYLES_CONST.void;

        // Сброс окна ошибок и всех стилей к нему
        createdForm.addedContact.style = STYLES_CONST.void;
        createdForm.errorContainer.textContent = STYLES_CONST.void;
        createdForm.contactFieldset.style = STYLES_CONST.void;
        createdForm.errorContainer.style = STYLES_CONST.void;
        createdForm.inputFamily.style = STYLES_CONST.void;
        createdForm.inputName.style = STYLES_CONST.void;
        createdForm.inputLastName.style = STYLES_CONST.void;

        // Проверка на наличие блокирующего окна
        if(disabled){
            disabled.remove();
            }

        // Возврат формы к изначальному виду, если это было окно удаления
        if(head == POPUP_CONST.headings.delete){
            createdForm.text.style = STYLES_CONST.void;
            createdForm.heading.style = STYLES_CONST.void;
            createdForm.text.textContent = POPUP_CONST.content.text;
            createdForm.inputsFieldset.style = STYLES_CONST.void;
            }
        }, 600);
    }
