import React from 'react';
import AddAccount from './children/add-account.component';
import AddCategory from './children/add-category.component';

const Modal = ({ handleClose, show, formName, handleAccountsUpdate }) => {
    const showHideClassName = show ? ("fixed overflow-hidden inset-0 bg-gray-700 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center") : "hidden"; 

    const handleChildren = () => {
        switch (formName) {
            case "account":
                return <AddAccount cancel={handleClose} close={handleClose} handleUpdate={handleAccountsUpdate} />
            case "category":
                return <AddCategory cancel={handleClose} />
            default:
                break;
        }
    };

    return (
        <div className={showHideClassName}>
            <section className='border rounded-lg bg-slate-50 w-[22rem] h-fit p-4'>
                { handleChildren() }
            </section> 
        </div>
    );
};

export default Modal;