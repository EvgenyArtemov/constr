import { createUnit } from '../../utils';
import { useStore } from 'effector-react';
import { createEvent, createStore } from 'effector';

export const formUnit = createUnit({
    component: 'Form',
    modelFields: {
        "imports": { stores: {}, events: { toggle: 'string' } },
        "exports": { stores: { value: "string", text: 'string' }, events: { onChange: "string" } }
    },
    "childUnits": null,
    "params": {
        "defaultValue": "string"
    },
    useMapProps: (({ model: { value, onChange, text } }) => {
        const v = useStore(value);
        const txt = useStore(text)

        return {
            value: v,
            onChange,
            text: txt
        }
    }),
    model: ({ params: { defaultValue }, imports: { toggle } }) => {
        const value = createStore(defaultValue);
        const setValue = createEvent<string>()
        const text = createStore<string>('click');

        text.on(toggle, (v) => v === 'click' ? 'me' : 'click');

        value.on(setValue, (_, v) => v);

        return {
            value,
            onChange: setValue,
            text
        }
    } 
})