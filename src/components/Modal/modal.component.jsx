import React from 'react';
// import AddTransaction from './Children/add-transaction.component';

const Modal = ({ handleClose, show, children }) => {
    const showHideClassName = show ? ("fixed overflow-hidden inset-0 bg-gray-700 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center") : "hidden"; 

    return (
        <div className={showHideClassName}>
            <section className='border bg-white w-[22rem] h-[22rem] flex flex-col justify-center items-center'>
                {/* {children} */}
                {/* <AddTransaction /> */}
                <button className='bg-violet-500 py-2 px-4 rounded text-white' onClick={handleClose}>
                    Close
                </button>
            </section> 
        </div>
    );
};

export default Modal;