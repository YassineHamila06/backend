const http = require('http');
const port=3000;
const server = http.createServer((req, res) => {
    res.end('bonjour , mond\n');
});server.listen(port,function(){
console.log(`the server is running, please open at http://localhost:${port}`);
});