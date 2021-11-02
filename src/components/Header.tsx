import React, { FC } from 'react';

import { PropsWithChildUnits } from '../builder/types'

type Props = PropsWithChildUnits<{
    text: string
}, 'Form'>

export const Header: FC<Props> = ({
    text,
    childUnits: {
        Form
    }
}) => {
    return (
        <div className='header' >
            {text}
            <br />
            <Form />
        </div>
    )
}