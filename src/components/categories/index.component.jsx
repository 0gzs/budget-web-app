import React, { useEffect, useState } from 'react';
import dollarUs from '../../functions/currency-formatter';
import Category from './category.component';

import CategoryForm from './form/form.component';
import CategoryLoader from './loader.component';

const Categories = ({ categories, handleState, balance}) => {
    const [updating, setUpdating] = useState(-1);
    const [available, setAvailable] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [show, setShow] = useState(false);

    const showForm = () => setShow(true);
    const hideForm = () => setShow(false);

    useEffect(() => {
        let availableBalance = balance;
        if (categories) categories.forEach(category => availableBalance -= parseFloat(category.amount));
        setAvailable(availableBalance);
    }, [balance, categories]);

    return (
        <div className='card max-h-[416px] w-[370px]'>
            <h1 className='card-title'>categories</h1>
            <div className='relative bg-carbonlight w-full h-[300px] p-2 grid grid-cols-2 gap-2 overflow-x-auto no-scrollbar'>
                {categories &&
                    categories.map((category, i) => {
                        if (updating === category._id && isLoading) return <CategoryLoader key={i} />
                        return (
                            <Category  
                                key={i}
                                category={category} 
                                handleState={handleState}
                                updating={setUpdating}
                                loading={setIsLoading} />
                        );
                    })}
            </div>
            <button className='card-btn' onClick={showForm}>
                <i className='bi bi-plus card-icon'></i>
                new category
            </button>
            <p className='card-more'>
                Available to budget: 
                <span className={`${available < 0 ? 'text-red-500' : 'text-moneygreen' } font-block font ml-2`}>{ dollarUs.format(available)}</span>
            </p>

            {show && 
                <CategoryForm 
                    handleState={handleState}
                    hide={hideForm}
                    loading={setIsLoading} />}
        </div>
    );
};

export default Categories;