import {Grid, ImageList, ImageListItem} from '@mui/material';
import React, {useEffect, useState} from 'react';

const AddPhoto = () => {
  const [image, setImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<string[]>([]);

  const handleSetImage = (event) => {
    const files = event.target.files;
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
      console.log('Dodano fote');
      console.log(selectedFile);
      setSelectedFile([...selectedFile, image]);
    };
  }, [image]);
  return (
    <Grid
      container
      spacing={4}>
      <Grid item md={12} xs={12}>
        <input
          multiple
          type="file"
          name="image"
          placeholder='Image'
          onChange={(e) => handleSetImage(e)}/>
      </Grid>
      <Grid item md={12} xs={12}>
        <ImageList
          sx={{width: 600, height: 450}}
          cols={3}
          rowHeight={164}>
          {selectedFile.map((item, index) => (
            <ImageListItem key={index}>
              <img
                src={!!item ? item : undefined}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Grid>
    </Grid>
  );
};
export default AddPhoto;
