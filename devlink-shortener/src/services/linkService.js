import Link from '../models/linkModel.js';
import generateShortId from '../utils/generateShortId.js';

export async function createShortLink(originalUrl) {
    const shortId=generateShortId();
    const link=await Link.create({
        shortId,
        originalUrl
    });
    return link;
}

export async function getOriginalUrl(shortId,analyticsData) {
    const link=await Link.findOne({shortId});
    if(!link) return null;

    link.clicks++; // Increment click count
    link.analytics.push(analyticsData); // Add analytics data  
    await link.save(); // Save the updated link

    return link.originalUrl;
}

export async function getAnalytics(shortId) {
    return Link.findOne({shortId},{_id:0, shortId:1, clicks:1, analytics:1}); // Return analytics data without the original URL
}