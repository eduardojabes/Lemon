import { tiposDeConexao } from "../../models/tipos"

export function isValidTipoDeConexao(inputTipoDeConexao: typeof tiposDeConexao[0]) {
    
    if (typeof inputTipoDeConexao !== typeof tiposDeConexao[0]) return false; //Obvious

    return tiposDeConexao.includes(inputTipoDeConexao);
}

