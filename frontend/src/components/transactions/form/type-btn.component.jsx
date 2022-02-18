import React from 'react';

const TypeButton = ({ typeColor, handle }) => {
    return (
        <div 
            onClick={handle}
            className={`flex px-[0.35rem] 
                         py-[0.2rem] h-[42px] rounded-lg 
                         hover:cursor-pointer ${typeColor}`} >
                    
            <button className="w-2/3 rounded-md bg-white"></button>
        </div>
    );
};

export default TypeButton;