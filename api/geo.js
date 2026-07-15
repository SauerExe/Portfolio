import { getGeoPayload } from "./_lib/geo.js";

export default async function handler(req, res) {
  // Antwort ist besucherspezifisch (Ortsangabe) — niemals im CDN cachen.
  res.setHeader("Cache-Control", "no-store");
  try {
    const forwarded = req.headers["x-forwarded-for"];
    const ip =
      typeof forwarded === "string" && forwarded.length > 0
        ? forwarded.split(",")[0].trim()
        : req.socket?.remoteAddress;
    res.status(200).json(await getGeoPayload(ip));
  } catch {
    res.status(200).json({ success: false });
  }
}
