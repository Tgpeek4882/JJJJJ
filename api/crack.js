// yo skid, before you say anything like "THEY HAVE LOGGER" this is to log crackers that have failed to crack script, not the actual users.
const fetch = require('node-fetch');

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send("Not Allowed");

    const { auth_key, message, username, executor } = req.body;

    if (auth_key !== process.env.AUTH_KEY) {
        return res.status(401).send("Unauthorized");
    }

    const decodedMessage = message.match(/.{1,2}/g)
        .map(byte => String.fromCharCode(parseInt(byte, 16)))
        .join('');

    const payload = {
        username: "Crack Attempt Detected",
        embeds: [{
            title: "Security Alert",
            description: decodedMessage,
            color: 0xff3e3e,
            footer: { text: `User: ${username} | Executor: ${executor}` },
            timestamp: new Date()
        }]
    };

    await fetch(process.env.LOG_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    return res.status(200).send("Logged");
}
