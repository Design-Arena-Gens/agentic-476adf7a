import Link from 'next/link';
import { subjects } from '../../data/lessons';

export const metadata = { title: 'Topics | A Level Maths Tutor' };

export default function TopicsPage() {
  return (
    <main className="container">
      <h1>Topics</h1>
      {subjects.map((subject) => (
        <section key={subject.id} className="section">
          <h2 id={subject.id === 'a-level-maths' ? 'maths' : 'further'}>{subject.name}</h2>
          <div className="list">
            {subject.topics.map((t) => (
              <div className="topic" key={t.slug}>
                <div>
                  <Link href={`/topics/${t.slug}`}>{t.title}</Link>
                  <div className="subtitle">{t.summary}</div>
                </div>
                <span className="badge">{t.difficulty}</span>
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
