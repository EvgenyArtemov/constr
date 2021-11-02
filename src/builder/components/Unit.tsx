import React, { FC } from 'react';
import { useStoreMap } from 'effector-react';
import * as units from '../units'
import { $schema, $models } from '../model'

type Props = {
    unitId?: string
}

export const Unit: FC<Props> = ({
    unitId = 'main'
}) => {
    const node = useStoreMap($schema, ({ [unitId]: unit }) => unit)
    const model = useStoreMap($models, ({ [unitId]: model }) => model);
    console.log('render', unitId)
    if (node === undefined) {
        return null;
    }
    const unit = units[node.name];


    if (unit.childUnits === null && node.childUnits === null) {
        const Component  = unit.Component as any;
        return <Component model={model} childUnits={null} params={node.params as any} />
    } else if (Array.isArray(unit.childUnits) && Array.isArray(node.childUnits) ) {
        const C = unit.Component;
        const Component = C as FC<any>;
        const { childUnits } = node;
        return <Component model={model as any} params={node.params as any} childUnits={
            childUnits.map((childId: string): FC => () => {
                return (
                    <Unit unitId={childId} />
                )
            }) 
        } />
    } else if (
        unit.childUnits !== null && !Array.isArray(unit.childUnits) &&
        node.childUnits !== null && !Array.isArray(node.childUnits)
    ) {
        const { Component } = unit;
        const { childUnits } = node; 
        const childs = 
            Object.fromEntries(
                Object.entries(childUnits)
                    .map(([child, childId]): [string, FC] => [
                    child, 
                    (props) => {
                        return <Unit key={unitId} unitId={childId} />
                    }
                ])
            )
        
        return <Component model={model as never} params={node.params as any} childUnits={childs as any} />
    }
    return null;
}

