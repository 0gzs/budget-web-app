import React from 'react';

const ButtonGroup = ({ close, submit }) => {
    return (
        <div className="flex space-x-3">
            <button 
                className="bg-gray-300 py-2 px-3 rounded text-gray-500 font-bold basis-1/2"
                onClick={close}
                >
                    Cancel
            </button>
            <button 
                className="bg-green-600 py-2 px-3 rounded text-white font-bold basis-1/2"
                onClick={submit}
                >
                    Submit
            </button>
        </div>
    );
};

export  default ButtonGroup;