import React, { useState } from 'react';
import { backgroundColors, icons } from '../../../data/category-data';
import CategoryService from '../services/category.service';

const CategoryForm = ({ hideForm, addCategory }) => {
    const [category, setCategory] = useState({
        name: "",
        color: "",
        icon: ""
    });

    const handleInputChange = (val, name) => setCategory({ ...category, [name]: val });

    const saveCategory = async () => {
        await CategoryService.create(category)
            .then(res => addCategory(res.data))
            .catch(err => console.log(err));
        hideForm();
    };

    return (
        <div className='absolute left-1/2 z-10
                        bottom-20 w-[300px]
                        transform -translate-x-1/2 
                      bg-dark p-4 flex flex-col
                        space-y-4 shadow-md
                        rounded-lg text-white'>
            <input 
                className='bg-carbonlight px-3 py-2
                            rounded-md uppercase tracking-widest
                            focus:outline-none                        
                            font-huge'
                type="name" 
                value={category.name}
                placeholder='Category name'
                onChange={e => handleInputChange(e.target.value, "name")} />

            <div className='w-full overflow-y-auto
                            no-scrollbar grid grid-cols-5
                            gap-2 items-center justify-center'>
                {backgroundColors.map((color, i) => {
                    const borderColor = color === category.color ? (
                        "border-3 border-neutral-100"
                    ) : "";
                    return (
                        <div key={i} 
                            onClick={() => handleInputChange(color, "color")}
                            className={`w-10 h-10 ${color} ${borderColor} rounded-md shrink-0
                            hover:cursor-pointer shadow-md`}>
                        </div>
                    );
                })}
            </div>

            <div className='flex w-full overflow-x-auto
                            space-x-2'>
                {icons.map((icon, i) => {
                    const borderColor = icon === category.icon ? (
                        "border-2 border-neutral-400"
                    ) : "";
                    return (
                        <div key={i} 
                            className={`text-3xl w-10 h-10
                        shrink-0 text-white ${borderColor} flex items-center 
                        justify-center hover:cursor-pointer`} 
                            onClick={() => handleInputChange(icon, "icon")}>
                            <i className={`${icon} mt-1`}></i>
                        </div>
                    );
                })}
            </div>
                
            <div className='w-full flex space-x-2 font-sans'>
                <button onClick={hideForm}
                    className='w-1/3 rounded-sm 
                               text-lg px-3 py-2 bg-carbonlight 
                               uppercase font-huge hover:bg-darkred'>Nvm.</button>
                <button onClick={saveCategory}
                    className='w-2/3 rounded-sm 
                               text-lg px-3 py-2 bg-moneygreen 
                               uppercase font-huge'>
                    Add
                </button>
            </div>
        </div>
    );
};

export default CategoryForm;