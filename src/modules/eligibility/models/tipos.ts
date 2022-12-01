export const cpf = {
    type: 'string',
    pattern: '^\\d{11}$',
    example: '21554495008',
} as const

export const cnpj = {
    type: 'string',
    pattern: '^\\d{14}$',
    example: '33400689000109',
} as const
  
export const tiposDeConexao = ['monofasico', 'bifasico', 'trifasico'] 
  
export const classesDeConsumo = [
    'residencial',
    'industrial',
    'comercial',
    'rural',
    'poderPublico',
  ]
  
export const modalidadesTarifarias = ['azul', 'branca', 'verde', 'convencional'] 

export const classesDeConsumoElegiveis = [
    'residencial',
    'industrial',
    'comercial',
  ] 
export const modalidadesTarifariasElegiveis = ['branca','convencional']

export const consumosElegiveis= new Map<string, number>([
    ['monofasico', 400],
    ['bifasico', 500],
    ['trifasico', 750],
]);