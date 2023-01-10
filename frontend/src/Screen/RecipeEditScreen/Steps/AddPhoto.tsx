import {Grid, ImageList, ImageListItem} from '@mui/material';
import React, {useEffect, useState} from 'react';

const AddPhoto = (props: any) => {
  const [image, setImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<string[]>([]);
  const [filesToUpload, setFilesToUpload] = useState([]);
  // TO DO: Usuwanie zdjęcia
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
