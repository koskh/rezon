// @flow

export default function getPositionClasses(element: HTMLElement, prefix: string = ''): {verticalClass: string, horizontalClass: string} {
    const rect = element.getBoundingClientRect();

    let verticalClass = `${prefix}bottom`; // дефолт значен верт класса

    if ((rect.top + rect.height) > window.innerHeight) // меню не умещается в "нижн часть" окна
        verticalClass = `${prefix}top`;

    if ((rect.top - rect.height) < 0) // меню не умещается в "верхн часть окна", у "нижн"- приоритет
        verticalClass = `${prefix}bottom`;

    let horizontalClass = `${prefix}left`; // дефолт значен горизонт класса

    if ((rect.left + rect.width) > window.innerWidth) // меню не умещается в ширину окна
        horizontalClass = `${prefix}right`;

    if ((rect.left - rect.width) < 0) // меню не умещается в "прав часть окна", у "левого"- приоритет
        horizontalClass = `${prefix}left`;

    return { verticalClass, horizontalClass };
}