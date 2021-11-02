import { createStore  } from 'effector';
import { Schema, Models, SchemaUnitType, Model } from '../types';
import { getUnitByNode } from '../utils';

export const $schema = createStore<Schema>({
    form: {
        id: "form",
        name: "buttonUnit",
        childUnits: null,
        params: {},
        requires: null
    },
    main: { 
        'id': 'main',
        'name': 'threeColumnsUnit',
        'childUnits': {
            'Center': '4',
            'Left': '2',
            'Right': '3',
            'Header': '1'
        },
        params: {
            "someValue": 'hui'
        },
        requires: {
            "x": ['2', 'x'],
        }
     },
     '1': {
        id: '1',
        name: 'headerUnit',
        childUnits: {
            "Form": 'model'
        },
        params: {
            'headerText': 'header'
        },
        requires: null,
    },
    '2': {
        id: '2',
        name: 'leftSideUnit',
        childUnits: ['form'],
        params: {
            'text': 'left'
        },
        requires: null
    },
    '3': {
        id: '3',
        name: 'rightSideUnit',
        childUnits: [],
        params: {
            text: 'right'
        },
        requires: {
            "x": ['2', 'x']
        },
    },
    '4': {
        id: '4',
        name: 'bodyUnit',
        childUnits: {
            'BodyChild': '3'
        },
        params: {
            text: 'center'
        },
        requires: null
    },
    'model': {
        id: 'model',
        name: 'formUnit',
        childUnits: null,
        params: {
            defaultValue: 'default value'
        },
        requires: {
            'toggle': ['form', 'onClick']
        },
    }
})

export const $models = $schema.map<Models>((schema, models = {  }) => {
    const newModels = { ...models };

    const createModel = (node: SchemaUnitType | undefined): Model | null => {
        if (node === undefined) {
            throw Error(`failed to find node in shema`)
        }

        const oldModel = newModels[node.id] || models[node.id];


        // если уже есть то возвращаем ее
        if (oldModel !== undefined) {
            return oldModel;
        }

        const { requires } = node;
        // если данна модель не отчего не зовисит
        if (requires === null) {
            const { model } = getUnitByNode(node);
            const { params } = node;
            // если модель можно создать
            if (model !== null) {
                const modelResult = newModels[node.id] = model({ params } as any) as Model
                newModels[node.id] = modelResult;
                return modelResult;
            } else {
                return null;
            }
        }

        const { model: createNewModel } = getUnitByNode(node);
        const { params } = node;

        const imports = Object.fromEntries 
        (Object.entries(requires)
            .map(
                ([importName, [ nodeId, exportName ]]) => {
                    const requiredNode = schema[nodeId];
                    if (requiredNode === undefined) {
                        throw new Error(`failed to find required node with id: ${nodeId} at the node ${node}`)
                    }

                    const newModel = createModel(requiredNode);
                    if (newModel === null) {
                        throw new Error('failed to resolve required model');
                    }

                    if (!(exportName in newModel) || newModel[exportName] === undefined) {
                        throw new Error('failed to get required value from model')
                    }

                    return [importName, newModel[exportName]! ]

                }
            )
        )

        const modelResult = createNewModel!({ params, imports } as any);

        newModels[node.id] = modelResult;

        return modelResult;
    }

    Object.values(schema)
        .forEach(
            ((node) => {
                createModel(node)
            })
        )

    return newModels;
})

$models.watch(r => console.log(r))