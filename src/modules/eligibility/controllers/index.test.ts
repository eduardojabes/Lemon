import {expect, test} from '@jest/globals';

import { tiposDeConexao, classesDeConsumo, modalidadesTarifarias, consumosElegiveis} from "../models/tipos"

import { isValidCPF } from './services/IsValidCPF';
import { isValidCNPJ }from "./services/IsValidCNPJ";
import { isValidTipoDeConexao } from "./services/isValidTipoDeConexao";
import { isValidClasseDeConsumo } from "./services/isValidClasseDeConsumo";
import { isValidModalidadeTarifaria } from "./services/isValidModalidadeTarifaria"
import { getMean } from "./services/getMean"

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

test('Tipos de Conexões Válidos', () => {
    tiposDeConexao.map((Conexao: string) => expect(isValidTipoDeConexao(Conexao)).toBe(true));
})

test('Tipos de Conexões Inválido', () => {
    const Conexao = 'quadrifásico';
    expect(isValidTipoDeConexao(Conexao)).toBe(false)

})

test('Tipos de Classes De Consumo Válidas', () => {
    classesDeConsumo.map((classesDeConsumo: string) => expect(isValidClasseDeConsumo(classesDeConsumo)).toBe(true));
})

test('Tipos de Classes De Consumo Inválidas', () => {
    const classesDeConsumo = 'marciana';
    expect(isValidClasseDeConsumo(classesDeConsumo)).toBe(false)
})

test('Tipos de Modalidade Tarifária Válidos', () => {
    modalidadesTarifarias.map((modalidadeTarifaria: string) => expect(isValidModalidadeTarifaria(modalidadeTarifaria)).toBe(true));
})

test('Tipos de Modalidade Tarifária Inválida', () => {
    const modalidadeTarifaria = 'colorida';
    expect(isValidModalidadeTarifaria(modalidadeTarifaria)).toBe(false)
})

test('GetMean', () => {
    const consume = [100, 200, 150, 250, 300];
    expect(getMean(consume)).toBe(200);
})

test('GetMean - More than 12 months', () => {
    const consume = [100, 200, 150, 250, 300, 100, 300, 100, 300, 100, 300, 200, 100];
    expect(getMean(consume)).toBe(200);
})

test('GetMean - More than 12 months', () => {
    const consume = Array(5).fill((consumosElegiveis.get('trifasico') || 20) - 10)
    expect(getMean(consume)).toBe(740);
})

test('GetMean - Error', () => {
    const consume = [100, 200];
    expect(getMean(consume)).toBe(0);
})