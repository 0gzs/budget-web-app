import React from 'react';

const Header = ({ signOut, username }) => {
    return (
        <header className='w-full py-3 px-8 md:px-16 bg-black/50 lg:bg-carbonblue fixed
                top-0 shadow-inner flex justify-between
                items-center z-10'>
            <div className='card-label text-neutral-50 text-2xl'>
                <p className='tracking-widest'>{username}</p>
            </div>
            <ul className='flex space-x-2 justify-end'>
                <li className='card-label px-3'>
                    <i className='bi bi-gear-fill text-white'></i>
                </li>
                <div className='card-label text-md text-cyan-200' onClick={signOut}>
                    <p>Sign out</p>
                </div>
            </ul>
        </header>
    );
};

export default Header;