import React, { useState } from 'react';
import CategoryService from '../services/category.service';

const AmountForm = ({ id, update, hideForm }) => {
    const [amount, setAmount] = useState("");

    const editCategory = () => {
        CategoryService.update(id, amount)
            .then(() => update(id))
            .catch(err => console.log(err));
    };

    return (
        <div className='w-fit flex flex-col'>
            <input 
                className='bg-carbon text-white w-1/2 
                           font-huge text-xl focus:outline-none'
                type="text"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder='$0.00' />
            <div className='flex space-x-1'>
                <button onClick={hideForm}
                    className='px-2 text-md bg-red-500 font-big text-white'>
                    Cancel
                </button>
                <button onClick={() => {}}
                    className='px-1 text-md bg-moneygreen font-big text-white'>
                    Submit
                </button>
            </div>
        </div>
    );
};

export default AmountForm;