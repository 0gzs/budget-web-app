import React from 'react';

import Category from './category.component';

const Categories = ({ categories }) => {
    return (
        <div className='card max-h-[400px]'>
            <h1 className='card-title'> Categories </h1>

            <div className='w-full overflow-y-auto 
                            no-scrollbar grid grid-cols-2
                            gap-2 justify-center items-center 
                            py-2 flex-1'>
                {categories && categories.map((category, i) => {
                    return (
                        <Category key={i} category={category} />
                    );
                })}
            </div>
            <button className='card-btn'>
                    <i className='bi bi-plus card-icon'></i>
                    New Category</button>
            <p className='text-sm font-huge 
                            tracking-widest uppercase
                            text-right text-yellow'>Available amount: 
                <span className='text-moneygreen font-block font ml-2'>
                    $0.00
                </span></p>
        </div>
    );
};

export default Categories;