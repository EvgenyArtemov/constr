import { createUnit } from '../../utils';
export const bodyUnit = createUnit({
    component: 'Body',
    childUnits: {
        'BodyChild': 'required',
        'UserList': 'required'
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