import React from 'react';

const AccountLoader = () => {
    return (
        <div className='w-full bg-dark flex px-3 py-2 items-center justify-around relative group'>
            <p className='w-6 h-6 bg-carbonlight'></p>
            <p className='w-2/3 p-2 bg-carbonlight ml-2'></p>
            <div className='min-w-[94px] flex justify-end'>
                <p className='w-fit bg-carbonlight px-2 py-1 rounded-md text-moneygreen text-md font-big'></p>
            </div>
        </div>
    );
};

export default AccountLoader;