const fetch = require('node-fetch');

export default async function handler(req, res) {
    const userAgent = req.headers['user-agent'] || "";
    if (!userAgent.includes("Roblox")) {
        return res.status(403).send("Access Denied.");
    }

    const GITHUB_TOKEN = process.env.GH_TOKEN;
    const fileName = req.query.file || "init.lua"; 
    
    const PRIVATE_URL = `https://raw.githubusercontent.com/Tgpeek4882/fffff/main/${fileName}`;

    const response = await fetch(PRIVATE_URL, {
        headers: {
            'Authorization': `token ${GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3.raw'
        }
    });

    if (!response.ok) return res.status(500).send("Source error or File not found.");

    const code = await response.text();
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send(code);
}
