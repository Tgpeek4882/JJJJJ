// hi from isotopia
// test111
export default {
    async fetch(request, env, ctx) {
        const userAgent = request.headers.get("User-Agent") || ""
        if (!userAgent.includes("Roblox")) {
            return new Response("Forbidden", { status: 403 })
        }

        const cache = caches.default
        let response = await cache.match(request)
        if (response) {
            return response
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

        response = new Response(text, {
            headers: {
                "Cache-Control": "public, max-age=3600",
                "Content-Type": "text/plain"
            }
        })

        ctx.waitUntil(cache.put(request, response.clone()))
        return response
    }
}
