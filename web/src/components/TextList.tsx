import * as React from 'react';
import { TextBlock } from './TextBlock';

interface TextListProps {
  texts: any[];
}

export const TextList = ({ texts }: TextListProps) => {
  return (
    <div>
      <div>
        <strong className="tit">SORRY</strong>
        <p className="desc">
          Font typeface and size editing tool is not available for users on IE 8 or less.
          <br />
          To access the editing tools, we recommend you to upgrade your browser version to IE9 or
          more or use Chrome browser.
        </p>
      </div>
      <div>
        {texts.flat().map((t, i) => (
          <TextBlock key={i} text={t.text} />
        ))}
      </div>
    </div>
  );
};
