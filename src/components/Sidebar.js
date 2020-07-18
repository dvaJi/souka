import * as React from 'react';
import SidebarBlock from './SidebarBlock';

function Sidebar() {
  return (
    <nav aria-label="side bar" className="w-64 flex-none flex flex-col bg-gray-800 text-gray-400">
      <SidebarBlock>contet of the fisrt block.</SidebarBlock>
      <SidebarBlock>contet of the secondddddd block.</SidebarBlock>
      <SidebarBlock>
        contet of the b lock thirdddasdasder werqwesdf sadfasdfa sdf sadfs.
      </SidebarBlock>
    </nav>
  );
}

export default Sidebar;
