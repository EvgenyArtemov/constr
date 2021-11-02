import { createUnit } from '../../utils';

import { useStore } from 'effector-react';

export const bodyUnit = createUnit({
    component: 'Body',
    childUnits: {
        'BodyChild': 'required'
    },
    'params': {
        'text': 'string'
    },
    useMapProps: ({ params: { text } }) => {
        return { text }
    },
    model: null,
    modelFields: null
})