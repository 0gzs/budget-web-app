import React, { useState } from 'react';

import Category from './category.component';
import CategoryForm from './form/form.component';

const Categories = ({ categories, updateState }) => {
    const [show, setShow] = useState(false);

    const showForm = () => setShow(true);
    const hideForm = () => setShow(false);

    const addCategory = category => {
        let state = [...categories];
        state.push(category);
        updateState(state);
    };

    const updateCategory = updatedCategory => {
        let state = [...categories];
        state = state.filter(category => category._id !== updatedCategory.id);
        state.push(updatedCategory);
        updateState(state);
    };

    const removeCategory = id => {
        let state = [...categories];
        state = state.filter(category => category._id !== id);
        updateState(state);
    };

    return (
        <div className='card max-h-[400px] border'>
            {show && <CategoryForm hideForm={hideForm} addCategory={addCategory} />}
            <h1 className='card-title'> Categories </h1>

            <div className='w-full overflow-y-auto 
                            no-scrollbar grid grid-cols-2
                            gap-2 justify-center items-center 
                            py-2 flex-1'>
                {categories && categories.map((category, i) => {
                    return (
                        <Category key={i} 
                            category={category} 
                            remove={removeCategory}
                            update={updateCategory} />
                        );
                    })}
            </div>
            
            <button className='card-btn' onClick={showForm}>
                    <i className='bi bi-plus card-icon'></i>
                    New Category
            </button>

            <p className='text-sm font-huge 
                          tracking-widest uppercase
                          text-right text-yellow'>
                Available amount: 
                <span className='text-moneygreen font-block font ml-2'>$0.00</span>
            </p>
        </div>
    );
};

export default Categories;