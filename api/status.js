import { getStatusPayload } from "./_lib/status.js";

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=120");
  try {
    res.status(200).json(await getStatusPayload());
  } catch {
    res.status(200).json({ status: "unknown" });
  }
}
