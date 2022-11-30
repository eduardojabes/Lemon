import {expect, test} from '@jest/globals';

import { isValidCPF } from './services/IsValidCPF';
import { isValidCNPJ }from "./services/IsValidCNPJ";

test('CPF Válido', () => {
    const CPF = '40534713890';
    expect(isValidCPF(CPF)).toBe(true);
})

test('CPF Inválido', () => {
    const CPF = '12345678912';
    expect(isValidCPF(CPF)).toBe(false);
})

test('CPF Inválido - Números Repetidos', () => {
    const CPF = '11111111111';
    expect(isValidCPF(CPF)).toBe(false);
})

test('CPF Inválido - Tamanho incorreto', () => {
    const CPF = '11111111111';
    expect(isValidCPF(CPF)).toBe(false);
})

test('CNPJ Válido', () => {
    const CNPJ = '33400689000109'; //CNPJ Lemon
    expect(isValidCNPJ(CNPJ)).toBe(true);
})

test('CNPJ Inválido', () => {
    const CNPJ = '33500689000109'; 
    expect(isValidCNPJ(CNPJ)).toBe(false);
})

test('CNPJ Inválido - Números Repetidos', () => {
    const CNPJ = '11111111111111'; 
    expect(isValidCNPJ(CNPJ)).toBe(false);
})

test('CNPJ Inválido - Tamanho incorreto', () => {
    const CNPJ = '3350068900109'; 
    expect(isValidCNPJ(CNPJ)).toBe(false);
})