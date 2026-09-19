import SubPage from "./SubPage.jsx";
import NotFound from "./NotFound.jsx";
import { getPost } from "../notes/posts.js";

export default function NotePost({ slug }) {
  const post = getPost(slug);
  if (!post) return <NotFound />;

  const { Component } = post;

  return (
    <SubPage title={post.title} description={post.teaser} article>
      <section className="section notes" aria-label={post.title}>
        <div className="section-inner">
          <article className="note-article">
            <span className="kicker">Notiz · {post.date}</span>
            <h1 className="section-title">
              {post.title}
              <span className="accent">.</span>
            </h1>
            <div className="note-body">
              <Component />
            </div>
            <a className="note-back mono" href="/notes">
              ← Alle Notizen
            </a>
          </article>
        </div>
      </section>
    </SubPage>
  );
}
