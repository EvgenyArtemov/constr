import * as units from '../units';
import type { UnitsTypeKeys } from '../types';

export const getUnitByNode = 
    <T extends UnitsTypeKeys>({ name }: { name: T }) => {
        return units[name]
    }

