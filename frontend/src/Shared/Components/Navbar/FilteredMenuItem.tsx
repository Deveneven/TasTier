/*eslint-disable*/
import { Checkbox, FormControl, Grid, IconButton, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, Typography } from '@mui/material';
import React, { useEffect, useState, useContext} from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import UserContext from '../../../Contexts/UserContext';

const FilteredMenuItem = (props: any) => {
    const [allOptions, setAllOptions] = useState([]);
    const [dislikedOptions, setDisLikedOptions] = useState([]);
    const [likedOptions, setLikedOptions] = useState([]);
    const [defaultLiked, setDefaultLiked] = useState<string[]>([]);
    const [defaultDisliked, setDefaultDisliked] = useState<string[]>([]);
    const {user} = useContext(UserContext);

    useEffect(() => {
        if (user && user[props.name]) {
            if (user[props.name].disliked) {
                setDefaultDisliked(user[props.name].disliked.map((elem) => elem.name));
            }
            if (user[props.name].liked) {
                setDefaultLiked(user[props.name].liked.map((elem) => elem.name));
            }
        }

        if(props.allOptions) { 
            let all = props.allOptions;
            const def = props.defaultItems[props.name];
            
            if(def['liked'].length > 0){
                setDefaultLiked(def['liked']);
            }
            if(def['disliked'].length > 0) {
                setDefaultDisliked(def['disliked']);
            }
            setAllOptions(all);
            setLikedOptions(all.filter((elem) => !defaultDisliked.includes(elem)));
            setDisLikedOptions(all.filter((elem) => !defaultLiked.includes(elem)));
        }
    }, [props.allOptions, user]);

    const changeLikedOptions = (event) => {
        const value = event.target? event.target.value : event;
        setDefaultLiked(value)
        const filteredList = allOptions.filter((elem) => !value.includes(elem));
        setDisLikedOptions(filteredList);
        if(props.onChange && props.name) {
            props.onChange(props.name, value, true);
        }
    };
    const changeDisLikedOptions = (event) => {
        const value = event.target? event.target.value : event;
        setDefaultDisliked(value);
        const filteredList = allOptions.filter((elem) => !value.includes(elem));
        setLikedOptions(filteredList);
        if(props.onChange && props.name) {
            props.onChange(props.name, value);
        }
    }
    const clearLiked = () => {
        changeLikedOptions([]);
    }
    const clearDisiked = () => {
        changeDisLikedOptions([]);
    }
    return (
        <>
            <Grid item xs={12} md={6}>
                <Typography
                    component="legend">
                    Choose liked {props.name}
                </Typography>
                <FormControl fullWidth>
                    <Select
                    multiple
                    value={defaultLiked}
                    onChange={changeLikedOptions}
                    renderValue={(selected) => selected.join(', ')}
                    startAdornment={
                        <IconButton
                            sx={{visibility: defaultLiked.length > 0 ? "visible": "hidden"}}
                            onClick={clearLiked}>
                            <ClearIcon/>
                        </IconButton>
                    }>
                    {likedOptions.map((name) => (
                        <MenuItem key={name} value={name}>
                        <Checkbox checked={defaultLiked.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography
                    component="legend">
                    Choose disliked {props.name}
                </Typography>
                <FormControl fullWidth>
                    <Select
                    multiple
                    value={defaultDisliked}
                    onChange={changeDisLikedOptions}
                    renderValue={(selected) => selected.join(', ')}
                    startAdornment={
                        <IconButton
                            sx={{visibility: defaultDisliked.length > 0 ? "visible": "hidden"}}
                            onClick={clearDisiked}>
                            <ClearIcon/>
                        </IconButton>
                    }>
                    {dislikedOptions.map((name) => (
                        <MenuItem key={name} value={name}>
                        <Checkbox checked={defaultDisliked.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
            </Grid>
        </>
    )
}
export default FilteredMenuItem;