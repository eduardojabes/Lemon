import { classesDeConsumo } from "../../models/tipos"

export function isValidClasseDeConsumo(inputClasseDeConsumo: typeof classesDeConsumo[0]) {
    
    if (typeof inputClasseDeConsumo !== typeof classesDeConsumo[0]) return false; //Obvious

    return classesDeConsumo.includes(inputClasseDeConsumo);
}

