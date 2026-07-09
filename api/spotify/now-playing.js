import { getNowPlayingPayload } from "../_lib/spotify.js";

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "public, s-maxage=30, stale-while-revalidate=60");
  try {
    const payload = await getNowPlayingPayload();
    res.status(200).json(payload);
  } catch {
    res.status(200).json({ isPlaying: false, configured: false });
  }
}
