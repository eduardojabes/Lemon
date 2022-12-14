import { startup } from '../../bootstrap/startup';
import { container } from 'tsyringe';
import { FromSchema } from "json-schema-to-ts";
import ILogger from '../../shared/infra/logger/interfaces/logger';

import EligibilityController from "../../modules/eligibility/controllers"
import {input, output,razoesDeInelegibilidade} from "../../modules/eligibility/models/schemas"
import { classesDeConsumoElegiveis, modalidadesTarifariasElegiveis, consumosElegiveis, tiposDeConexao} from "../../modules/eligibility/models/tipos"


export async function eligibilityHandler(inputData: FromSchema<typeof input>): Promise<FromSchema<typeof output>>{
  const logger = container.resolve<ILogger>('logger');
  try{
      await startup();
        
      var outputData: FromSchema<typeof output>
      var reasons: FromSchema<typeof razoesDeInelegibilidade> = [];
        
      //Error Treatment for Input Data (NO PROCESSING IF ERROR)
      if (!EligibilityController.isValidCNPJ(inputData.numeroDoDocumento) && !EligibilityController.isValidCPF(inputData.numeroDoDocumento)){
        logger.warn(`Document: ${inputData.numeroDoDocumento} is invalid`, inputData.numeroDoDocumento);
        outputData = { elegivel: false, razoesDeInelegibilidade: ['Dados Inválidos']};
        return outputData
      }

      if (!EligibilityController.isValidModalidadeTarifaria(inputData.modalidadeTarifaria as string)){
        logger.warn(`Modalidade Tarifaria: ${inputData.modalidadeTarifaria} is invalid`, inputData.numeroDoDocumento);
        outputData = { elegivel: false, razoesDeInelegibilidade: ['Dados Inválidos']};
        return outputData
      }
      
      if (!EligibilityController.isValidClasseDeConsumo(inputData.classeDeConsumo as string)){
        logger.warn(`Classe de Consumo: ${inputData.modalidadeTarifaria} is invalid`, inputData.numeroDoDocumento);
        outputData = { elegivel: false, razoesDeInelegibilidade: ['Dados Inválidos']};
        return outputData
      }

      if (!EligibilityController.isValidTipoDeConexao(inputData.tipoDeConexao as string)){
        logger.warn(`Tipo de Conexão: ${inputData.modalidadeTarifaria} is invalid`, inputData.numeroDoDocumento);
        outputData = { elegivel: false, razoesDeInelegibilidade: ['Dados Inválidos']};
        return outputData
      }

      //Verifying Eligibility

      if(!modalidadesTarifariasElegiveis.includes(inputData.modalidadeTarifaria as string)){
        logger.warn(`Modalidade Tarifaria não aceita: ${inputData.modalidadeTarifaria} is invalid`, inputData.numeroDoDocumento);
        reasons.push('Modalidade tarifária não aceita')
      }


      if(!classesDeConsumoElegiveis.includes(inputData.classeDeConsumo  as string)){
        logger.warn(`Classe de Consumo não aceita: ${inputData.classeDeConsumo } is invalid`, inputData.numeroDoDocumento);
        reasons.push('Classe de consumo não aceita')
      }
      const meanConsumption = EligibilityController.getMean(inputData.historicoDeConsumo);
      const minimumConsumption = consumosElegiveis.get(inputData.tipoDeConexao as string) || input.properties.historicoDeConsumo.items.maximum
     
      logger.debug(`Mean: ${meanConsumption}| Minimun: ${minimumConsumption}`, inputData.numeroDoDocumento);
     
      if(meanConsumption < minimumConsumption ){
        logger.warn(`Consumo muito baixo para tipo de conexão: ${inputData.tipoDeConexao}: ${meanConsumption}`, inputData.numeroDoDocumento);
        reasons.push('Consumo muito baixo para tipo de conexão')
      }

      if (reasons.length > 0){  
          outputData = {elegivel: false, razoesDeInelegibilidade: reasons};
          return outputData;
      }

      outputData = {elegivel: true, economiaAnualDeCO2: Math.round(meanConsumption * 84)/1000}
      return outputData

  }catch (error) {
    logger.fatal(`Error handler:`, error as Error);
    outputData = { elegivel: false, razoesDeInelegibilidade: ['Server Error']};
    return outputData
  }
}