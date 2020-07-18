import * as React from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';

function SidebarBlock({ children }) {
  const [showContent, setShowContent] = React.useState(true);
  return (
    <div>
      <div class="bg-gray-700 text-center text-lg leading-relaxed">
        Direct Messages{' '}
        <MdKeyboardArrowDown
          className="inline-block"
          onClick={() => setShowContent(!showContent)}
        />
      </div>
      {showContent && <div className="mb-2">{children}</div>}
    </div>
  );
}

export default SidebarBlock;
