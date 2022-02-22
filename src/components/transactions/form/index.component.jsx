import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import TypeButton from './type-btn.component';

const TransactionForm = ({ hide, submit}) => {
    const { categories } = useSelector(state => state.categories);
    
    let typeClasses = useMemo(() => {
        return { red: "bg-red-500", green: "bg-moneygreen justify-end" }
    }, []);

    const [typeColor, setTypeColor] = useState(typeClasses.red);
    const [transaction, setTransaction] = useState({
        description: "",
        date: "",
        amount: "",
        type: 0,
        category: "",
        account: "",

    })

    const onChange = (e, field=null, value=null) => setTransaction(prevState => ({
        ...prevState,
        [field || e.target.name]: value || e.target.value
    }))
    
    function handleType(e) {
        onChange(e, "type", !transaction.type)
        setTypeColor(typeColor === typeClasses.red ? typeClasses.green : typeClasses.red);
    }

    return (
        <div className='modal'>
            <div className='form-container'>
                <h1 className='form-title'>add transaction</h1>
                <div className='form'>
                    <div className='w-full items-center'>
                        <div className='w-full'>
                            <label className='form-label'>description</label>
                            <input 
                                type="text"
                                name="description"
                                placeholder='description'
                                value={transaction.description}
                                onChange={onChange}
                                className={`form-input focus:outline-none focus:border-4 focus:border-cyan-300 w-full`} />
                        </div>
                        
                    </div>
                    <div className='w-full flex space-x-3 items-center'>
                        <div className='form-group w-2/3'>
                            <label className='form-label'>date:</label>
                            <input 
                                type="date" 
                                name="date"
                                value={transaction.date}
                                onChange={onChange}
                                className='form-input focus:outline-none focus:border-4 focus:border-cyan-300 w-full' />
                        </div>
                        <div className='flex-1 flex flex-col'>
                            <label className='form-label'>type</label>
                            <TypeButton typeColor={typeColor} handle={handleType} />
                        </div>
                    </div>
                    <div className='w-full flex space-x-3'>
                    <div className='form-group w-1/3'>
                            <label className='form-label'>Amount</label>
                            <input 
                                type="text"
                                name="amount"
                                className='form-input focus:outline-none focus:border-4 focus:border-cyan-300 w-full'
                                placeholder={`$0.00`}
                                inputMode="decimal"
                                value={transaction.amount}
                                onChange={onChange} />
                        </div>
                        <div className='form-group w-2/3'>
                            <label className='form-label'>Category</label>
                            <select 
                                value={transaction.category}
                                name="category"
                                onChange={onChange}
                                className='form-select form-input focus:outline 
                                focus:border-4 focus:outline-cyan-200 text-white
                                 border-2 border-transparent' >
                                <option value={null} onChange={onChange}>-Category</option>
                                {categories && categories.map((category, i) => {
                                    return <option key={i} 
                                                className=' font-medium font-sans capitalize' 
                                                value={category._id}> {category.name} </option>
                                })}
                            </select>
                        </div>
                    </div>
                </div>
                <div className='form-btn-group'>
                    <button onClick={hide}
                        className='card-btn card-btn-close'>close</button>

                    <button onClick={() => submit(transaction)}
                        className='card-btn'>submit</button>
                </div>
            </div>
        </div>
    );
};

export default TransactionForm;