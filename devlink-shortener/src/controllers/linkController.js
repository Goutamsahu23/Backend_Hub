import { createShortLink, getOriginalUrl, getAnalytics } from "../services/linkService.js";
import * as UAParser from "ua-parser-js";

export async function shortenUrl(req, res) {
    const { originalUrl } = req.body;
    if (!originalUrl) {
        return res.status(400).json({ error: "Original URL is required" });
    }
    const link = await createShortLink(originalUrl);
    res.json({ shortUrl: `${req.protocol}://${req.get("host")}/${link.shortId}` }); // Return the shortened URL 

}

export async function redirect(req, res) {
    const parser = new UAParser.UAParser(req.headers['user-agent']);
    const analyticsData = {
        timestamp: new Date(),
        userAgent: parser.getUA(),
        ipAddress: req.ip,
        referrer: req.get('Referrer') || 'Direct',
    };

    const url = await getOriginalUrl(req.params.shortId, analyticsData);
    if (!url) return res.status(404).send("Not found");

    res.redirect(url);
}


export async function analytics(req, res) {
  const data = await getAnalytics(req.params.shortId);
  if (!data) return res.status(404).send("Not found");

  res.json(data);
}
