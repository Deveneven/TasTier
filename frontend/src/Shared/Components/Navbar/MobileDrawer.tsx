/* eslint-disable react/prop-types */
import Drawer from '@mui/material/Drawer';
import React from 'react';
import SideMenu from './SideMenu';
function MobileDrawer({isDrawerOpen, setIsDrawerOpen}) {
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
