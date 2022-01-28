import React from 'react';
import capitalizeFirstLetter from '../../services/capitalize.service';

const Category = ({ category }) => {
    return (
        <div className={`w-full py-2 rounded-lg 
                        shrink-0 flex items-center 
                        text-dark shadow-md bg-${category.color}`}>
            <i className={ `${category.icon} text-2xl ml-4` }></i>
            <div className='w-4/5 ml-2'>
                <p className='text-xl font-huge text-neutral-100
                              tracking-wide'>{capitalizeFirstLetter(category.name)}</p>
                <div className='bg-carbon w-fit px-2 py-1 rounded-md'>
                    <p className='font-huge text-xl text-yellow'>
                        <span className='text-moneygreen'>$</span>
                        {category.amount.toFixed(2)}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Category;