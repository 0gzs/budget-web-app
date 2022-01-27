import React from 'react';

const CategoryForm = ({ hideForm }) => {
    return (
        <div className='absolute self-center w-[300px]
                      bg-dark p-4 flex flex-col
                        space-y-5 shadow-md bottom-20
                        rounded-lg right-20 text-white'>
            <input 
                className='bg-carbonlight px-3 py-2
                            rounded-md uppercase tracking-widest
                            focus:outline-none                        
                            font-huge'
                placeholder='Category name'
                type="name" />
                
            <div className='w-full flex space-x-2 font-sans'>
                <button onClick={hideForm}
                    className='w-1/3 rounded-sm 
                               text-lg px-3 py-2 bg-carbonlight 
                               uppercase font-huge hover:bg-darkred'>Nvm.</button>
                <button onClick={() => {}}
                    className='w-2/3 rounded-sm 
                               text-lg px-3 py-2 bg-moneygreen 
                               uppercase font-huge'>
                    Add
                </button>
            </div>``
        </div>
    );
};

export default CategoryForm;