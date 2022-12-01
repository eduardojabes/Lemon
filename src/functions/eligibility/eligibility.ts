import { startup } from '@startup';
import { container } from 'tsyringe';
import { FromSchema } from "json-schema-to-ts";
import ILogger from '@shared/infra/logger/interfaces/logger';

import EligibilityController from "../../modules/eligibility/controllers"
import {input, output,razoesDeInelegibilidade} from "../../modules/eligibility/models/schemas"
import { classesDeConsumoElegiveis, modalidadesTarifariasElegiveis, consumosElegiveis, tiposDeConexao} from "../../modules/eligibility/models/tipos"


async function handler(inputData: FromSchema<typeof input>): Promise<FromSchema<typeof output>>{
  const logger = container.resolve<ILogger>('logger');
  try{
      await startup();
        
      var outputData: FromSchema<typeof output>
      var reasons: FromSchema<typeof razoesDeInelegibilidade> = [];
        
      //Error Treatment for Input Data (NO PROCESSING IF ERRORd)
      if (!EligibilityController.isValidCNPJ(inputData.numeroDoDocumento) && !EligibilityController.isValidCPF(inputData.numeroDoDocumento)){
        logger.warn(`Document: ${inputData.numeroDoDocumento} is invalid`);
        outputData = { elegivel: false, razoesDeInelegibilidade: ['Dados Inválidos']};
        return outputData
      }

      if (!EligibilityController.isValidModalidadeTarifaria(inputData.modalidadeTarifaria as string)){
        logger.warn(`Modalidade Tarifaria: ${inputData.modalidadeTarifaria} is invalid`);
        outputData = { elegivel: false, razoesDeInelegibilidade: ['Dados Inválidos']};
        return outputData
      }
      
      if (!EligibilityController.isValidClasseDeConsumo(inputData.classeDeConsumo as string)){
        logger.warn(`Classe de Consumo: ${inputData.modalidadeTarifaria} is invalid`);
        outputData = { elegivel: false, razoesDeInelegibilidade: ['Dados Inválidos']};
        return outputData
      }

      if (!EligibilityController.isValidTipoDeConexao(inputData.tipoDeConexao as string)){
        logger.warn(`Tipo de Conexão: ${inputData.modalidadeTarifaria} is invalid`);
        outputData = { elegivel: false, razoesDeInelegibilidade: ['Dados Inválidos']};
        return outputData
      }

      //Verifying Eligibility

      if(!modalidadesTarifariasElegiveis.includes(inputData.modalidadeTarifaria as string)){
        logger.warn(`Modalidade Tarifaria não aceita: ${inputData.modalidadeTarifaria} is invalid`);
        reasons.push('Modalidade tarifária não aceita')
      }


      if(!classesDeConsumoElegiveis.includes(inputData.classeDeConsumo  as string)){
        logger.warn(`Classe de Consumo não aceita: ${inputData.classeDeConsumo } is invalid`);
        //outputData = { elegivel: false, razoesDeInelegibilidade: [...]};
        //reasons.push('Classe de consumo não aceita')
      }
      const meanConsumption = EligibilityController.getMean(inputData.historicoDeConsumo);
      const minimumConsumption = consumosElegiveis.get(inputData.tipoDeConexao as string) || input.properties.historicoDeConsumo.items.maximum
      
      if(meanConsumption < minimumConsumption ){
        logger.warn(`Consumo muito baixo para tipo de conexão: ${inputData.tipoDeConexao}: ${meanConsumption}`);
        reasons.push('Consumo muito baixo para tipo de conexão')
      }

      if (reasons.length > 0){  
          outputData = {elegivel: false, razoesDeInelegibilidade: reasons};
          return outputData;
      }

      outputData = {elegivel: true, economiaAnualDeCO2: meanConsumption * 0.084}
      return outputData

  }catch (error) {
    logger.fatal(`Error handler:`, error as Error);
    outputData = { elegivel: false, razoesDeInelegibilidade: ['Server Error']};
    return outputData
  }
}