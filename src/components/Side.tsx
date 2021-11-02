import React, { FC } from 'react';
import { PropsWithChildUnits } from '../builder/types'

type Props = PropsWithChildUnits<{
    text: string
}, []>

export const Side: FC<Props> = ({
    text,
    childUnits
}) => (
    <div className='side' >
        {text}
        { childUnits.map(Child => <Child />) }
    </div>
)