import React, { useState } from 'react';

const UpdateField = ({ model, field, update, hide, form  }) => {
    const [value, setValue] = useState(model[field]);
     
    return (
        <div className='w-fit flex flex-col h-full justify-start'>
            { form({ value, setValue }) }
            <div className='flex space-x-1 items-center text-xl'>
                <button onClick={hide}
                    className='flex-1 px-2 py-1 rounded-sm bg-red-500 font-semibold text-white'>
                    Cancel
                </button>
                <button onClick={() => {
                    if (!value) return hide();
                    update(value, field);
                }}
                    className='flex-1 px-2 py-1 rounded-sm bg-green-500 font-semibold text-white'>
                    Submit
                </button>
            </div>
        </div>
    );
};

export default UpdateField;