import type { ComponentProps, FC } from 'react';
import type { ComponentsTypeKeys, ComponentsType, SchemaUnitParams } from '../types/types';
import * as Components from '../../components';
import { createComponentWrapper } from './createComponentWrapper';
import { Event, Store} from 'effector';

export const createUnit = <
    T extends ComponentsTypeKeys,
    K extends { [key: string]: 'string' | 'number'  },
    M extends null | {
        imports: { stores: { [K: string]: 'string' | 'number' }, events: { [K: string]: 'string' | 'number' } },
        exports: { stores: { [K: string]: 'string' | 'number' }, events: { [K: string]: 'string' | 'number' } }
    },
    Local extends { [K: string]: Event<any> | Store<any> },
    Imports extends { stores: { [K: string]: 'string' | 'number' }, events: { [K: string]: 'string' | 'number' }} = Exclude<M, null>['imports'],
    Exports extends { stores: { [K: string]: 'string' | 'number' }, events: { [K: string]: 'string' | 'number' }} = Exclude<M, null>['exports']
>({
    component,
    childUnits,
    params,
    useMapProps,
    modelFields,
    model
}: {
    component: T,
    childUnits: GetChildUnitType<ComponentsType[T]>,
    params: K,
    useMapProps: (args: 
        {   
            params: SchemaUnitParams<K>,
            exports: MapFields<Exports>['stores'] & MapFields<Exports>['events'],
            local: Local
        },
    ) => Omit<ComponentProps<typeof Components[T]>, 'childUnits'>,
    modelFields: M,
    model: M extends null ? null : (arg: { 
        params: SchemaUnitParams<K>,
        imports: MapFields<Imports>['stores'] & MapFields<Imports>['events'],
    }) => { 
        exports: MapFields<Exports>['stores'] & MapFields<Exports>['events'],
        local: Local
    }
}) => ({
    component,
    childUnits,
    params,
    Component: createComponentWrapper(Components[component], component, useMapProps),
    modelFields,
    model
} as const )

type MapStores<T extends { [K: string]: 'string' | 'number' } > = 
    { [K in keyof T]: Store< T[K] extends 'string' ? string : number > }

type MapEvents<T extends { [K: string]: 'string' | 'number' } > = 
{ [K in keyof T]: Event< T[K] extends 'string' ? string : number > }

export type MapFields<T extends { stores: { [K: string]: 'string' | 'number' }, events: { [K: string]: 'string' | 'number' } }> = {
    stores: MapStores<T['stores']>,
    events: MapEvents<T['events']>
}


type GetChildUnitType<T extends FC<any>> = ComponentProps<T> extends { childUnits: infer ChildUnits }
    ? ChildUnits extends any[]
        ? []
        : { [K in keyof ChildUnits]: 'required' }
    : null;

export type GetChildUnitTypeComponents<T extends FC<any>> = ComponentProps<T> extends { childUnits: infer ChildUnits }
? ChildUnits extends []
    ? FC<any>[]
    : { [K in keyof ChildUnits]: FC<any> }
: null;
