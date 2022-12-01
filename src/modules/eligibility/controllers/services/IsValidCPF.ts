import { FromSchema } from "json-schema-to-ts";
import { cpf } from "../../models/tipos"

export function isValidCPF(inputCPF: FromSchema<typeof cpf>) {
    
    if (typeof inputCPF !== cpf.type) return false
    
    inputCPF = inputCPF.replace(/[^\d]+/g, '') //Delte caracters that was not number
    
    if (inputCPF.length !== 11 || !!inputCPF.match(/(\d)\1{10}/)) return false //If there isnt 11 digits or all numbers are repeated
    
    let CPFNumber = inputCPF.split('').map(el => +el) //Add the number itself for that position
    
    const rest = (count: number) => (CPFNumber.slice(0, count-1)
        .reduce( (soma, el, index) => (soma + el * (count-index)), 0 )*10) % 11 % 10 //Verify CPF
    
    return rest(10) === CPFNumber[9] && rest(11) === CPFNumber[10]
}

