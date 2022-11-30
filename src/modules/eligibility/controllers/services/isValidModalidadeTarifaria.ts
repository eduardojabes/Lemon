import { modalidadesTarifarias } from "../../models/tipos"

export function isValidModalidadeTarifaria(inputModalidadeTarifarias: typeof modalidadesTarifarias[0]) {
    
    if (typeof inputModalidadeTarifarias !== typeof modalidadesTarifarias[0]) return false; //Obvious

    return modalidadesTarifarias.includes(inputModalidadeTarifarias);
}

