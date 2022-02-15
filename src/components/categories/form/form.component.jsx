import React, { useState } from 'react';
import { backgroundColors, icons } from '../../../data/category-data';
import { createCategory } from '../../../services/CategoryService';

const CategoryForm = ({ handleState, hide, loading }) => {
    const [formData, setFormData] = useState({
        name: "",
        icon: "",
        color: ""
    })
    const { name, color, icon } = formData;

    const isValidSubmit = category => {
        if (category.name.trim().length > 0 || category.icon.trim().length > 0 || category.color.trim().length > 0) return true;

        return false;
    }

    const changeHandler = (e, name=null, feature=null) => {
        setFormData(prevState => ({
            ...prevState,
            [name || e.target.name]: feature || e.target.value,
        }));
    };

    const submit = async () => {
        hide();
        loading(true);

        const categoryData = {
            name, 
            color, 
            icon
        };

        if (!isValidSubmit(categoryData)) return null;

        const categories = await createCategory(categoryData);
        handleState(categories);
        
        loading(false);
    }
   
    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black/30 z-20'>
            <div className='w-[350px] p-4 bg-carbon shadow-md flex flex-col space-y-3'>
                <h1 className='text-2xl text-white font-extrabold font-source'>add category</h1>
                <div className='w-full text-white flex flex-col'>
                    
                    <div className='w-full'>
                        <label className="font-bold text-sm">category name:</label>
                        <input 
                            className="bg-carbonlight w-full px-4 py-2 rounded-sm text-white font-bold tracking-wide focus:outline focus:outline-3 focus:outline-cyan-200"
                            type="text"
                            name="name"
                            placeholder='ex. Piggy 🐷  Bank'
                            value={name}
                            onChange={changeHandler} />
                    </div>
                    <div className='w-full'>
                        <label className="font-bold text-sm">color:</label>
                        <div className='w-full overflow-y-auto bg-carbonlight p-3 rounded
                                    no-scrollbar grid grid-cols-7
                                    gap-2 items-center justify-center'>
                            {backgroundColors.map((c, i) => {
                                const borderColor = c === color ? (
                                    "border-3 border-neutral-100"
                                ) : "";
                                return (
                                    <div key={i} 
                                        name="color"
                                        onClick={e => changeHandler(e, "color", c)}
                                        className={`w-8 h-8 ${c} ${borderColor} rounded-md shrink-0
                                        hover:cursor-pointer shadow-md`}>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className='w-full'>
                        <label className='font-bold text-sm'>icon:</label>
                        <div className='flex overflow-x-auto
                                    space-x-2 px-1 py-2 bg-carbonlight rounded'>
                            {icons.map((ic, i) => {
                                const borderColor = ic === icon ? (
                                    "border-2 border-neutral-400"
                                ) : "";
                                return (
                                    <div key={i} 
                                        name="icon"
                                        className={`text-3xl w-10 h-10
                                    shrink-0 text-white ${borderColor} flex items-center 
                                    justify-center hover:cursor-pointer`} 
                                        onClick={e => changeHandler(e, "icon", ic)}>
                                        <i className={`${ic} mt-1`}></i>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                    
                <div className='form-btn-group'>
                    <button onClick={hide}
                        className='form-btn btn-cancel'>Nvm.</button>

                    <button onClick={submit}
                        className='form-btn btn-submit'>Go</button>
                </div>
            </div>
        </div>
    );
};

export default CategoryForm;
