import {Card} from '@mui/material';
import React from 'react';
import Navbar from '../Navbar/Navbar';
import './BaseLayout.scss';
interface Props {
  children;
}
const BaseLayout = (props: Props) => {
  return (
    <>
      <Navbar/>
      <Card className='base-layout-card'>
        {props.children}
      </Card>
    </>
  );
};
export default BaseLayout;

