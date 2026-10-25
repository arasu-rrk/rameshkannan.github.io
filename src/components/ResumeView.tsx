import resume from '@/data/resume.json';
import ResumeContact from '@/components/ResumeContact';
import ResumePrintButton from '@/components/ResumePrintButton';
import styles from '@/app/resume/resume.module.scss';

export default function ResumeView() {
  return (
    <main className={styles.page}>
      <ResumePrintButton />
      <article className={styles.resume}>
        <header className={styles.header}>
          <div className={styles.nameLine}>
            <h1>{resume.name}</h1>
            <p className={styles.title}>{resume.title}</p>
          </div>
          <ResumeContact />
          <a className={styles.linkedin} href={resume.linkedin.url} target="_blank" rel="noreferrer">
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
          <div className={styles.entries}>
            {resume.experience.map((job) => (
              <article className={styles.entry} key={`${job.role}-${job.dates}`}>
                <div className={styles.entryHeading}>
                  <h3>{job.role}</h3>
                  <p>{job.dates}<span aria-hidden="true"> | </span>{job.location}</p>
                </div>
                <p className={styles.organization}>{job.company}</p>
                <ul>
                  {job.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="education-heading">
          <h2 id="education-heading">Education</h2>
          <div className={styles.entryHeading}>
            <h3>{resume.education.degree}</h3>
            <p>{resume.education.dates}<span aria-hidden="true"> | </span>{resume.education.location}</p>
          </div>
          <p>{resume.education.institution}</p>
        </section>

        <section className={styles.section} aria-labelledby="projects-heading">
          <h2 id="projects-heading">Projects</h2>
          <div className={styles.entries}>
            {resume.projects.map((project) => (
              <article className={styles.entry} key={project.name}>
                <div className={styles.entryHeading}>
                  <h3>{project.name}</h3>
                  <p>{project.dates}</p>
                </div>
                <p>{project.description}</p>
                <p className={styles.technologies}>
                  <strong>Technologies Used:</strong> {project.technologies}
                </p>
              </article>
            ))}
          </div>
        </section>
      </article>
    </main>
  );
}
