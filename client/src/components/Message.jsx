export const typeMessages = {
    'DEFAULT':'DEFAULT',
    'ERROR': 'ERROR',
    'SUCCESS':'SUCCESS'
};

const Message = ({msg, type = typeMessages.DEFAULT}) => {
    const typeMsg = ({
        [typeMessages.DEFAULT]: 'text-stone-700',
        [typeMessages.ERROR]: 'text-red-500',
        [typeMessages.SUCCESS]: 'text-green-600'
    })[type];

    return (
        <div className={`${typeMsg} font-bold pt-2`}>{msg}</div>
    )
};

export default Message;