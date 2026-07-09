import { getStatusPayload } from "./_lib/status.js";

export default async function handler(req, res) {
  const payload = await getStatusPayload();
  res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=120");
  res.status(200).json(payload);
}
