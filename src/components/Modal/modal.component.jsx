import React from 'react';
import AddTransaction from './children/add-transaction.component';
import AddAccount from './children/add-account.component';

const Modal = ({ handleClose, show, formName }) => {
    const showHideClassName = show ? ("fixed overflow-hidden inset-0 bg-gray-700 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center") : "hidden"; 

    const handleChild = () => {
        switch (formName) {
            case "account":
                return <AddAccount cancel={handleClose} />
            case "transaction":
                return <AddTransaction />
            default:
                break;
        }
    };

    return (
        <div className={showHideClassName}>
            <section className='border rounded-lg bg-white w-[22rem] h-fit p-4'>
                { handleChild() }
            </section> 
        </div>
    );
};

export default Modal;