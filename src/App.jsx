import Home from "./v3/HomeV3.jsx";
import Impressum from "./pages/Impressum.jsx";
import Datenschutz from "./pages/Datenschutz.jsx";
import NotesIndex from "./pages/NotesIndex.jsx";
import NotePost from "./pages/NotePost.jsx";
import NotFound from "./pages/NotFound.jsx";
import { currentPath } from "./lib/path.js";

// Mini-Router ohne Dependency: Links auf Unterseiten sind normale
// <a href>-Navigationen (volle Seitenladung, kein History-API nötig).
// Der Build erzeugt je Route HTML mit eigenen Metadaten. Hier wird
// anhand des Pfads entschieden, welcher Seiteninhalt gerendert wird.
export default function App() {
  const path = currentPath();

  if (path === "/") return <Home />;
  if (path === "/impressum") return <Impressum />;
  if (path === "/datenschutz") return <Datenschutz />;
  if (path === "/notes") return <NotesIndex />;

  const note = path.match(/^\/notes\/([\w-]+)$/);
  if (note) return <NotePost slug={note[1]} />;

  return <NotFound />;
}
