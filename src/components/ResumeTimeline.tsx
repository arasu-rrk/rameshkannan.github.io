import resume from '@/data/resume.json';
import ResumeContact from '@/components/ResumeContact';
import styles from '@/app/resume/resume-timeline.module.scss';

/** Renders the timeline resume design. */
export default function ResumeTimeline() {
  return (
    <article className={styles.resume}>
      <header className={styles.header}>
        <h1>{resume.name}</h1>
        <p className={styles.title}>{resume.title}</p>
        <ResumeContact />
        <a className={styles.linkedin} href={resume.linkedin.url} target="_blank" rel="noopener noreferrer">
          {resume.linkedin.label}
        </a>
      </header>

      <section className={styles.section} aria-labelledby="profile-heading">
        <h2 id="profile-heading">Profile</h2>
        <p>{resume.profile}</p>
      </section>

      <section className={styles.section} aria-labelledby="skills-heading">
        <h2 id="skills-heading">Technical Skills</h2>
        <ul className={styles.skills}>
          {resume.skills.map((skill) => (
            <li key={skill.category}>
              <strong>{skill.category}</strong>
              <span> — {skill.items}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="experience-heading">
        <h2 id="experience-heading">Professional Experience</h2>
        <div className={styles.timeline}>
          {resume.experience.map((job) => (
            <article className={styles.timelineItem} key={`${job.role}-${job.dates}`}>
              <div className={styles.metadata}>
                <p className={styles.dates}>{job.dates}</p>
                <p>{job.location}</p>
              </div>
              <div className={styles.marker} aria-hidden="true" />
              <div className={styles.content}>
                <h3>{job.role}</h3>
                <p className={styles.organization}>{job.company}</p>
                <ul>
                  {job.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="education-heading">
        <h2 id="education-heading">Education</h2>
        <div className={styles.timeline}>
          <article className={styles.timelineItem}>
            <div className={styles.metadata}>
              <p className={styles.dates}>{resume.education.dates}</p>
              <p>{resume.education.location}</p>
            </div>
            <div className={styles.marker} aria-hidden="true" />
            <div className={styles.content}>
              <h3>{resume.education.degree}</h3>
              <p className={styles.organization}>{resume.education.institution}</p>
            </div>
          </article>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="projects-heading">
        <h2 id="projects-heading">Projects</h2>
        <div className={styles.projects}>
          {resume.projects.map((project) => (
            <article className={styles.project} key={project.name}>
              <h3>{project.name}</h3>
              <p className={styles.dates}>{project.dates}</p>
              <p>{project.description}</p>
              <p className={styles.technologies}>
                <strong>Technologies Used:</strong> {project.technologies}
              </p>
            </article>
          ))}
        </div>
      </section>
    </article>
  );
}
