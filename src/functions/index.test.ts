import {expect, test} from '@jest/globals'
import { FromSchema } from "json-schema-to-ts";

import {eligibilityHandler} from './eligibility/eligibility'
import {input, output,razoesDeInelegibilidade} from "../modules/eligibility/models/schemas"
import {consumosElegiveis} from "../modules/eligibility/models/tipos"


test('Valid CPF Handler', () => {
    const inputData: FromSchema<typeof input> =
    {
        numeroDoDocumento:'40534713890',
        tipoDeConexao: 'monofasico',
        classeDeConsumo: 'residencial',
        modalidadeTarifaria: 'convencional',
        historicoDeConsumo: [800, 900, 650, 250, 900]
    }

    const expectedOutputData: FromSchema<typeof output> =
    {
        elegivel: true,
        economiaAnualDeCO2: 58.8
    }
    
    const outputData = eligibilityHandler(inputData).then((response) => expect(response).toStrictEqual(expectedOutputData));    
})

test('Valid CNPJ Handler', () => {
    const inputData: FromSchema<typeof input> =
    {
        numeroDoDocumento:'33400689000109', //CNPJ Lemon,
        tipoDeConexao: 'monofasico',
        classeDeConsumo: 'residencial',
        modalidadeTarifaria: 'convencional',
        historicoDeConsumo: [800, 900, 650, 250, 900]
    }

    const expectedOutputData: FromSchema<typeof output> =
    {
        elegivel: true,
        economiaAnualDeCO2: 58.8
    }
    
    const outputData = eligibilityHandler(inputData).then((response) => expect(response).toStrictEqual(expectedOutputData));    
})

test('Invalid CPF', () => {
    const inputData: FromSchema<typeof input> =
    {
        numeroDoDocumento:'40534813890',
        tipoDeConexao: 'monofasico',
        classeDeConsumo: 'residencial',
        modalidadeTarifaria: 'convencional',
        historicoDeConsumo: [800, 900, 650, 250, 900]
    }

    const expectedOutputData: FromSchema<typeof output> =
    {
        elegivel: false,
        razoesDeInelegibilidade: ['Dados Inválidos'],
    }
    
    const outputData = eligibilityHandler(inputData).then((response) => expect(response).toStrictEqual(expectedOutputData));    
})

test('Invalid CNPJ', () => {
    const inputData: FromSchema<typeof input> =
    {
        numeroDoDocumento:'33401689000109',
        tipoDeConexao: 'monofasico',
        classeDeConsumo: 'residencial',
        modalidadeTarifaria: 'convencional',
        historicoDeConsumo: [800, 900, 650, 250, 900]
    }

    const expectedOutputData: FromSchema<typeof output> =
    {
        elegivel: false,
        razoesDeInelegibilidade: ['Dados Inválidos'],
    }
    
    const outputData = eligibilityHandler(inputData).then((response) => expect(response).toStrictEqual(expectedOutputData));    
})

test('Invalid Tipo de Conexao', () => {
    const inputData: FromSchema<typeof input> =
    {
        numeroDoDocumento:'40534713890',
        tipoDeConexao: 'quadrifasico',
        classeDeConsumo: 'residencial',
        modalidadeTarifaria: 'convencional',
        historicoDeConsumo: [800, 900, 650, 250, 900]
    }

    const expectedOutputData: FromSchema<typeof output> =
    {
        elegivel: false,
        razoesDeInelegibilidade: ['Dados Inválidos'],
    }
    
    const outputData = eligibilityHandler(inputData).then((response) => expect(response).toStrictEqual(expectedOutputData));    
})

test('Invalid Classe de Consumo', () => {
    const inputData: FromSchema<typeof input> =
    {
        numeroDoDocumento:'40534713890',
        tipoDeConexao: 'monofasico',
        classeDeConsumo: 'marciano',
        modalidadeTarifaria: 'convencional',
        historicoDeConsumo: [800, 900, 650, 250, 900]
    }

    const expectedOutputData: FromSchema<typeof output> =
    {
        elegivel: false,
        razoesDeInelegibilidade: ['Dados Inválidos'],
    }
    
    const outputData = eligibilityHandler(inputData).then((response) => expect(response).toStrictEqual(expectedOutputData));    
})

test('Invalid Modalidade Tarifaria', () => {
    const inputData: FromSchema<typeof input> =
    {
        numeroDoDocumento:'40534713890',
        tipoDeConexao: 'monofasico',
        classeDeConsumo: 'residencial',
        modalidadeTarifaria: 'colorido',
        historicoDeConsumo: [800, 900, 650, 250, 900]
    }

    const expectedOutputData: FromSchema<typeof output> =
    {
        elegivel: false,
        razoesDeInelegibilidade: ['Dados Inválidos'],
    }
    
    const outputData = eligibilityHandler(inputData).then((response) => expect(response).toStrictEqual(expectedOutputData));    
})

test('All Invalid', () => {
    const inputData: FromSchema<typeof input> =
    {
        numeroDoDocumento:'40534713890',
        tipoDeConexao: 'trifasico',
        classeDeConsumo: 'poderPublico',
        modalidadeTarifaria: 'azul',
        historicoDeConsumo:  Array(5).fill((consumosElegiveis.get('trifasico') || 20) - 10)
    }

    const expectedOutputData: FromSchema<typeof output> =
    {
        elegivel: false,
        razoesDeInelegibilidade: ['Modalidade tarifária não aceita', 'Classe de consumo não aceita', 'Consumo muito baixo para tipo de conexão'],
    }
    
    const outputData = eligibilityHandler(inputData).then((response) => expect(response).toStrictEqual(expectedOutputData));    
})

test('Acepted Modalidade Tarifaria', () => {
    const inputData: FromSchema<typeof input> =
    {
        numeroDoDocumento:'40534713890',
        tipoDeConexao: 'trifasico',
        classeDeConsumo: 'poderPublico',
        modalidadeTarifaria: 'convencional',
        historicoDeConsumo:  Array(5).fill((consumosElegiveis.get('trifasico') || 20) - 10)
    }

    const expectedOutputData: FromSchema<typeof output> =
    {
        elegivel: false,
        razoesDeInelegibilidade: ['Classe de consumo não aceita', 'Consumo muito baixo para tipo de conexão'],
    }
    
    const outputData = eligibilityHandler(inputData).then((response) => expect(response).toStrictEqual(expectedOutputData));    
})

test('Acepted Classe de Consumo', () => {
    const inputData: FromSchema<typeof input> =
    {
        numeroDoDocumento:'40534713890',
        tipoDeConexao: 'trifasico',
        classeDeConsumo: 'residencial',
        modalidadeTarifaria: 'azul',
        historicoDeConsumo:  Array(5).fill((consumosElegiveis.get('trifasico') || 20) - 10)
    }

    const expectedOutputData: FromSchema<typeof output> =
    {
        elegivel: false,
        razoesDeInelegibilidade: ['Modalidade tarifária não aceita', 'Consumo muito baixo para tipo de conexão'],
    }
    
    const outputData = eligibilityHandler(inputData).then((response) => expect(response).toStrictEqual(expectedOutputData));    
})

test('Acepted Consumption', () => {
    const inputData: FromSchema<typeof input> =
    {
        numeroDoDocumento:'40534713890',
        tipoDeConexao: 'trifasico',
        classeDeConsumo: 'poderPublico',
        modalidadeTarifaria: 'azul',
        historicoDeConsumo:  Array(5).fill((consumosElegiveis.get('trifasico') || 20) + 10)
    }

    const expectedOutputData: FromSchema<typeof output> =
    {
        elegivel: false,
        razoesDeInelegibilidade: ['Modalidade tarifária não aceita', 'Classe de consumo não aceita'],
    }
    
    const outputData = eligibilityHandler(inputData).then((response) => expect(response).toStrictEqual(expectedOutputData));    
})

test('Only Low Consumption', () => {
    const inputData: FromSchema<typeof input> =
    {
        numeroDoDocumento:'40534713890',
        tipoDeConexao: 'trifasico',
        classeDeConsumo: 'residencial',
        modalidadeTarifaria: 'convencional',
        historicoDeConsumo:  Array(5).fill((consumosElegiveis.get('trifasico') || 20) - 10)
    }

    const expectedOutputData: FromSchema<typeof output> =
    {
        elegivel: false,
        razoesDeInelegibilidade: ['Consumo muito baixo para tipo de conexão'],
    }
    
    const outputData = eligibilityHandler(inputData).then((response) => expect(response).toStrictEqual(expectedOutputData));    
})

test('Only Wrong Classe de consumo', () => {
    const inputData: FromSchema<typeof input> =
    {
        numeroDoDocumento:'40534713890',
        tipoDeConexao: 'trifasico',
        classeDeConsumo: 'poderPublico',
        modalidadeTarifaria: 'convencional',
        historicoDeConsumo:  Array(5).fill((consumosElegiveis.get('trifasico') || 20) + 10)
    }

    const expectedOutputData: FromSchema<typeof output> =
    {
        elegivel: false,
        razoesDeInelegibilidade: ['Classe de consumo não aceita'],
    }
    
    const outputData = eligibilityHandler(inputData).then((response) => expect(response).toStrictEqual(expectedOutputData));    
})

test('Only Wrong Modalidade Tarifaria', () => {
    const inputData: FromSchema<typeof input> =
    {
        numeroDoDocumento:'40534713890',
        tipoDeConexao: 'trifasico',
        classeDeConsumo: 'residencial',
        modalidadeTarifaria: 'azul',
        historicoDeConsumo:  Array(5).fill((consumosElegiveis.get('trifasico') || 20) + 10)
    }

    const expectedOutputData: FromSchema<typeof output> =
    {
        elegivel: false,
        razoesDeInelegibilidade: ['Modalidade tarifária não aceita'],
    }
    
    const outputData = eligibilityHandler(inputData).then((response) => expect(response).toStrictEqual(expectedOutputData));    
})