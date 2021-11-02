import { Event, Store } from 'effector';
import type { FC } from 'react';
import type * as Components from '../../components';
import type * as Units from '../units';

export type PropsWithChildUnits<Props = {}, UnitChildNames extends string | [] = never> = 
    Props & {
            childUnits: [UnitChildNames] extends [never]
                ? null
                : [UnitChildNames] extends [string]
                    ? Record<UnitChildNames, FC>
                    : FC[]
            }

export type Uni = typeof Units;
export type UnitsTypeKeys = keyof typeof Units;
export type UnitsType = typeof Units[UnitsTypeKeys];
export type ComponentsType = typeof Components;
export type ComponentsTypeKeys = keyof typeof Components;

export type SchemaUnitParams <U> = U extends [never] ? null : { 
    [K in keyof U]: U[K] extends 'string' 
        ? string
        : U[K] extends 'number'
            ? number
            : never
}

export type SchemaUnitType<U extends UnitsTypeKeys = UnitsTypeKeys> = U extends any
    ? Omit<Uni[U], 'childUnits' | 'params' | 'component' | 'Component' | 'modelFields' | 'model'> & {
        id: string,
        params: SchemaUnitParams<Uni[U]['params']>
        name: U
        childUnits: Uni[U]['childUnits'] extends null
                ? null
                : Uni[U]['childUnits'] extends any[]
                    ? string[]
                    :  { [K in keyof Uni[U]['childUnits']]: string },
        requires: ModelFields<Uni[U]['modelFields']>,
    }
    : never

type ModelFields<T extends UnitsType['modelFields'], NT extends NonNullable<T> = NonNullable<T>> = T extends null ? null :
[keyof NT['imports']['events'] | keyof NT['imports']['stores']] extends [never]
    ? null
    : { [K in keyof NT['imports']['stores'] ]: [string, string]  } &
    { [K in keyof NT['imports']['events'] ]: [string, string]  }

export type Model = { 
    exports:  { [K: string]: Event<string | number> | Store<string | number> },
    local: { [K:string]: Event<any> | Store<any> }
}

export type Models = { [unitId: string]: Model }
export type Schema = { [unitId: string]: SchemaUnitType<UnitsTypeKeys> }
