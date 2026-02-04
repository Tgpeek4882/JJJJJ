// yo skid, if you're thai or vietnam your mum is a fucking whore bitch.
// if you can crack this il give you 20$. send me source of any my scripts and ping owner in discord.gg/azurehub
export default {
    async fetch(request, env) {
        const url = new URL(request.url);

        if (request.method !== 'POST') {
            const html = `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Azure Hub | Access Denied</title>
                    <style>
                        body { background: #050505; color: #fff; font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
                        .card { background: #111; padding: 30px; border-radius: 8px; border: 1px solid #222; width: 450px; text-align: center; }
                        h1 { color: #ff3e3e; margin: 0; font-size: 24px; }
                        code { color: #00ff88; font-family: monospace; display: block; margin-top: 20px; text-align: left; background: #000; padding: 10px; font-size: 13px; }
                    </style>
                </head>
                <body>
                    <div class="card">
                        <h1>Access Denied</h1>
                        <p>Execute the script below.</p>
                        <code>getgenv().SCRIPT_KEY = "YOUR_KEY"<br>loadstring(game:HttpGet('https://raw.githubusercontent.com/azurelw/azurehub/refs/heads/main/loader.lua'))()</code>
                    </div>
                </body>
                </html>
            `;
            return new Response(html, { headers: { 'Content-Type': 'text/html' } });
        }

        try {
            const { auth_key, file } = await request.json();

            if (auth_key !== env.AUTH_KEY) {
                return new Response("print('Unauthorized')", { status: 401 });
            }

            const fileName = file || "us.lua";
            const githubRes = await fetch(`https://raw.githubusercontent.com/Tgpeek4882/fffff/main/${fileName}`, {
                headers: { 'Authorization': `token ${env.GH_TOKEN}` }
            });

            if (!githubRes.ok) return new Response("print('File Not Found')", { status: 404 });

            const code = await githubRes.text();
            return new Response(code, { headers: { 'Content-Type': 'text/plain' } });

        } catch (e) {
            return new Response("Error", { status: 400 });
        }
    }
};
