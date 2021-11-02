import React, { FC } from 'react';
import { PropsWithChildUnits } from '../builder/types'

type Props = PropsWithChildUnits<{
    text: string
}, 'BodyChild'>

export const Body: FC<Props> = ({
    text,
    childUnits: {
        BodyChild
    }
}) => {
    return (
        <div className='body' >
            {text}
            <BodyChild />
        </div>
    )
}