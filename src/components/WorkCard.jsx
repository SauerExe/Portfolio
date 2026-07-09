export default function WorkCard({ project }) {
  return (
    <article id={`projekt-${project.slug}`} className="work-card">
      {project.screenshot && (
        <div className="work-card-thumb">
          <img src={project.screenshot} alt="" loading="lazy" />
        </div>
      )}
      <div className="work-card-body">
        <div className="console-chips">
          <span className="chip chip--accent">{project.status}</span>
          <span className="chip">{project.type}</span>
        </div>
        <h3 className="work-card-title">{project.title}</h3>
        {project.context && <p className="work-card-context mono dim">{project.context}</p>}
        <p className="work-card-desc">{project.shortDescription}</p>
        {project.role && <p className="work-card-role mono">Rolle: {project.role}</p>}
        {project.technologies.length > 0 && (
          <div className="console-chips work-card-stack">
            {project.technologies.map((tech) => (
              <span key={tech} className="chip">
                {tech}
              </span>
            ))}
          </div>
        )}
        <div className="work-links">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="work-link mono">
              Live ansehen ↗
            </a>
          )}
          {project.repoUrl && (
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="work-link mono">
              Code auf GitHub ↗
            </a>
          )}
          {project.extraLink && (
            <a href={project.extraLink.href} target="_blank" rel="noopener noreferrer" className="work-link mono">
              {project.extraLink.label} ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
