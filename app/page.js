import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="container">
      <header className="hero">
        <h1>A Level Maths Tutor</h1>
        <p className="subtitle">Learn A Level Maths and Further Maths with clear lessons and adaptive quizzes.</p>
        <div className="cta">
          <Link className="btn primary" href="/topics">Explore Topics</Link>
          <Link className="btn" href="/quiz">Practice Quiz</Link>
        </div>
      </header>

      <section className="grid two">
        <div className="card">
          <h3>A Level Maths</h3>
          <p>Core topics including algebra, calculus, trigonometry, vectors, and statistics.</p>
          <Link className="btn small" href="/topics#maths">Browse Maths</Link>
        </div>
        <div className="card">
          <h3>Further Maths</h3>
          <p>Advanced topics like complex numbers, matrices, and differential equations.</p>
          <Link className="btn small" href="/topics#further">Browse Further Maths</Link>
        </div>
      </section>

      <section className="features">
        <div className="feature">
          <h4>Step-by-step explanations</h4>
          <p>See every step, not just the answer. Build true understanding.</p>
        </div>
        <div className="feature">
          <h4>LaTeX-quality maths</h4>
          <p>Clear math rendering powered by KaTeX. Learn with beautiful formulas.</p>
        </div>
        <div className="feature">
          <h4>Adaptive practice</h4>
          <p>Questions scale in difficulty based on your performance.</p>
        </div>
      </section>
    </main>
  );
}
