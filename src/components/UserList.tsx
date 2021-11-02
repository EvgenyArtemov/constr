import React, { FC } from "react";

import { PropsWithChildUnits } from '../builder/types';

type User = {
    name: string,
    age: string
}

type Props = PropsWithChildUnits<{
    users: User[],
    filter: string
}>

export const UserList: FC<Props> = ({
    filter,
    users
}) => {
    return (
        <div>
            <p>{filter}</p>
            <ul>
                {users.map(({ name, age }) => <li>{name} - {age}</li> )}
            </ul>
        </div>
    )
}