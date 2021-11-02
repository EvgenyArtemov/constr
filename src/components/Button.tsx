import React, { FC } from 'react';

import { PropsWithChildUnits } from '../builder/types';

type Props = PropsWithChildUnits<{ onClick: (str: string) => void }>

export const Button: FC<Props> = ({
    onClick
}) => (
    <button onClick={() => onClick('sdf')} >click me</button>
)