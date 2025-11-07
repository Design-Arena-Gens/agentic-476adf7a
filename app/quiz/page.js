import dynamic from 'next/dynamic';

const Quiz = dynamic(() => import('../../components/Quiz'), { ssr: false });

export const metadata = { title: 'Quiz | A Level Maths Tutor' };

export default function QuizPage() {
  return (
    <main className="container">
      <Quiz />
    </main>
  );
}
