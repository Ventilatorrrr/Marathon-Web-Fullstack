const http = require('http');
const url = require('url');
const os = require('os');
const path = require('path');

function getLocalIP()
{
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces))
    {
        for (const iface of interfaces[name])
        {
            if (iface.family === 'IPv4' && !iface.internal)
            {
                return iface.address;
            }
        }
    }
    return '127.0.0.1';
}

const scriptName = path.basename(__filename);
const args = process.argv.slice(2).join(" ") || "(none)";

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    console.log("===== INFO =====");
    console.log("• File name of executed script:", scriptName);
    console.log("• Arguments passed to script:", args);
    console.log("• Server IP address:", getLocalIP());
    console.log("• Hostname invoking the script:", os.hostname());
    console.log("• Protocol name and version:", `HTTP/${req.httpVersion}`);
    console.log("• Query method:", req.method);
    console.log("• User-Agent info:", req.headers['user-agent']);
    console.log("• Client IP address:", req.socket.remoteAddress);
    console.log("• Parameters passed by URL:", parsedUrl.query);

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Check the console for output.\n');
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/`);
});
