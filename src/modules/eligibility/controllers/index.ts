import { FromSchema } from "json-schema-to-ts";
import { cpf, cnpj, tiposDeConexao, classesDeConsumo, modalidadesTarifarias } from "../models/tipos"

import { isValidCPF } from './services/IsValidCPF';
import { isValidCNPJ }from "./services/IsValidCNPJ";
import { isValidTipoDeConexao } from "./services/isValidTipoDeConexao";
import { isValidClasseDeConsumo } from "./services/isValidClasseDeConsumo";
import { isValidModalidadeTarifaria } from "./services/isValidModalidadeTarifaria"
import { getMean } from "./services/getMean"

export default {
    isValidCPF: (inputCPF: FromSchema<typeof cpf>) => isValidCPF(inputCPF),

    isValidCNPJ: (inputCNPJ: FromSchema<typeof cnpj>) => isValidCNPJ(inputCNPJ),

    isValidTipoDeConexao: (inputTipoDeConexao: typeof tiposDeConexao[0]) => isValidTipoDeConexao(inputTipoDeConexao),

    isValidModalidadeTarifaria: (inputModalidadeTarifarias: typeof modalidadesTarifarias[0]) => isValidModalidadeTarifaria(inputModalidadeTarifarias),

    isValidClasseDeConsumo: (inputClasseDeConsumo: typeof classesDeConsumo[0]) => isValidClasseDeConsumo(inputClasseDeConsumo), 

    getMean: (historicoDeConsumo: number[]) => getMean(historicoDeConsumo),
};