import { createUnit } from '../../utils';
import { createEvent } from 'effector';

export const buttonUnit = createUnit({
    component: 'Button',
    "childUnits": null,
    "params": {},
    "modelFields": {
        "imports": { stores: {}, events: {} },
        "exports": { stores: {}, events: { onClick: "string" } },
    },
    "model": () => {
        const onClick = createEvent<string>()

        return {
            exports: {
                onClick
            },
            local: {}
        }
    },
    useMapProps: ({ exports: { onClick } }) => ({ onClick })
})