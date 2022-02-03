import React, { useState } from 'react';
import Emoji from '../emoji.component';

import AmountForm from './form/amount-form.component';
import { deleteCategory, updateCategory } from '../../services/CategoryService';

const Category = ({ category, handleState, handleLoading }) => {
    const [edit, setEdit] = useState(false);
    const showForm = () => setEdit(true);
    const hideForm = () => setEdit(false);

    const updateAmount = async newAmount => {
        hideForm();
        const categories = await updateCategory(category._id, newAmount, "amount");
        handleState(categories);
    }

    const deleteOne = async () => {
        handleLoading(true);
        const categories = await deleteCategory(category._id);
        handleState(categories);
        handleLoading(false);
    };

    return (
        <div className={`w-full py-1 rounded-lg 
                        shrink-0 flex items-center 
                        text-dark shadow-md ${category.color} relative group`}>

            <div onClick={deleteOne} 
                className='w-8 h-8 bg-black/20 rounded-md 
                    absolute right-1 top-1
                    flex items-center justify-center text-md pt-[3px] hover:cursor-pointer 
                    min-w-max scale-0 transition-all
                    duration-100 origin-right group-hover:scale-100'>
                <Emoji symbol="❌" label="letter x" />
            </div>

            <i className={ `${category.icon} text-2xl ml-4` }></i>
            
            <div className='w-4/5 ml-2 flex flex-col h-full font-source'>
                <p className='text-lg font-huge text-neutral-100
                              tracking-wide capitalize'>{category.name}</p>
                <div className={`bg-dark ${edit ? 'w-[92%]' : 'w-fit'} px-3 py-1 
                                rounded-md`}>
                    {!edit ? 
                        <p onClick={showForm} className='font-semibold text-lg text-yellow hover:cursor-pointer'>
                            <span className='text-moneygreen'>$</span>
                            {parseFloat(category.amount).toFixed(2)}
                        </p> 
                    :   <AmountForm category={category} hideForm={hideForm} updateAmount={updateAmount} /> }
                </div>
            </div>
        </div>
    );
};

export default Category;