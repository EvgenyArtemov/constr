import { createEvent } from 'effector';
import { createUnit } from '../../utils';

export const leftSideUnit = createUnit({
    component: 'Side',
    childUnits: [],
    'params': {
        'text': 'string'
    },
    useMapProps: ( { params: { text } } ) => ({ text }),
    modelFields: {
        "imports": { "events": {}, "stores": {} },
        "exports": { "stores": {}, "events": { x: "string" } }
    },
    model: () => {
        console.log(' model left side unit ')
        return { x: createEvent<string>() }
    }
})