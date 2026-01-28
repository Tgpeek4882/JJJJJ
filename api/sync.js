// yo skid, before you say anything like "THEY HAVE LOGGER" this is to log crackers that have failed to crack script, not the actual users.
const fetch = require('node-fetch');

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(200).send("OK");

    const { v, k, u, e } = req.body;

    if (k !== process.env.AUTH_KEY) {
        return res.status(401).send("Auth Failed");
    }

    const decodeHex = (hex) => {
        return hex.match(/.{1,2}/g).map(byte => String.fromCharCode(parseInt(byte, 16))).join('');
    };

    const decodedMessage = decodeHex(v);
    const decodedUser = decodeHex(u);
    const decodedExec = decodeHex(e);

    const payload = {
        username: "Crack Attempt Detected",
        embeds: [{
            title: "Security Alert",
            description: decodedMessage,
            color: 0xff3e3e,
            footer: { text: `User: ${decodedUser} | Executor: ${decodedExec}` },
            timestamp: new Date()
        }]
    };

    await fetch(process.env.LOG_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    return res.status(200).send("Sync Complete");
}
