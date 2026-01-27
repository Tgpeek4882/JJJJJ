// yo skid, if you're thai or vietnam your mum is a fucking whore bitch.
const fetch = require('node-fetch');

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        const loaderCode = `getgenv().SCRIPT_KEY = "YOUR_KEY"\nloadstring(game:HttpGet('https://raw.githubusercontent.com/azurelw/azurehub/refs/heads/main/loader.lua'))()`;
        
        res.setHeader('Content-Type', 'text/html');
        return res.status(405).send(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Azure Hub | Access Denied</title>
                <style>
                    body { background: #050505; color: #fff; font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; overflow: hidden; }
                    .card { background: #111; padding: 30px; border-radius: 8px; border: 1px solid #222; width: 450px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
                    h1 { color: #ff3e3e; margin: 0 0 10px; font-size: 24px; }
                    p { color: #888; font-size: 14px; margin-bottom: 20px; }
                    .code-box { position: relative; background: #000; border: 1px solid #333; padding: 15px; border-radius: 4px; text-align: left; }
                    .scroll-container { max-height: 120px; overflow-y: auto; padding-right: 25px; }
                    .scroll-container::-webkit-scrollbar { width: 4px; }
                    .scroll-container::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
                    code { font-family: 'Consolas', 'Monaco', monospace; color: #00ff88; font-size: 13px; white-space: pre-wrap; word-break: break-all; display: block; line-height: 1.5; }
                    .copy { position: absolute; top: 12px; right: 12px; cursor: pointer; opacity: 0.6; transition: 0.2s; background: #000; }
                    .copy:hover { opacity: 1; }
                </style>
            </head>
            <body>
                <div class="card">
                    <h1>Access Denied</h1>
                    <p>Execute the script below.</p>
                    <div class="code-box">
                        <div class="scroll-container">
                            <code id="c">getgenv().SCRIPT_KEY = "YOUR_KEY"<br>loadstring(game:HttpGet('https://raw.githubusercontent.com/azurelw/azurehub/refs/heads/main/loader.lua'))()</code>
                        </div>
                        <div class="copy" onclick="copy()">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                        </div>
                    </div>
                </div>
                <script>
                    function copy() {
                        const text = document.getElementById('c').innerText;
                        navigator.clipboard.writeText(text);
                        let b = document.querySelector('.card');
                        b.style.borderColor = '#00ff88';
                        setTimeout(() => b.style.borderColor = '#222', 1000);
                    }
                </script>
            </body>
            </html>
        `);
    }

    const SECRET_KEY = process.env.AUTH_KEY; 
    const GITHUB_TOKEN = process.env.GH_TOKEN;
    const { auth_key, file } = req.body;

    if (auth_key !== SECRET_KEY) {
        return res.status(401).send("print('Unauthorized Access Attempt')");
    }

    const fileName = file || "us.lua";
    const response = await fetch(`https://raw.githubusercontent.com/Tgpeek4882/fffff/main/${fileName}`, {
        headers: { 'Authorization': `token ${GITHUB_TOKEN}` }
    });

    if (!response.ok) return res.status(500).send("print('Resource not found')");

    const code = await response.text();
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send(code);
}
