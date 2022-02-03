import React from 'react';

const TransactionLoader = () => {
    return (
        <div className='w-full py-2
                rounded-md font-source
                flex items-center bg-carbon
                shadow-inner'>
            <div className={`text-xl p-2.5 mx-3 rounded-sm 
                hover:cursor-pointer w-fit bg-carbonlight`}></div>
            <div className='text-left flex-1'>
                <p className='text-md w-1/3 font-big uppercase p-2 bg-carbonlight'></p>
                <p className='text-md w-2/3 mt-1 text-cyan-400 font-big p-2 bg-carbonlight'></p>
            </div>
            <div className='p-2 rounded-md w-fit bg-carbonlight justify-self-end
                            mr-4 text-center min-w-[94px]'>
                <p className={`font-huge`}></p>
            </div>
        </div>
    );
}

export default TransactionLoader;