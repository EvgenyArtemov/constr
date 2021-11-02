import React, { FC } from 'react';
import type { PropsWithChildUnits } from '../builder/types/types';

type Props = PropsWithChildUnits<{}, 'Header' | 'Left' | 'Center' | 'Right'>

export const ThreeColumnsLayout: FC<Props> = (
    {
        childUnits: {
            Header,
            Center,
            Left,
            Right
        }
    }
) => {
    return (
        <div className='layout' >
            <div className='header-wrapper' ><Header /></div>
            <div className='layout-body' >
                <div>{<Left />}</div>
                <div>{<Center />}</div>
                <div>{<Right />}</div>
            </div>
        </div>
    )
}

