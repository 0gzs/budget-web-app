import React from 'react';
import { icons } from '../../data/category-data';

const IconSelector = ({ selectedIcon, handleSelection }) => {
    return (
        <div className="flex bg-white border overflow-x-auto space-x-3 pl-2 pr-4 no-scrollbar">
            {icons.map((icon, i) => {
                let iconClass = selectedIcon === icon ? "border-4 border-zinc-600 ": "border-4 border-transparent";
                return <i 
                    className={`text-[1.725rem] ${icon} ${iconClass} hover:cursor-pointer px-2`}
                    key={i}
                    onClick={() => handleSelection(icon, "icon")}
                    ></i>
            })};
        </div>
    );
};

export default IconSelector;