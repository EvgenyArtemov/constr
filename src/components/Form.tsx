import React, { FC, ChangeEvent } from 'react';

import { PropsWithChildUnits } from '../builder/types';

type Props = PropsWithChildUnits<{ 
    onChange: (str: string) => void, 
    value: string, 
    text: string
}>

export const Form: FC<Props> = ({
    onChange,
    value,
    text
}) => {

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => console.log('change') as any || onChange(e.target.value)

    return (
        <>
            {text}
            <input type="text" onChange={handleChange} value={value} />
        </>
    )
};