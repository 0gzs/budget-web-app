import React from 'react';
import capitalizeFirstLetter from '../../services/capitalize.service';

const Category = ({ category }) => {
    return (
        <div style={{ backgroundColor: `${category.color}` }} 
            className='w-full py-2 rounded-lg 
                        shrink-0 flex items-center 
                        text-white shadow-md'>
            <i className={ `${category.icon} text-2xl ml-4` }></i>
            <div className='w-4/5 ml-2'>
                <p className='text-md font-big 
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