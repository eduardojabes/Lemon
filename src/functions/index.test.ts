import {expect, test} from '@jest/globals'
import { FromSchema } from "json-schema-to-ts";

import {handler} from './eligibility/eligibility'
import {input, output,razoesDeInelegibilidade} from "../modules/eligibility/models/schemas"

test('Valid Handler', () => {
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
    
    const outputData = handler(inputData).then((response) => expect(response).toStrictEqual(expectedOutputData));    
})