import React, { useState } from 'react';
import { updateCategory, deleteCategory } from '../../services/CategoryService';
import Emoji from '../emoji.component';

import UpdateField from '../forms/updateField';

const Category = ({ category, handleState, updating, loading }) => {
    const [edit, setEdit] = useState(false);
    const [editting, setEditting] = useState("");
    const showForm = () => setEdit(true);
    const hideForm = () => setEdit(false);

    const update = async (data, field) => {
        hideForm();
        setEditting("");
        updating(category._id);
        loading(true)

        const categories = await updateCategory(category._id, data, field);

        handleState(categories);
        loading(false);
        updating(-1);
    }

    const deleteOne = async () => {
        updating(category._id);
        loading(true);

        const categories = await deleteCategory(category._id);
        
        handleState(categories);
        loading(false);
        updating(-1);
    };

    return (
        <div className={`w-full py-1 rounded-lg 
                        shrink-0 flex items-center 
                        ${edit ? 'h-full col-span-2' : 'h-20 col-span-1'}
                        text-dark shadow-md ${category.color} group relative`}>

            <div onClick={deleteOne} 
                className='w-8 h-8 bg-black/20 rounded-md 
                    absolute right-1 top-1
                    flex items-center justify-center text-md pt-[3px] hover:cursor-pointer 
                    min-w-max scale-0 transition-all
                    duration-100 origin-right group-hover:scale-100'>
                <Emoji symbol="❌" label="letter x" />
            </div>

            <i className={ `${category.icon} text-2xl ml-2` }></i>
            
            <div className='w-4/5 ml-2 flex flex-col h-full font-source justify-center'>
                {edit && editting === "name" ? 
                        <UpdateField 
                            model={category} 
                            field="name" 
                            update={update} 
                            hide={hideForm}
                            form={nameForm} /> :
                        <p onClick={() => { showForm(); setEditting("name") }} className={`${edit ? 'text-4xl' : 'text-md'} font-huge text-neutral-100
                                    tracking-wide capitalize`}>{category.name}</p>
                }
                <div className={`bg-dark ${edit ? 'w-[92%] py-2 h-full my-1' : 'w-fit py-1'} px-3 
                                rounded-md`}>
                    {edit && editting === "amount" ? 
                        <UpdateField 
                            model={category} 
                            field="amount" 
                            update={update} 
                            hide={hideForm}
                            form={amountForm} /> :
                        <p onClick={() => { showForm(); setEditting("amount") }} className={`font-semibold ${edit ? 'text-3xl' : 'text-lg'} text-yellow hover:cursor-pointer`}>
                            <span className='text-moneygreen'>$</span>
                                {parseFloat(category.amount).toFixed(2)}
                        </p>}
                </div>
            </div>
        </div>
    );
};

const amountForm = (amount) => {
    return (
        <input
                type="text"
                className='bg-dark text-yellow w-full text-5xl
                rounded-md focus:outline-none font-huge'
                prefix='$'
                placeholder={`${amount.value}`}
                value={amount.value === 0 ? "" : amount.value}
                onChange={e => amount.setValue(e.target.value)} />
    );
}

const nameForm = (name) => {
    return (
        <input
                type="text" 
                className='font-huge text-neutral-100 w-full h-fit my-2
                tracking-wide capitalize bg-transparent text-5xl border-b-4 border-b-black focus:outline-none'
                placeholder={name.value}
                value={name.value}
                onChange={e => name.setValue(e.target.value)} />
    );
}
 
export default Category;