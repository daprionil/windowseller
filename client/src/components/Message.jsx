export const typeMessages = {
    'default':'default',
    'error': 'error',
    'success':'success'
};

const Message = ({msg, type = typeMessages.default}) => {
    const typeMsg = ({
        [typeMessages.default]: 'text-stone-700',
        [typeMessages.error]: 'text-red-500',
        [typeMessages.success]: 'text-green-600'
    })[type];

    return (
        <div className={`${typeMsg} font-bold pt-2`}>{msg}</div>
    )
};

export default Message;