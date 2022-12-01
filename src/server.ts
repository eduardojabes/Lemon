import * as http from 'node:http';
import {input, output} from "modules/eligibility/models/schemas"
import { container } from 'tsyringe';
import { FromSchema } from "json-schema-to-ts";
import eligibilityHandler from './functions/eligibility/eligibility'


interface IBody {
    [k: string]: string;
}

const getBody = (request: http.IncomingMessage): string | null => {
   try{
    let buffer : Uint8Array[]= [];
    let body : string;
    
    request.on('error', (err) => {
      console.error(err);
    }).on('data', (chunk) => {
      buffer.push(chunk);
    }).on('end', () => {
      return body = Buffer.concat(buffer).toString();
      return (JSON.parse(body) as IBody) || null;
    })

    return null
    } catch {
        return null;
    }
  };

  http.createServer((request, response) => {
    
    const { headers, method, url } = request;
    const requestbody = getBody(request);

    response.on('error', (err) => {
        console.error(err);
    });
    
    if (!requestbody){
        response.writeHead(400, {'Content-Type': 'application/json'})
    }
  
    const inputData: FromSchema<typeof input> = JSON.parse(requestbody as string)
      response.statusCode = 200;
      response.setHeader('Content-Type', 'application/json');
   
      eligibilityHandler(inputData).then(responseJSON => {
        const responseBody = { headers, method, url, body: responseJSON };
  
        response.write(JSON.stringify(responseBody));
        response.end();
      });
      
  }).listen(8080);
  