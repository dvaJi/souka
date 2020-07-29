import * as React from 'react';

interface TranslationBlockProps {
  originalText: string;
}

export const TranslationBlock = ({ originalText }: TranslationBlockProps) => {
  const [translation, setTranslation] = React.useState(originalText);
  return (
    <div>
      <div>{originalText}</div>
      <textarea value={translation} onChange={(e) => setTranslation(e.target.value)} />
    </div>
  );
};
