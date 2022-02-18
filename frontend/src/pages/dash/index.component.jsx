import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { reset } from '../../features/auth/authSlice';
import { toast } from 'react-toastify';

import Accounts from '../../components/accounts/index.component';
import Categories from '../../components/categories/index.component'
import Header from '../../components/header/index.component';

const Dash = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isError, message } = useSelector(state => state.auth);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (!user) {
            navigate('/login');
        }

        dispatch(reset());

    }, [user, isError, message, navigate, dispatch])

    if (!user) return <h1>Loading...</h1>

    return (
        <div className='w-full flex flex-col space-y-6 items-center justify-center bg-dark/95 pt-20 lg:pl-20 xl:justify-center lg:pt-0 sm:flex-row sm:space-x-2'>
            <Header />
            <div className='flex flex-col sm:flex-row items-center w-full h-full space-x-0 space-y-3 sm:space-x-4
                            sm:w-fit sm:space-y-0 sm:max-h-[580px] z-10 sm:items-start'>
                <Accounts />
                <Categories />
            </div>
        </div>
    );
};

export default Dash;