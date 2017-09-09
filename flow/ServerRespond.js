/* eslint-disable no-undef */
declare type ServerRespond = {
    data: ?any,
    error: ?string, // "общая" ошибка запроса
    errors?: { [field:string]:Array<String> }, // сооответств поле формы - описание ошибок поля
    meta?: any
};
