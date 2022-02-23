import React, { useState } from 'react';

const UpdateField = ({ model, field, update, hide, form  }) => {
    const [value, setValue] = useState(model[field]);
     
    return (
        <div className='w-fit flex flex-col h-full justify-start'>
            { form({ value, setValue }) }
            <div className='flex space-x-1 justify-around'>
              <button onClick={hide} className='card-btn card-btn-close'>
                cancel
              </button>
              <button onClick={() => {
                if (!value) return hide();
                update(value, field);
              }} className='card-btn'>
                submit
              </button>
          </div> 
        </div>
    );
};

export default UpdateField;
