import { createUnit } from '../../utils';

export const headerUnit = createUnit({
    'childUnits': {
        "Form": "required"
    },
    'component': 'Header',
    'params': {
        headerText: 'string'
    },
    'useMapProps': ({ params: { headerText } }) => ({ 'text': headerText }),
    modelFields: null,
    model: null
})