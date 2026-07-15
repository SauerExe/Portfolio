import Home from "./pages/Home.jsx";
import Impressum from "./pages/Impressum.jsx";
import Datenschutz from "./pages/Datenschutz.jsx";
import NotesIndex from "./pages/NotesIndex.jsx";
import NotePost from "./pages/NotePost.jsx";
import NotFound from "./pages/NotFound.jsx";

// Mini-Router ohne Dependency: Links auf Unterseiten sind normale
// <a href>-Navigationen (volle Seitenladung, kein History-API nötig).
// Der Server liefert für alle Nicht-API-Pfade index.html aus
// (server.js-Fallback bzw. vercel.json-Rewrite), hier wird dann anhand
// des Pfads entschieden, was gerendert wird.
export default function App() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";

  if (path === "/") return <Home />;
  if (path === "/impressum") return <Impressum />;
  if (path === "/datenschutz") return <Datenschutz />;
  if (path === "/notes") return <NotesIndex />;

  const note = path.match(/^\/notes\/([\w-]+)$/);
  if (note) return <NotePost slug={note[1]} />;

  return <NotFound />;
}
