const asyncHandler = (promisify) => async(req, res) => {
    const httpRequest = {
        // body: req.body,
        // query: req.query,
        params: req.params,
        headers: {
            "Content-Type": req.get("Content-Type"),
            Referer: req.get("referer"),
            "User-Agent": req.get("User-Agent"),
            Cookie: req.get("Authorization"),
            "Access-Control-Allow-Origin": "*",
        }
    }
    return promisify(httpRequest)
        .then(httpResponse => {
            if (httpResponse.headers) {
                res.set("Access-Control-Allow-Origin", "*");
                res.set(httpResponse.headers);
            }
            res.type("json");
            res.status(httpResponse.statusCode)
                .send(httpResponse.body)
        }).catch((e) => {
            res.sendStatus(500)
        })
}

module.exports = asyncHandler
