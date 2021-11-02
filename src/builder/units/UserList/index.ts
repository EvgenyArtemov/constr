import { createUnit } from '../../utils';
import { useStore } from 'effector-react';
import { createStore, forward } from 'effector';

export const userListUnit = createUnit({
    "component": "UserList",
    "childUnits": null,
    "params": {
        "initialFilter": "string"
    },
    "modelFields": {
        "imports": {
            "stores": {
                filter: 'string'
            },
            events: {}
        },
        "exports": {
            "stores": {},
            "events": {}
        },
    },
    "model": ({ params, imports }) => {
        console.log(111, params.initialFilter, imports.filter)
        const filter = createStore(params.initialFilter);

        forward({
            from: imports.filter,
            to: filter
        })

        const users = filter.map(( filter ) => [...new Array(10)].map(() => ({
            name: filter,
            age: Math.random() * 10
        })) )

        return {
            exports: {},
            local: { users, filter }
        }
    },
    useMapProps: ({ params, exports, local }) => {

        const users = useStore(local.users as any)
        const filter = useStore(local.filter as any)
        console.log(222, users, filter)
        return {
            filter,
            users
        } as any
    }
})