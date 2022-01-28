import React from 'react';

const Emoji = ({ symbol, label=null }) => {
    return (
        <span
            className='w-full h-full'
            role="img"
            aria-label={label ? label : ""}
            aria-hidden={label ? "false" : "true"} >
                {symbol}
        </span>
    );
};

export default Emoji;