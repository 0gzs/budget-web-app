import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../features/auth/authSlice';
import helpImage from '../../assets/budget.png';
import helpImage2 from '../../assets/budget2.png';

const Header = () => {
    const [help, setHelp] = useState(false);

    const [currentImage, setCurrentImage] = useState(helpImage);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);

    const viewHelp = () => setHelp(true);
    const hideHelp = () => setHelp(false);

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/login');
    }

    return (
        <header className='w-full sm:w-[120px] sm:px-1 sm:h-full bg-[#181D20] fixed
                top-0 sm:bottom-0 left-0 right-0 shadow-inner flex sm:flex-col justify-between
                items-center z-20 px-4 sm:py-10'>

            {help && (
                <div className='modal'>
                    <div className='w-[340px] sm:w-[800px] p-4 bg-carbon flex flex-col space-y-2 sm:space-y-0 sm:flex-row items-center rounded-md'>
                        <div className='w-full sm:w-2/3'>
                            <img src={currentImage} className="w-full" alt="More information" />
                        </div>
                        <div className='w-full sm:w-1/3 flex flex-col sm:h-[375px] sm:justify-between'>
                            
                                {currentImage === helpImage ? (
                                    <h1 className='text-white p-2 text-2xl font-semibold font-mono'>
                                        Create a 'bank' account to categorize your spending and start tracking.
                                    </h1>
                                ): (
                                    <h1 className='text-white p-2 text-2xl font-semibold font-mono'>
                                        Click on the account item to view more details and add transactions.
                                    </h1>
                                )}
                            <div className='form-btn-group'>
                                {currentImage === helpImage ? (
                                    <>
                                        <button onClick={hideHelp} className="card-btn card-btn-close">close</button>
                                        <button onClick={() => setCurrentImage(helpImage2)} className="card-btn">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#fff">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </>
                                ): 
                                    <>
                                        <button onClick={() => setCurrentImage(helpImage)} className="card-btn">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#fff">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                        </button>
                                        <button onClick={hideHelp} className="card-btn card-btn-close">close</button>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className='card-label text-neutral-50'>
                <p className='tracking-widest text-base'>{user.username}</p>
            </div>
            <ul className='flex items-center sm:flex-col sm:space-y-2 justify-end'>
                <h1 className='text-white text-center font-bold hover:cursor-pointer' onClick={viewHelp}>Help <span className='py-1 px-2.5 bg-white/20 rounded-full'>?</span></h1>
                <li>
                    <button className='p-4 text-white flex font-bold' onClick={onLogout}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#fff">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                        Logout
                    </button>
                </li>
            </ul>
        </header>
    );
};

export default Header;