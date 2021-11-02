import { createStore, createEvent } from 'effector';
import { createUnit } from '../../utils';

export const threeColumnsUnit = createUnit({
    component: 'ThreeColumnsLayout',
    childUnits: {
        'Center': 'required',
        'Header': 'required',
        'Left': 'required',
        'Right': 'required'
    },
    params: {
        someValue: 'string'
    },
    useMapProps: ( { params: { someValue }, exports: { x } } ) => ({  }),
    modelFields: {
        "imports": {
            "events": { x: "string" },
            "stores": {  }
        },
        exports: {
            "events": { x: "string" },
            "stores": {}
        }
    },
    model: ({ imports: { x }, params: { someValue } }) => { 
        console.log('model three columns layout', x, someValue)

        return { local: {}, exports:  {'x': createEvent<string>()} }
    }
})