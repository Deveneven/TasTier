import SwipeableDrawer from '@mui/material/SwipeableDrawer'; import React from 'react';
import SideMenu from './SideMenu';

type MobileDrawerProps = {
isDrawerOpen : boolean,
setIsDrawerOpen;
}

function MobileDrawer({isDrawerOpen, setIsDrawerOpen} : MobileDrawerProps) {
  return (
    <>
      <SwipeableDrawer
        anchor="left"
        open={isDrawerOpen}
        onOpen={() => setIsDrawerOpen(true)}
        onClose={() => setIsDrawerOpen(false)}
      >
        <SideMenu />
      </SwipeableDrawer>
    </>
  );
}

export default MobileDrawer;
