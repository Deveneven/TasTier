import Drawer from '@mui/material/Drawer';
import React from 'react';
import SideMenu from './SideMenu';

type MobileDrawerProps = {
isDrawerOpen : boolean,
setIsDrawerOpen;
}

function MobileDrawer({isDrawerOpen, setIsDrawerOpen} : MobileDrawerProps) {
  return (
    <>
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <SideMenu />
      </Drawer>
    </>
  );
}

export default MobileDrawer;
