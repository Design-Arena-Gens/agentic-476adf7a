"use client";
import { InlineMath, BlockMath } from 'react-katex';

function splitInline(text) {
  const parts = [];
  let cursor = 0;
  while (cursor < text.length) {
    const start = text.indexOf('$', cursor);
    if (start === -1) {
      parts.push(text.slice(cursor));
      break;
    }
    const isEscaped = start > 0 && text[start - 1] === '\\';
    if (isEscaped) {
      parts.push(text.slice(cursor, start - 1) + '$');
      cursor = start + 1;
      continue;
    }
    // push text before
    if (start > cursor) parts.push(text.slice(cursor, start));
    const end = text.indexOf('$', start + 1);
    if (end === -1) {
      parts.push(text.slice(start));
      break;
    }
    const formula = text.slice(start + 1, end);
    parts.push({ math: formula });
    cursor = end + 1;
  }
  return parts;
}

export default function MathText({ text }) {
  if (!text) return null;
  // Block handling with $$ ... $$ lines
  const blocks = text.split(/\n\n\$\$|\$\$\n\n/);
  if (text.includes('$$')) {
    // Simple split: treat text between $$ as block math
    const segments = [];
    let remaining = text;
    let i = 0;
    while (remaining.includes('$$')) {
      const start = remaining.indexOf('$$');
      const before = remaining.slice(0, start);
      if (before) segments.push({ type: 'text', content: before });
      const afterStart = remaining.slice(start + 2);
      const end = afterStart.indexOf('$$');
      if (end === -1) {
        segments.push({ type: 'text', content: afterStart });
        remaining = '';
        break;
      }
      const formula = afterStart.slice(0, end);
      segments.push({ type: 'block', content: formula.trim() });
      remaining = afterStart.slice(end + 2);
      i++;
      if (i > 50) break; // safety
    }
    if (remaining) segments.push({ type: 'text', content: remaining });

    return (
      <div className="prose">
        {segments.map((seg, idx) => {
          if (seg.type === 'block') return <BlockMath key={idx}>{seg.content}</BlockMath>;
          const parts = splitInline(seg.content);
          return (
            <p key={idx}>
              {parts.map((p, i2) => (typeof p === 'string' ? p : <InlineMath key={i2}>{p.math}</InlineMath>))}
            </p>
          );
        })}
      </div>
    );
  }

  // Only inline
  const parts = splitInline(text);
  return (
    <span>
      {parts.map((p, i) => (typeof p === 'string' ? p : <InlineMath key={i}>{p.math}</InlineMath>))}
    </span>
  );
}
