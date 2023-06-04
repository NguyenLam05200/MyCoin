import React from 'react';
import classNames from 'classnames';
import Spinner from './Spinner';

const ButtonV2 = ({ className = '', disabled = false, children, variants = 'primary', onClick, loading, ...props }) => {
    const extendClass = {
        primary: 'bg-green-3 hover:bg-green-4   text-white',
        red: 'text-white bg-red',
        text: 'whitespace-nowrap px-0 text-green-3 hover:text-green-4 active:text-green-4  ',
        secondary: 'whitespace-nowrap bg-gray-10 hover:bg-gray-6 text-gray-15  '
    }[variants];

    return (
        <button
            className={classNames(
                'flex items-center justify-center rounded-md px-auto py-auto font-semibold h-11 sm:h-12 text-sm sm:text-base w-full py-3 space-x-1 duration-75',
                {
                    '!bg-gray-12   !text-txtDisabled  ': disabled && !loading,
                    'pointer-events-none': loading
                },
                extendClass,
                className
            )}
            onClick={onClick}
            disabled={loading || disabled}
        >
            {!loading ? children : <Spinner />}
        </button>
    );
};

export default ButtonV2;
