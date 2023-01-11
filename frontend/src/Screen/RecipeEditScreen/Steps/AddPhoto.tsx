import {Button, Grid, IconButton, ImageList, ImageListItem, ImageListItemBar} from '@mui/material';
import React, {useEffect, useState} from 'react';
import DeleteIcon from '@material-ui/icons/Delete';

const AddPhoto = (props: any) => {
  const [image, setImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<string[]>([]);
  const [filesToUpload, setFilesToUpload] = useState([]);

  const handleSetImage = (event) => {
    const files = event.target.files;
    setFilesToUpload(event.target.files);
    [...files].forEach((item) => {
      const reader = new FileReader();
      reader.readAsDataURL(item);
      reader.onloadend = (e) => {
        if (!!reader) {
          const a = reader.result as string;
          setImage(a);
        }
      };
    });
  };

  useEffect(() => {
    if (!!image) {
      setSelectedFile([...selectedFile, image]);
      props.onChange({name: 'images', value: filesToUpload});
    };
  }, [image]);

  const deletePhoto = (index) => {
    console.log(index);
    if (index !== -1) {
      const updatedList = selectedFile;
      updatedList.splice(index, 1);
      setSelectedFile((prevLists) => [...updatedList]);
    }
  };
  return (
    <Grid
      container
      spacing={4}>
      <Grid item md={12} xs={12}>
        <span>
          Add some photos of your dish : &nbsp;
        </span>
        <Button
          variant='contained'
          component='label'>
          Choose a file
          <input
            multiple
            hidden
            accept="image/*"
            type="file"
            onChange={handleSetImage}/>
        </Button>
      </Grid>
      <Grid item md={12} xs={12}>
        <ImageList>
          {selectedFile.map((item, index) => (
            <ImageListItem key={index}>
              <img
                src={!!item ? item : undefined}
              />
              <ImageListItemBar
                actionIcon={
                  <IconButton
                    sx={{color: 'white'}}
                    onClick={() => deletePhoto(index)}>
                    <DeleteIcon />
                  </IconButton>
                }/>
            </ImageListItem>
          ))}
        </ImageList>
      </Grid>
    </Grid>
  );
};
export default AddPhoto;
