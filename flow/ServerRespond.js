/* eslint-disable no-undef */
declare type ServerRespond = {
    data: ?any,
    error?: ?string, // "общая" ошибка запроса
    errors?: ?{ [field:string]:Array<string> }, // сооответств поле формы - описание ошибок поля
    meta?: any
};
