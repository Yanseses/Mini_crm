export const URL_CONST = 'http://127.0.0.1:3000/api/clients/';
export const METHODS = {
    post: 'POST',
    get: 'GET',
    patch: 'PATCH',
    delete: 'DELETE'
    };
export const POPUP_CONST = {
    headings: {
        new: 'Новый клиент',
        edit: 'Изменить данные',
        delete: 'Удалить клиента'
        },
    buttons: {
        save: 'Сохранить',
        delete: 'Удалить',
        added: 'Добавить контакт'
        },
    actions: {
        cancel: 'Отмена',
        delete: 'Удалить клиента'
        },
    content: {
        text: 'Вы действительно хотите удалить данного клиента?',
        identifier: 'ID: '
        },
    contacts: {
        default: 'Выберите',
        phone: 'Телефон',
        mail: 'Email',
        Fb: 'Facebook',
        Vk: 'Vk',
        another: 'Другое',
        delete: 'Удалить контакт'
        }
    };
export const ACTION_CONST = {
    btn: {
        edit: 'Изменить',
        delete: 'Удалить',
        copy: 'Копировать'
        },
    alert: 'Скопировано'
    };
export const STYLES_CONST = {
    void: '',
    opacityFull: '1',
    errorBorder: '#F06A4D',
    displayNone: 'none',
    displayBlock: 'block',
    displayFlex: 'flex',
    contactPadding: '25px 0',
    alignCenter: 'center',
    marginBottom: '0'
    };
export const ERRORS = {
    typeName: 'Имя',
    typeFamily: 'Фамилия',
    typeLastName: 'Отчество',
    contactValue: 'Поле не может быть пустым',
    contactType: 'Не указан тип контакта',
    isNaN: 'Поле не должно содержать цифры',
    noneContent: 'Поле не может быть пустым',
    sumbols: 'Поле не может содержать спец. символов'
    };
export const STATUS = {
    success: 'Операция прошла успешно',
    error: 'Ой. Что то пошло не так',
    statusText: 'Ошибка протокола безопастности'
    };
export const HASH = {
    grid: '#',
    file: 'file://'
    }
