import { FromSchema } from "json-schema-to-ts";
import { cnpj } from "../../models/tipos"

export function isValidCNPJ(inputCNPJ: FromSchema<typeof cnpj>) {
    
    const validationArray = [2,3,4,5,6,7,8,9,2,3,4,5,6];
    
    if (typeof inputCNPJ !== cnpj.type) return false
    
    inputCNPJ = inputCNPJ.replace(/[^\d]+/g, '') //Delte caracters that was not number
    
    if (inputCNPJ.length !== 14 || !!inputCNPJ.match(/(\d)\1{13}/)) return false //If there isnt 14 digits or all numbers are repeated
    
    let CNPJDigits = inputCNPJ.split('').map(el => +el) //Add the number itself for that position

    const rest = (count: number) => (CNPJDigits.slice(0, count-1)
        .reduce( (soma, el, index) => (soma + el * validationArray[count - index - 2]), 0 )*10) % 11 % 10 //Verify CNPJ
     
    return rest(13) === CNPJDigits[12] && rest(14) === CNPJDigits[13]
}