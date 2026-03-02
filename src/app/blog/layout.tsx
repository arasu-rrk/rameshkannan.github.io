import 'highlight.js/styles/atom-one-dark.css';
import styles from './blog.module.scss';

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${styles.blog} min-h-screen bg-white`}>
      {children}
    </div>
  );
}
