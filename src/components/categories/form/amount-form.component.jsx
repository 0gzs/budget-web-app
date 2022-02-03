import React, { useState } from 'react';

const AmountForm = ({ category, hideForm, updateAmount }) => {
    const [newAmount, setNewAmount] = useState(category.amount);
     
    return (
        <div className='w-fit flex flex-col h-full justify-around'>
            <input
                type="text"
                className='bg-dark text-white w-1/2
                rounded-md text-xl focus:outline-none font-huge'
                prefix='$'
                placeholder={`${newAmount}`}
                value={newAmount === 0 ? "" : newAmount}
                onChange={e => setNewAmount(e.target.value)} />
            <div className='flex space-x-1 items-center'>
                <button onClick={hideForm}
                    className='flex-1 px-2 py-1 text-sm rounded-sm bg-red-500 font-semibold text-white'>
                    Cancel
                </button>
                <button onClick={() => {
                    if (!newAmount) {
                        updateAmount(0);
                        hideForm();
                    };
                    updateAmount(newAmount)
                }}
                    className='flex-1 px-2 py-1 text-sm rounded-sm bg-moneygreen font-semibold text-white'>
                    Submit
                </button>
            </div>
        </div>
    );
};

export default AmountForm;