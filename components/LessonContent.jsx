"use client";
import MathText from './MathText';

export default function LessonContent({ topic }) {
  if (!topic) return null;
  return (
    <article className="prose">
      <h1>{topic.title}</h1>
      <p className="subtitle">{topic.summary}</p>
      {topic.sections.map((sec, idx) => {
        if (sec.type === 'h2') return <h2 key={idx}>{sec.text}</h2>;
        if (sec.type === 'h3') return <h3 key={idx}>{sec.text}</h3>;
        if (sec.type === 'math') return <div key={idx}><MathText text={`$$${sec.tex}$$`} /></div>;
        if (sec.type === 'example') {
          return (
            <div key={idx} className="card">
              <strong>Example</strong>
              <div style={{ marginTop: 8 }}>
                <MathText text={sec.prompt} />
              </div>
              {sec.steps && (
                <ol>
                  {sec.steps.map((s, i2) => (
                    <li key={i2}><MathText text={s} /></li>
                  ))}
                </ol>
              )}
              {sec.answer && (
                <div className="result" style={{ marginTop: 8 }}>
                  <span className="badge">Answer</span>
                  <div style={{ marginTop: 6 }}><MathText text={sec.answer} /></div>
                </div>
              )}
            </div>
          );
        }
        // paragraph default
        return <p key={idx}><MathText text={sec.text} /></p>;
      })}
    </article>
  );
}
