import React, { ComponentProps, FC } from 'react';
import * as componets from '../../components';

export const createComponentWrapper = 
    <T extends FC<any>, U extends Omit<ComponentProps<T>, 'childUnits'>, P extends keyof typeof componets, Z, Q, W>
    (Component: T, component: P, p: ({ params }: { params: Z, exports: Q, local: W }) => U) => {

    type Props = {
        childUnits: ComponentProps< typeof componets[P] >['childUnits'] extends null
            ? null
            : ComponentProps< typeof componets[P] >['childUnits'] extends any[]
                ? FC[]
                : { [K: string]: FC },
        params: Z,
        model: {
            exports: Q,
            local: W
        }
    }
    const Wrapper: FC<Props> = ({
        childUnits,
        params,
        model
    }) => {


        const propsWithoutChildUnits: Omit<ComponentProps<T>, 'childUnits'> = p({ params, ...model });

        const props: ComponentProps<T>  = {
            childUnits,
            ...propsWithoutChildUnits
        } as ComponentProps<T> // hack

        return (
            <Component {...props} />
        )
    }

    return Wrapper
}