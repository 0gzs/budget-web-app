import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import dollarUs from '../../functions/currency-formatter';

import Category from './category.component';
import CategoryForm from './form/form.component';
import CategoryLoader from './loader.component';
import { getCategories, updateCategory, reset } from '../../features/categories/categoriesSlice';

const Categories = () => {
    const [updating, setUpdating] = useState(-1);
    const [totalBalance, setTotalBalance] = useState(0);
    const [available, setAvailable] = useState(0);
    const [show, setShow] = useState(false);

    const showForm = () => setShow(true);
    const hideForm = () => setShow(false);

    const { categories, isError, isLoading, message } = useSelector(state => state.categories);
    const { accounts } = useSelector(state => state.accounts);

    const dispatch = useDispatch();

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        dispatch(getCategories());

        return () => {
            dispatch(reset());
        }
    }, [isError, dispatch, message]);

    useEffect(() => {
        if (accounts) calculateBalance();

        async function calculateBalance() {
            let totalBal = 0;
            accounts.forEach(account => {
                if (account) totalBal += account.balance;
            });
            setTotalBalance(totalBal);
        }
    }, [accounts]);

    useEffect(() => {
        let availableBalance = totalBalance;
        if (categories) categories.forEach(category => availableBalance -= parseFloat(category.amount));
        setAvailable(availableBalance);
    }, [totalBalance, categories]);

    const update = async (id, categoryData, field) => {
        setUpdating(id);

        const data = {
            id: id,
            categoryData,
            field
        }

        await dispatch(updateCategory(data));
        
        setUpdating(-1);
    };

    return (
        <div className={`card ] min-h-[300px] ${categories && categories.length > 4 ? 'h-[4000px]': 'max-h-[400px'}`}>
            <h1 className='card-title'>categories</h1>
            <div className='relative bg-carbonlight w-full max-h-[500px] p-3 grid grid-cols-2 gap-2 overflow-x-auto no-scrollbar'>
                {categories && categories.length > 0 ? (
                    categories.map((category, i) => {
                        if (updating === category._id && isLoading) return <CategoryLoader key={i} />
                        return (
                            <Category  
                                key={i}
                                category={category} 
                                update={update} />
                        );
                    })) :
                    <p className='italic text-gray-400 w-[200%] text-center font-mono'>No categories yet</p>
                }
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
                    hide={hideForm}
                    show={showForm} />}
        </div>
    );
};

export default Categories;