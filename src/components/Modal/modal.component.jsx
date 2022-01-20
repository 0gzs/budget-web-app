import React from 'react';
import AccountForm from '../../domain/account/account-form.component';
import CategoryForm from '../../domain/category/category-form.component';

const Modal = ({ show, handleClose, formName, handleAccountsUpdate, handleCategoriesUpdate }) => {
    const showHideClassName = show ? ("fixed overflow-hidden inset-0 bg-gray-700 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center") : "hidden"; 

    const handleChildren = () => {
        switch (formName) {
            case "account":
                return <AccountForm cancel={handleClose} close={handleClose} handleUpdate={handleAccountsUpdate} />
            case "category":
                return <CategoryForm cancel={handleClose} close={handleClose}  handleUpdate={handleCategoriesUpdate} />
            default:
                break;
        }
    };

    return (
        <div className={showHideClassName}>
            <section className='border rounded-lg bg-slate-100 w-[22rem] h-fit p-4'>
                { handleChildren() }
            </section> 
        </div>
    );
};

export default Modal;