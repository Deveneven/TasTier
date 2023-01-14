import React, {useContext, useState} from 'react';
import {
  Avatar,
  Button,
} from '@mui/material';
import {Save} from '@material-ui/icons';
import './Comment.scss';
import UserContext from '../../../Contexts/UserContext';
import {Api} from '../../../Utils/Api';
import {Grid, TextField} from '@material-ui/core';

const Comment = (props: any) => {
  const {user} = useContext(UserContext);
  const [content, setContent] = useState<string>('');
  const addNewComment = () => {
    const payload = {
      text: content,
      recipeid: props.recipeId,
    };
    Api.post(`${process.env.REACT_APP_DB_API}/recipes/comment`, payload)
        .then((response) => {
          if (response.success && props.setComments) {
            setContent('');
            props.setComments(response.text);
          }
        });
  };
  return (
    <Grid
      container>
      <Grid item xs={11} md={11}>
        <TextField
          multiline
          variant='outlined'
          fullWidth
          label="Comment"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          InputProps={{
            startAdornment: (
              <Avatar src={user.avatar} />
            ),
          }}
        />
      </Grid>
      <Grid item xs={1} md={1}>
        <Button>
          <Save onClick={addNewComment}/>
        </Button>
      </Grid>
    </Grid>
  );
};
export default Comment;
