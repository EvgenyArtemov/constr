import React, {FC} from "react";

import { PropsWithChildUnits } from '../builder/types';

type Props = PropsWithChildUnits<{ text: string }, []>;

export const FilterForm: FC<Props> = ({
    text
}) => (
    <div className='filter-form' >
        {text}
    </div>
)