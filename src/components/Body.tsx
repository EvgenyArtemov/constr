import React, { FC } from 'react';
import { PropsWithChildUnits } from '../builder/types'

type Props = PropsWithChildUnits<{
    text: string
}, 'BodyChild' | 'UserList'>

export const Body: FC<Props> = ({
    text,
    childUnits: {
        BodyChild,
        UserList
    }
}) => {
    return (
        <div className='body' >
            {text}
            <BodyChild />
            <br />
            <br />
            <UserList />
        </div>
    )
}