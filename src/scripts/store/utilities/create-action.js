export default (type, payloadCreator = x => x) => arg => {
    if (typeof payloadCreator !== 'function')
        throw new Error('The createPayload must be a function or undefined');


    const payload = payloadCreator(arg);
    return { type, payload };
};
