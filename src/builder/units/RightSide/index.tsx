import { createUnit } from '../../utils';

export const rightSideUnit = createUnit({
    component: 'Side',
    childUnits: [],
    'params': {
        'text': 'string'
    },
    useMapProps: ({ params: { text } }) => ({ text }),
    modelFields: {
        imports: {
            "events": {
                x: 'string'
            },
            "stores": {
            
            }
        },
        exports: {
            "events": {},
            "stores": {}
        }
    },
    model: () => {
        console.log(' model right side unit ')
        return {}
    }
})