import React from 'react';
import { colors } from '../../data/category-data';

const ColorSelector = ({ selectedColor, handleSelection }) => {
    return (
        <div className="flex items-center bg-white border-[2px] border-gray-200 rounded-lg overflow-x-auto space-x-4 no-scrollbar px-2 py-2">
            {colors.map((color, i) => {
                let colorClass = selectedColor === color ? "border-4 border-sky-400" : "border-4 border-transparent";

                return <div
                    className={`px-[20px] py-[20px] rounded-full ${colorClass}`}
                    style={{ backgroundColor: color }}
                    key={i}
                    onClick={() => handleSelection(color, "color")}
                    ></div>
            })}
        </div>
    );
};

export default ColorSelector;