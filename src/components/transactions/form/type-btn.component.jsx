import React from 'react';

const TypeButton = ({ typeColor, handle }) => {
    return (
        <div 
            onClick={handle}
            className={`flex px-[0.250rem] 
                         py-[0.175rem] w-[80px] rounded-lg 
                         hover:cursor-pointer ${typeColor}`} >
                    
            <button className="w-1/2 rounded-md bg-white"></button>
        </div>
    );
};

export default TypeButton;