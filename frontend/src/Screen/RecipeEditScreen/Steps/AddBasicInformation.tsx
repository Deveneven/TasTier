import SquareIcon from '@mui/icons-material/Square';
import SquareOutlinedIcon from '@mui/icons-material/SquareOutlined';
import {Grid, MenuItem, Rating, Select, Typography} from '@mui/material';
import React, {useEffect, useState} from 'react';
import CustomAutocomplete from '../../../Shared/Components/Autocomplete/CustomAutocomplete';
import TextForm from '../../../Shared/Components/TextForm/TextForm';
import './AddBasicInformation.scss';
import {Api} from '../../../Utils/Api';
import {CousineDTO} from '../../../Shared/DTOs/CousineDTO';
import {FormControlLabel, InputAdornment} from '@material-ui/core';
import Checkbox from '@mui/material/Checkbox';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MaskedInput from 'react-text-mask';

type MaskProps = {
  inputRef: any,
};
const TextMaskCustom = (props: MaskProps) => {
  const {inputRef, ...other} = props;
  return (
    <MaskedInput
      {...other}
      ref={inputRef}
      mask={[/[0-9]/, /[0-9]/, ':', /[0-9]/, /[0-9]/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
};

const AddBasicInformation = (props: any) => {
  const [value, setValue] = useState<string[]>([]);
  const [cuisineType, setCuisineType] = useState<CousineDTO[]>([]);
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [defaultTags, setDefautTags] = useState<string[]>([]);

  const setTags = (event, newValue) => {
    setValue(newValue);
    props.onChange({name: 'tags', value: newValue});
  };

  const fetchData = async () => {
    const data = await Api.get(`${process.env.REACT_APP_DB_API}/diet/cousine/get`);
    if (data.success) {
      setCuisineType(data.text);
    }
    const tags = await Api.get(`${process.env.REACT_APP_DB_API}/recipes/get/tags`);
    if (tags.success) {
      const defTags = tags.text.map((x) => {
        return x.tagName;
      });
      setDefautTags(defTags);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const isPrivateChange = (e) => {
    setIsPrivate(e.target.checked);
    props.onChange({name: 'priv', value: e.target.checked});
  };

  return (
    <Grid
      container
      spacing={4}>
      <Grid item xs={12} md={12}>
        <TextForm
          required
          minLenght={5}
          variant='outlined'
          label="Name of dish"
          name="name"
          fullWidth
          {...props}
        />
      </Grid>
      <Grid item xs={12} md={12}>
        <TextForm
          required
          maxLenght={250}
          multiline
          variant='outlined'
          fullWidth
          label="Short description"
          name="description"
          {...props}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextForm
          required
          regex={/[0-9]{2}:[0-9]{2}/g}
          multiline
          variant='outlined'
          label="Cooking time"
          name="time"
          fullWidth
          InputProps={{
            inputComponent: TextMaskCustom,
            startAdornment: (
              <InputAdornment position="start">
                <AccessTimeIcon />
              </InputAdornment>
            ),
          }}
          {...props}
        />
      </Grid>
      <Grid item xs={8} md={3}>
        <Typography component="legend">Difficulty:</Typography>
        <Rating
          name="difficulty"
          defaultValue={1}
          icon={<SquareIcon/>}
          emptyIcon={<SquareOutlinedIcon/>}
          {...props}/>
      </Grid>
      <Grid item xs={4} md={3}>
        <span>Cousine : &nbsp;</span>
        <Select
          name='id_cousine'
          defaultValue={1}
          onChange={props.onChange}>
          {cuisineType?.map((cousine: CousineDTO) => {
            return (
              <MenuItem
                key={cousine.id}
                value={cousine.id}>
                {cousine.name}
              </MenuItem>
            );
          })}
        </Select>
      </Grid>
      <Grid item xs={12} md={12}>
        <CustomAutocomplete
          required
          multiple
          freeSolo
          options={defaultTags}
          value={value}
          onChange={setTags}
          filterSelectedOptions
          label='Tags'
          placeholder="Set tags"
        />
      </Grid>
      <Grid item xs={12} md={12}>
        <FormControlLabel
          className='is-private-checkbox'
          control={<Checkbox onChange={isPrivateChange} checked={isPrivate}/>}
          label='IsPrivate'/>
      </Grid>
    </Grid>
  );
};
export default AddBasicInformation;
