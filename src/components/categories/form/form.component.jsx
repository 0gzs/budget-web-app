import React, { useState } from 'react';
import { backgroundColors, icons } from '../../../data/category-data';

const CategoryForm = ({ hideForm, submit }) => {
    const initialState = {
        name: "",
        color: "",
        icon: ""
    };
    const [category, setCategory] = useState(initialState);
    
    const changeHandler = (name, value) => setCategory({ ...category, [name]: value });

    const isValidSubmit = () => {
        if (category.name.trim().length > 0 || category.icon.trim().length > 0 || category.color.trim().length > 0) return true;

        return false;
    }
   
    return (
        <div className='modal'>
            <div className='form space-y-3'>
                <h1 className='form-title'>Add a category</h1>
                <div className="form-group w-full">
                    <label className='form-label'>Category name</label>
                    <input 
                        className='form-input w-full'
                        type="name" 
                        value={category.name}
                        placeholder='Category name'
                        onChange={e => changeHandler("name", e.target.value)} />
                </div>

                <div className="form-group w-full">
                    <label className='form-label'>Color:</label>
                    <div className='w-full overflow-y-auto bg-carbonlight p-3 rounded
                                    no-scrollbar grid grid-cols-6
                                    gap-2 items-center justify-center'>
                        {backgroundColors.map((color, i) => {
                            const borderColor = color === category.color ? (
                                "border-3 border-neutral-100"
                            ) : "";
                            return (
                                <div key={i} 
                                    name="color"
                                    onClick={e => changeHandler("color", color)}
                                    className={`w-10 h-10 sm:w-12 sm:h-12 ${color} ${borderColor} rounded-md shrink-0
                                    hover:cursor-pointer shadow-md`}>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="form-group w-full">
                    <label className='form-label'>Icon:</label>                    
                    <div className='flex w-full overflow-x-auto
                                    space-x-2 px-1 py-2 bg-carbonlight rounded '>
                        {icons.map((icon, i) => {
                            const borderColor = icon === category.icon ? (
                                "border-2 border-neutral-400"
                            ) : "";
                            return (
                                <div key={i} 
                                    name="icon"
                                    className={`text-3xl w-10 h-10
                                shrink-0 text-white ${borderColor} flex items-center 
                                justify-center hover:cursor-pointer`} 
                                    onClick={e => changeHandler("icon", icon)}>
                                    <i className={`${icon} mt-1`}></i>
                                </div>
                            );
                        })}
                    </div>
                </div>

                    
                <div className='form-btn-group'>
                    <button onClick={hideForm}
                        className='form-btn btn-cancel'>Nvm.</button>

                    <button onClick={() => {
                        let isValid = isValidSubmit();
                        if (!isValid) return;

                        submit(category);
                    }}
                        className='form-btn btn-submit'>Go</button>
                </div>
            </div>
        </div>
    );
};

export default CategoryForm;