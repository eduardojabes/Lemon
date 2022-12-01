import * as http from 'node:http';
import { eligibilityHandler}  from './functions/eligibility/eligibility'


function Server(){
    console.log('server starting ...');

    http.createServer((request, response) => {

        const { headers, method, url } = request;
        console.log('0')
        let body : string = '';

        request.on('error', (err) => {
            console.error(err);
        }).on('data', (chunk) => {
            body += chunk;
        }).on('end', () => {
            console.log('0')
            if (!body){
                response.writeHead(400, {'Content-Type': 'application/json'})
                response.end();
                return
            }
            try{
                response.on('error', (err) => {
                    console.error(err);
                });
                
                const inputData = JSON.parse(body as string)
                console.log('3')
                response.statusCode = 200;
                response.setHeader('Content-Type', 'application/json');
                
                eligibilityHandler(inputData).then(responseJSON => {
                const responseBody = { headers, method, url, body: responseJSON };
            
                response.write(JSON.stringify(responseBody));
                response.end();
                });
            } catch(error){ console.log(`Error handler:`, error as Error);}
        })
    }).listen(8080);
}


Server()