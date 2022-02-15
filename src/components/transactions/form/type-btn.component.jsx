import React from 'react';

const TypeButton = ({ typeColor, handle }) => {
    return (
        <div 
            onClick={handle}
            className={`flex px-[0.250rem] 
                         py-[0.175rem] h-[37px] rounded-lg 
                         hover:cursor-pointer mb-[24px] ${typeColor}`} >
                    
            <button className="w-2/3 rounded-md bg-white"></button>
        </div>
    );
};

export default TypeButton;