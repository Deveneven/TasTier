import {Card} from '@mui/material';
import React from 'react';
import Navbar from '../Navbar/Navbar';
import './BaseLayout.scss';
interface Props {
  children;
  onSearch?: any;
  onFilter?: any
}
const BaseLayout = (props: Props) => {
  return (
    <>
      <Navbar onSearch={props.onSearch} onFilter={props.onFilter}/>
      <Card className='base-layout-card'>
        {props.children}
      </Card>
    </>
  );
};
export default BaseLayout;

