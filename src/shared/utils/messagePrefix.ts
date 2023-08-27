export const sliceLastMessage = (msg: string = '', type: string = 'in'): string => {
    let sliceMsg = '';
    sliceMsg = type === 'out' ? `<span>Вы:</span> ${msg}` : msg;
    if (sliceMsg.length > 58) return `${sliceMsg.slice(0, 55)}...`;
    return sliceMsg;
};
