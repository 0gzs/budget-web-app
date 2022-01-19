import React, { useState } from 'react';

import ColorSelector from '../../components/form/color-selector.component';
import IconSelector from '../../components/form/icon-selector.component';
import ButtonGroup from '../../components/form/button-group.component';
import CategoryService from './services/category.service';

const CategoryForm = ({ cancel, close, handleUpdate }) => {
    const [initialState, setInitialState] = useState({
        name: "",
        icon: "",
        color: "",
        amount: "",
        user: localStorage.getItem("userId")
    });
    const [category, setCategory] = useState(initialState);

    const handleInputChange = (e, name) => {
        if (e.target) setCategory({ ...category, [name]: e.target.value })
        else setCategory({ ... category, [name]: e });
    };

    const saveCategory = () => {
        CategoryService.create(category)
            .then(res => handleUpdate(res.data, "add"))
            .catch(err => console.log(err)) 
            .finally(close);
    };

    return (
        <div className='flex flex-col space-y-3'>
            <input 
                className="border text-xl rounded-md px-[0.600rem] py-2 placeholder-italic focus:outline-none" 
                type="text"
                value={category.name}
                onChange={e => handleInputChange(e, "name")}
                placeholder='Category name'
            />
            <IconSelector selectedIcon={category.icon} handleSelection={handleInputChange}  />
            <ColorSelector selectedColor={category.color} handleSelection={handleInputChange} />
            <div className='flex flex-wrap items-center'>
                <div className='w-2/3 flex justify-end text-lg font-medium text-gray-500'>
                    <label className='mr-2'>To budget:</label>
                </div>
                <input 
                    className="border rounded-md placeholder-italic w-1/3 px-2 py-1"
                    type="text"
                    value={category.amount}
                    onChange={ e => handleInputChange(e, "balance")}
                    placeholder='$100.00'
                />
            </div>
            <ButtonGroup cancel={cancel} submit={saveCategory} />
        </div>
    );
};

export default CategoryForm;