import React from 'react';

const CategoryLoader = () => {
    return (
        <div className={`w-full py-2 rounded-lg bg-dark h-[86px]
                        shrink-0 flex items-center 
                        shadow-md relative`}>
            <div className='w-full animate-pulse flex space-x-2'>
                <div className={ `w-8 h-8 rounded-sm ml-3 bg-carbonlight` }></div>
                
                <div className='w-4/5 ml-2 flex flex-col space-y-1'>
                    <p className='py-2 w-2/3 bg-carbonlight'></p>
                    <div className={`bg-carbonlight w-4/5 py-3 rounded-md`}>
                        <p className=''>
                        </p> 
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryLoader;