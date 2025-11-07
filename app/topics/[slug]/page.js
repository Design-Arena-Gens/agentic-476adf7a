import LessonContent from '../../../components/LessonContent';
import { subjects } from '../../../data/lessons';

export function generateStaticParams() {
  const all = subjects.flatMap((s) => s.topics.map((t) => ({ slug: t.slug })));
  return all;
}

export default function TopicPage({ params }) {
  const slug = params.slug;
  const topic = subjects.flatMap((s) => s.topics).find((t) => t.slug === slug);
  if (!topic) {
    return (
      <main className="container">
        <h1>Topic not found</h1>
        <p>We couldn't find that topic.</p>
      </main>
    );
  }
  return (
    <main className="container">
      <LessonContent topic={topic} />
    </main>
  );
}
