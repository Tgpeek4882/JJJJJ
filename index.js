export default {
    async fetch(request, env, ctx) {
        const userAgent = request.headers.get("User-Agent") || ""
        if (!userAgent.includes("Roblox")) {
            return new Response("Forbidden", { status: 403 })
        }

        const authKey = request.headers.get("AUTH_KEY")
        if (!authKey || authKey !== env.AUTH_KEY) {
            return new Response("Unauthorized", { status: 401 })
        }

        const githubResponse = await fetch(
            "https://raw.githubusercontent.com/azurelw/source/main/Isotopia.lua",
            {
                headers: {
                    "Authorization": `token ${env.GH_TOKEN}`
                }
            }
        )

        const text = await githubResponse.text()

        return new Response(text, {
            headers: {
                "Content-Type": "text/plain"
            }
        })
    }
}
