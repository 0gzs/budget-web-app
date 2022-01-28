import React, { useState } from 'react';
import Emoji from '../emoji.component';
import capitalizeFirstLetter from '../../services/capitalize.service';
import CategoryService from './services/category.service';
import AmountForm from './form/amount-form.component';

const Category = ({ category, remove, update }) => {
    const [edit, setEdit] = useState(false);
    const color = `bg-${category.color}`;

    const deleteOne = () => {
        CategoryService.delete(category._id)
            .then(() => remove(category._id));
    };

    const showForm = () => setEdit(true);
    const hideForm = () => setEdit(false);

    return (
        <div className={`w-full py-2 rounded-lg 
                        shrink-0 flex items-center 
                        text-dark shadow-md ${color} relative group`}>

            <div onClick={deleteOne} 
                className='w-6 h-6 absolute 
                            right-3 top-3 hover:cursor-pointer 
                            min-w-max scale-0 transition-all
                            duration-100 origin-right group-hover:scale-100'>
                <Emoji symbol="❌" label="letter x" />
            </div>

            <i className={ `${category.icon} text-2xl ml-4` }></i>
            
            <div className='w-4/5 ml-2 flex flex-col'>
                <p className='text-xl font-huge text-neutral-100
                              tracking-wide'>{category.name && capitalizeFirstLetter(category.name)}</p>
                <div className={`bg-dark ${edit ? 'w-[92%]' : 'w-fit'} px-3 py-2 
                                rounded-md`}>
                    {!edit ? 
                    <p onClick={showForm} className='font-huge text-xl text-yellow hover:cursor-pointer'>
                        <span className='text-moneygreen'>$</span>
                        {category.amount.toFixed(2)}
                    </p> :
                    <AmountForm id={category._id} update={update} hideForm={hideForm} />}
                </div>
            </div>
        </div>
    );
};

export default Category;