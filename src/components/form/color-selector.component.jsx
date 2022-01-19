import React from 'react';
import { colors } from '../../data/category-data';

const ColorSelector = ({ selectedColor, handleSelection }) => {
    return (
        <div className="flex items-center bg-white border overflow-x-auto space-x-4 no-scrollbar px-[1rem] py-[0.5rem]">
            {colors.map((color, i) => {
                let colorClass = selectedColor === color ? "border-4 border-sky-400" : "border-4 border-transparent";

                return <div
                    className={`px-[25px] py-[25px] rounded-full ${colorClass}`}
                    style={{ backgroundColor: color }}
                    key={i}
                    onClick={() => handleSelection(color, "color")}
                    ></div>
            })}
        </div>
    );
};

export default ColorSelector;