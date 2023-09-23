export const sliceLastMessage = (msg: string = '', type: boolean): string => {
    let sliceMsg = '';
    sliceMsg = type ? `<span>Вы:</span> ${msg}` : msg;
    if (sliceMsg.length > 58) return `${sliceMsg.slice(0, 55)}...`;
    return sliceMsg;
};
