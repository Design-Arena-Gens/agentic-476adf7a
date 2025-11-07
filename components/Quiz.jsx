"use client";
import { useMemo, useState } from 'react';
import MathText from './MathText';
import { subjects } from '../data/lessons';
import { generators } from '../data/quizzes';

export default function Quiz() {
  const allTopics = useMemo(() => subjects.flatMap(s => s.topics.map(t => ({...t, subjectId: s.id, subjectName: s.name}))), []);
  const [subjectId, setSubjectId] = useState(subjects[0]?.id || 'a-level-maths');
  const topicsForSubject = allTopics.filter(t => t.subjectId === subjectId);
  const [slug, setSlug] = useState(topicsForSubject[0]?.slug || 'algebra-quadratics');
  const [count, setCount] = useState(5);

  const [state, setState] = useState({ started: false, idx: 0, questions: [], answers: [], score: 0, finished: false });

  const start = () => {
    const gen = generators[slug];
    const qs = Array.from({ length: count }, () => gen());
    setState({ started: true, idx: 0, questions: qs, answers: Array(count).fill(null), score: 0, finished: false });
  };

  const select = (optionIdx) => {
    setState(prev => {
      const q = prev.questions[prev.idx];
      const isCorrect = optionIdx === q.answerIndex;
      const answers = [...prev.answers];
      answers[prev.idx] = optionIdx;
      const score = prev.score + (isCorrect ? 1 : 0);
      return { ...prev, answers, score };
    });
  };

  const next = () => {
    setState(prev => {
      const nextIdx = prev.idx + 1;
      if (nextIdx >= prev.questions.length) return { ...prev, finished: true };
      return { ...prev, idx: nextIdx };
    });
  };

  const reset = () => setState({ started: false, idx: 0, questions: [], answers: [], score: 0, finished: false });

  return (
    <div className="quiz">
      {!state.started && (
        <div>
          <h1>Practice Quiz</h1>
          <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(3, minmax(0,1fr))' }}>
            <div>
              <label>Subject</label>
              <select value={subjectId} onChange={(e)=>{ setSubjectId(e.target.value); const first = subjects.find(s=>s.id===e.target.value)?.topics?.[0]; setSlug(first?.slug || ''); }}>
                {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div>
              <label>Topic</label>
              <select value={slug} onChange={(e)=>setSlug(e.target.value)}>
                {subjects.find(s=>s.id===subjectId)?.topics.map(t => <option key={t.slug} value={t.slug}>{t.title}</option>)}
              </select>
            </div>
            <div>
              <label>Questions</label>
              <input type="number" min={1} max={15} value={count} onChange={(e)=>setCount(parseInt(e.target.value)||5)} />
            </div>
          </div>
          <button className="btn primary" style={{ marginTop: 16 }} onClick={start}>Start</button>
        </div>
      )}

      {state.started && !state.finished && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>Question {state.idx + 1} / {state.questions.length}</div>
            <div>Score: {state.score}</div>
          </div>
          <div className="section">
            <MathText text={state.questions[state.idx].question} />
          </div>
          <div className="options">
            {state.questions[state.idx].options.map((opt, i) => (
              <button key={i} className={`option ${state.answers[state.idx]===i?'selected':''}`} onClick={() => select(i)}>
                <MathText text={opt} />
              </button>
            ))}
          </div>
          {state.answers[state.idx] !== null && (
            <div className="result">
              {state.answers[state.idx] === state.questions[state.idx].answerIndex ? (
                <div className="correct">Correct!</div>
              ) : (
                <div className="wrong">Incorrect.</div>
              )}
              <div style={{ marginTop: 6 }}>
                <strong>Explanation: </strong>
                <MathText text={state.questions[state.idx].explanation} />
              </div>
            </div>
          )}
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <button className="btn" onClick={reset}>Restart</button>
            <button className="btn" onClick={next}>Next</button>
          </div>
        </div>
      )}

      {state.finished && (
        <div>
          <h2>Finished!</h2>
          <p>Your score: <strong>{state.score} / {state.questions.length}</strong></p>
          <button className="btn primary" onClick={reset}>Try another quiz</button>
        </div>
      )}
    </div>
  );
}
