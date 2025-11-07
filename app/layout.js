import './globals.css';
import 'katex/dist/katex.min.css';

export const metadata = {
  title: 'A Level Maths Tutor',
  description: 'Interactive A Level & Further Maths lessons and quizzes',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
