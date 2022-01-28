import React, { useState } from 'react';
import CategoryService from '../services/category.service';

const AmountForm = ({ id, amount, update, hideForm }) => {
    const [newAmount, setNewAmount] = useState(amount);

    const editCategory = async () => {
        const formatted = parseFloat(newAmount)
        await CategoryService.update(id, formatted, "amount")
            .then(() => update(id, formatted))
            .catch(err => console.log(err));
        hideForm();
    };

    return (
        <div className='w-fit flex flex-col'>
            <input 
                className='appearance-none bg-dark text-white w-1/2
                           font-huge text-lg focus:outline-none'
                type="number"
                value={newAmount}
                onChange={e => setNewAmount(e.target.value)}
                placeholder='$0.00' />
            <div className='flex space-x-1'>
                <button onClick={hideForm}
                    className='px-2 text-md bg-red-500 font-big text-white'>
                    Cancel
                </button>
                <button onClick={editCategory}
                    className='px-1 text-md bg-moneygreen font-big text-white'>
                    Submit
                </button>
            </div>
        </div>
    );
};

export default AmountForm;