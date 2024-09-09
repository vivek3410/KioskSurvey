import React from 'react';

function ConfirmSubmissionModel({ handleConfirmationDialog, onSubmit }) {

    return (
        <div className='absolute bg-white p-4 flex flex-col rounded-md w-[20em] gap-8 shadow-xl'>
            <h1 className='text-xl font-medium'>Confirm Submission</h1>
            <div className='flex items-center justify-end gap-4'>
                <button className='bg-red-500 text-white p-2 rounded-md' onClick={handleConfirmationDialog}>Cancel</button>
                <button className='bg-dark-blue p-2 rounded-md text-white' onClick={onSubmit}>Submit</button>
            </div>
        </div>
    );
}

export default ConfirmSubmissionModel;
