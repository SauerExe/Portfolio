// Portiert 1:1 aus dem alten vvashed.dev-Refresh-Token-Flow
// (app/lib/spotify.ts + app/api/spotify/now-playing/route.ts):
// Client-ID/-Secret tauschen den Refresh-Token gegen einen Access-Token,
// der Access-Token wird prozessintern zwischengespeichert.
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing";

let cachedToken = { access_token: "", expires_at: 0 };

async function getAccessToken() {
  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } = process.env;
  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
    return null;
  }
  if (cachedToken.access_token && Date.now() < cachedToken.expires_at) {
    return cachedToken.access_token;
  }

  const basic = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString("base64");
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: SPOTIFY_REFRESH_TOKEN,
    }),
  });
  if (!response.ok) return null;

  const data = await response.json();
  if (!data.access_token) return null;

  cachedToken = {
    access_token: data.access_token,
    expires_at: Date.now() + (data.expires_in ?? 3600) * 1000 - 30_000,
  };
  return cachedToken.access_token;
}

export async function getNowPlayingPayload() {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    return { isPlaying: false, configured: false };
  }

  const response = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (response.status === 204 || response.status >= 400) {
    return { isPlaying: false, configured: true };
  }

  const song = await response.json();
  if (!song?.item) {
    return { isPlaying: false, configured: true };
  }

  return {
    isPlaying: Boolean(song.is_playing),
    configured: true,
    title: song.item.name,
    artist: song.item.artists.map((artist) => artist.name).join(", "),
    album: song.item.album.name,
    albumImageUrl: song.item.album.images?.[0]?.url ?? null,
    songUrl: song.item.external_urls?.spotify ?? null,
    progressMs: song.progress_ms ?? 0,
    durationMs: song.item.duration_ms ?? 0,
  };
}
