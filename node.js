const https = require('https');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Load SSL certificate and key
const options = {
    key: fs.readFileSync('./ssl/server.key'),
    cert: fs.readFileSync('./ssl/server.cert')
};

// Create the HTTPS server
const server = https.createServer(options, (req, res) => {
    // Parse the request URL
    const parsedUrl = url.parse(req.url);

    // Set the file path based on the request
    let filePath = path.join(__dirname, parsedUrl.pathname === '/' ? 'index.html' : parsedUrl.pathname);

    // Read and serve the requested file
    fs.readFile(filePath, (err, data) => {
        if (err) {
            // Check if the error is due to file not found
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 Not Found</h1>');
            } else {
                res.writeHead(500);
                res.end('Error loading the requested file');
            }
        } else {
            res.writeHead(200);
            res.end(data);
        }
    });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`HTTPS Server is running on https://localhost:${PORT}`);
});
