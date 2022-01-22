import React from 'react';
import AccountForm from '../../domain/account/account-form.component';
import CategoryForm from '../../domain/category/category-form.component';
import TransactionForm from '../../domain/transaction/transaction-form.component';

const Modal = ({ show, handleClose, formName, handleAccountsUpdate, handleCategoriesUpdate, handleTransactionsUpdate }) => {
    const showHideClassName = show ? ("fixed overflow-hidden z-20 inset-0 bg-black/[0.4] overflow-y-auto h-full w-full flex justify-center items-center") : "hidden"; 

    const handleChildren = () => {
        switch (formName) {
            case "account":
                return <AccountForm close={handleClose} handleUpdate={handleAccountsUpdate} />
            case "category":
                return <CategoryForm close={handleClose}  handleUpdate={handleCategoriesUpdate} />
            case "transaction":
                return <TransactionForm close={handleClose} handleUpdate={handleTransactionsUpdate} />
            default:
                break;
        }
    };

    return (
        <div className={showHideClassName}>
            <section className='border rounded-lg bg-slate-100 w-[22rem] h-fit p-4 shadow-md'>
                { handleChildren() }
            </section> 
        </div>
    );
};

export default Modal;