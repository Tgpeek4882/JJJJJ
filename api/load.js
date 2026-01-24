const fetch = require('node-fetch');

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).send("print('Method Not Allowed')");
    }

    const { auth_key, file } = req.body;
    if (auth_key !== "MainDomainCall") {
        return res.status(401).send("print('Invalid Authentication Key')");
    }

    const GITHUB_TOKEN = process.env.GH_TOKEN;
    const fileName = file || "init.lua"; 
    
    const response = await fetch(`https://raw.githubusercontent.com/Tgpeek4882/fffff/main/${fileName}`, {
        headers: { 'Authorization': `token ${GITHUB_TOKEN}` }
    });

    if (!response.ok) return res.status(500).send("print('Source Error')");

    const code = await response.text();
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send(code);
}
