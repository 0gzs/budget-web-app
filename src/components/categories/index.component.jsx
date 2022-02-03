import React, { useEffect, useState } from 'react';
import { createCategory } from '../../services/CategoryService';
import dollarUs from '../../functions/currency-formatter';

import Category from './category.component';
import CategoryForm from './form/form.component';
import CategoryLoader from './loader.component';

const Categories = ({ categories, balance, handleState}) => {
    const [available, setAvailable] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [show, setShow] = useState(false);

    const showForm = () => setShow(true);
    const hideForm = () => setShow(false);

    useEffect(() => {
        let a = balance;
        if (categories) categories.forEach(category => a -= parseFloat(category.amount));
        setAvailable(a);
    }, [balance, categories]);

    const saveCategory = async category => {
        hideForm();
        setIsLoading(true);
        const categories = await createCategory(category);
        handleState(categories);
        setIsLoading(false);
    }

    return (
        <div className='card max-h-[400px]'>
            {show &&
                <CategoryForm
                    hideForm={hideForm}
                    submit={saveCategory} />
            }
            
            <h1 className='card-title'> Categories </h1>

            <div className='w-full overflow-y-auto 
                            no-scrollbar grid grid-cols-2
                            gap-3 justify-center items-center
                            py-2 flex-1 grow-1'>
                { isLoading && <CategoryLoader /> }
                { !isLoading && categories ?
                    categories.map((category, i) => {
                        return (
                            <Category key={i} 
                                category={category} 
                                handleState={handleState}
                                handleLoading={state => setIsLoading(state)} />
                        );
                    }) : null
                }
                
                <button className='card-btn' onClick={showForm}>
                        <i className='bi bi-plus card-icon'></i>
                        New Category
                </button>
            </div>
            

            <p className='text-xs font-huge 
                          tracking-widest uppercase
                          text-right text-yellow'>
                Available to budget: 
                <span className={`${available < 0 ? 'text-red-500' : 'text-moneygreen' } font-block font ml-2`}>{ dollarUs.format(available)}</span>
            </p>
        </div>
    );
};

export default Categories;