import React from 'react';
import {
  Avatar,
  Button,
} from '@mui/material';
import {Save} from '@material-ui/icons';
import './Comment.scss';

const Comment = () => {
  return (
    <div className='comment'>
      <Avatar src="/broken-image.jpg" />
      <textarea/>
      <Button>
        <Save/>
      </Button>
    </div>
  );
};
export default Comment;
