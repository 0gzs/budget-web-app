import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import UpdateField from '../forms/updateField';
import { deleteCategory } from '../../features/categories/categoriesSlice';

const Category = ({ category, update }) => {
    const [edit, setEdit] = useState(false);
    const [editting, setEditting] = useState("");
    const showForm = () => setEdit(true);
    const hideForm = () => setEdit(false);

    const dispatch = useDispatch();

    const updateCategpry = (data, field) => {
        hideForm();
        update(category._id, data, field);
    }

    return (
        <div className={`w-full py-1 rounded-lg 
                        shrink-0 flex items-center 
                        ${edit ? 'h-full col-span-2' : 'h-20 col-span-1'}
                        text-dark shadow-md ${category && category.color} relative hover:cursor-pointer`}>

            {edit && (
                <div className='absolute bottom-2 right-2 bg-black/10 px-1'>
                    <i className='bi bi-trash text-2xl text-red-700' 
                       onClick={() => dispatch(deleteCategory(category._id))} ></i>
                </div>
            )}

            <i className={ `${category.icon} text-2xl ml-2` }></i>
            
            <div className={`${edit ? 'w-4/5' : 'w-[105px]'} truncate max-w-full ml-2 flex flex-col h-full font-source justify-center`}>
                {edit && editting === "name" ? 
                        <UpdateField 
                            model={category} 
                            field="name" 
                            update={updateCategpry} 
                            hide={hideForm}
                            form={nameForm} /> :
                        <p onClick={() => { showForm(); setEditting("name") }} className={`${edit ? 'text-4xl' : 'text-md'} font-huge text-neutral-100
                                    tracking-wide capitalize`}>{category.name}</p>
                }
                <div className={`bg-dark ${edit ? 'w-[92%] py-2 h-full my-1' : 'max-w-[80px] py-1 truncate'} px-2 
                                rounded-md`}>
                    {edit && editting === "amount" ? 
                        <UpdateField 
                            model={category} 
                            field="amount" 
                            update={updateCategpry} 
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
                inputMode="decimal"
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