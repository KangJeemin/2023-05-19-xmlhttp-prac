import http from 'http'
import fs from 'fs'

let countFromServer = 0
const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    fs.readFile('xml.html',(err,data)=>{
      if(err){
        console.log(err)
      }else{
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    })
   
    
  }
  if (req.method === 'POST' && req.url === '/b') {
    let data = '';
    
    req.on('data', chunk => {
      data += chunk;
    });
    req.on('end', () => {
      // 수신한 데이터 처리
      console.log('Received data(server):', data);

      // 클라이언트로 응답 전송
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(new Date().toString());

    });
    
  }
  //  else {
  //   res.statusCode = 404;
  //   res.end();
    
  // }
});

server.listen(3000, () => {
  console.log('서버가동 http://localhost:3000');
});