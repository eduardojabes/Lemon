import { tiposDeConexao, classesDeConsumo, modalidadesTarifarias, cpf, cnpj } from './tipos'

export const enumOf = (values: any) => ({
  type: ['string','number','boolean'],
  enum: values,
  example: values[0],
} as const) 

export const input = {
  type: 'object',
  additionalProperties: false,
  required: [
    'numeroDoDocumento',
    'tipoDeConexao',
    'classeDeConsumo',
    'modalidadeTarifaria',
    'historicoDeConsumo',
  ],
  properties: {
    numeroDoDocumento: { oneOf: [cpf, cnpj] },
    tipoDeConexao: enumOf(tiposDeConexao),
    classeDeConsumo: enumOf(classesDeConsumo),
    modalidadeTarifaria: enumOf(modalidadesTarifarias),
    historicoDeConsumo: { // em kWh
      type: 'array',
      minItems: 3,
      maxItems: 12,
      items: {
        type: 'integer',
        minimum: 0,
        maximum: 9999,
      },
    },
  },
} as const


export const razoesDeInelegibilidade = {
  type: 'array',
  uniqueItems: true,
  items: {
    type: 'string',
    enum: [
      'Classe de consumo não aceita',
      'Modalidade tarifária não aceita',
      'Consumo muito baixo para tipo de conexão',
      'Dados Inválidos',
      'Server Error'
    ],
  },
} as const

export const output = {
  oneOf: [
    {
      type: 'object',
      additionalProperties: false,
      required: ['elegivel', 'economiaAnualDeCO2'],
      properties: {
        elegivel: enumOf([true]), // always true
        economiaAnualDeCO2: { type: 'number', minimum: 0 },
      },
    },
    {
      type: 'object',
      additionalProperties: false,
      required: ['elegivel', 'razoesDeInelegibilidade'],
      properties: {
        elegivel: enumOf([false]), // always false
        razoesDeInelegibilidade: razoesDeInelegibilidade,
      },
    },
  ],
} as const