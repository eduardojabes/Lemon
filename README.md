# Desafio Lemon
Esse código faz parte do exercício proposto para o processo seletivo de backends da equipe Lemon. Este código tem como principal objetivo prover um pequeno serviço para verificar se um cliente é ou não elegível para serem aceitos no momento.

## Stack
- Node
- Jest
- Babel
- GitActions

## Endpoints
Este serviço apresenta uma única rota: http://127.0.0.1:8080/

Sua estrutura foi formatada de forma a poder atuar como uma função AWS Lambda, sendo necessário apenas configurar o GitAction e o Serverless para deploy automático da aplicaçao.

### POST Elegível

    Request body:

    {
        "numeroDoDocumento": "51427102000129",
        "tipoDeConexao": "bifasico",
        "classeDeConsumo": "comercial",
        "modalidadeTarifaria": "convencional",
        "historicoDeConsumo": [
            3878, // mes atual
            9760, // mes anterior
            5976, // 2 meses atras
            2797, // 3 meses atras
            2481, // 4 meses atras
            5731, // 5 meses atras
            7538, // 6 meses atras
            4392, // 7 meses atras
            7859, // 8 meses atras
            4160, // 9 meses atras
            6941, // 10 meses atras
            4597  // 11 meses atras
        ]
    }

    Response body:
    {
        "elegivel": true,
        "economiaAnualDeCO2": 5553.24,
    }

### POST Não elegível

     Request body:

    {
        "numeroDoDocumento": "51427102000129",
        "tipoDeConexao": "bifasico",
        "classeDeConsumo": "rural",
        "modalidadeTarifaria": "verde",
        "historicoDeConsumo": [
            3878,
            9760,
            5976,
            2797,
            2481, 
            5731,
            7538,
            4392,
            7859,
            4160,
        ]
    }

    Response body:

    {
        "elegivel": false,
            "razoesInelegibilidade": [
            "Classe de consumo não aceita",
            "Modalidade tarifária não aceita"
        ]
    } 

## Setup

Para rodar a aplicação é necessário que se tenha o Node e o NPM instalados em seu computador. Para instalação dos pacotes utilizados neste código basta rodar

```sh
$ npm install
```

Alguns scripts foram configurados para facilitar a utilização do serviço:

### Testes

```sh
$ npm test
```

### Rodar o servidor

```sh
$ npm start
```

É possível fazer requisição ao servidor através de softwares como Insonia e Postman. Se preferir, é possível testar a aplicação a partir da linha de comando exemplo abaixo:

```sh
$ curl -k -X POST 'http://127.0.0.1:8080/' -H 'Content-Type: application/json' -d' {"numeroDoDocumento": "51427102000129",
  "tipoDeConexao": "bifasico",
  "classeDeConsumo": "comercial",
  "modalidadeTarifaria": "convencional",
  "historicoDeConsumo": [3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160, 6941, 4597]}'
```
## FUNCIONALIDADES

Para melhor validação das requisições foram implementadas:
- Verificação do CPF com uso de algoritmo de verificação dos dígitos validadores
- Verificação do CNPJ com uso de algoritmo de verificação dos dígitos validadores
- Testes automatizados de todo enviroment
- Os inputs e outputs estão baseados em JSON Schemas e são automaticamente convertidos em objetos e tipos em tempo de compilação.
