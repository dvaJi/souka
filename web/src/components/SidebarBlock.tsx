import * as React from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';

interface SidebarBlockProps {
  children: React.ReactChildren | string;
}

export const SidebarBlock = ({ children }: SidebarBlockProps) => {
  const [showContent, setShowContent] = React.useState(true);
  return (
    <div>
      <div className="bg-gray-700 text-center text-lg leading-relaxed">
        Direct Messages{' '}
        <MdKeyboardArrowDown
          className="inline-block"
          onClick={() => setShowContent(!showContent)}
        />
      </div>
      {showContent && <div className="mb-2">{children}</div>}
    </div>
  );
};

export default SidebarBlock;
