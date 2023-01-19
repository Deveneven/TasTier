/*eslint-disable*/
import {Box, Button, Grid, Typography} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Api } from '../../../Utils/Api';
import { CousineDTO } from '../../DTOs/CousineDTO';
import { IngredientDTO } from '../../DTOs/IngredientDTO';
import { TagDTO } from '../../DTOs/TagDTO';
import FilteredMenuItem from './FilteredMenuItem';
import './Navbar.scss';

const FilteredMenu = (props: any) => {
    const [allTags, setAllTags] = useState<string[]>([]);
    const [allCousine, setAllCousine] = useState<string[]>([]);
    const [allIngredients, setAllIngredients] = useState<string[]>([]);
    const [allAllergens, setAllAllergens] = useState<string[]>([]);

    const [filteredItem, setFilteredItem] = useState({
        ingredients: {liked: [], disliked: []},
        cousine: {liked: [], disliked: []},
        allergens: {liked: [], disliked: []},
        tags: {liked: [], disliked: []}
      });

    const fetchData = async() => {
        const dataTags = await Api.get(`${process.env.REACT_APP_DB_API}/recipes/get/tags`);
        if (dataTags.success) {
            const all = dataTags.text as TagDTO[];
            setAllTags(all.map((elem) => {return elem.tagName;}));
        }
    
        const dataCousine = await Api.get(`${process.env.REACT_APP_DB_API}/diet/cousine/get`);
        if (dataCousine.success) {
            const all = dataCousine.text as CousineDTO[];
            setAllCousine(all.map((elem) => {return elem.name}));
        }

        const dataIngredients = await Api.get(`${process.env.REACT_APP_DB_API}/recipes/get/ingredients/all`);
        if (dataIngredients.success) {
            const all = dataIngredients.text as IngredientDTO[];
            setAllIngredients(all.map((elem) => {return elem.name}));
        }

        const dataAllergens = await Api.get(`${process.env.REACT_APP_DB_API}/diet/allergens/get`);
        if (dataAllergens.success) {
            const all = dataAllergens.text;
            setAllAllergens(all.map((elem) => {return elem.name}));
        }
    };
    const onChange = (name, elem, isLiked = false) => {
        if(isLiked){
            filteredItem[name]['liked'] = elem;
        }else{
            filteredItem[name]['disliked'] = elem;
        }
    };
    const onFilter = () => {
        console.log('On filter')
        if (props.onFilter){
            props.onFilter(filteredItem);
        }
    }
    useEffect(() => {
        console.log('use effect');
        fetchData();
    }, []);
    return (
        <Box className='filter-menu'>
            <Grid
                spacing={1}
                container>
                    <FilteredMenuItem
                        name='tags'
                        allOptions={allTags}
                        onChange={onChange}
                        defaultItems={props.defaultFilteredItem}/>
                    <FilteredMenuItem
                        name='cousine'
                        allOptions={allCousine}
                        onChange={onChange}
                        defaultItems={props.defaultFilteredItem}/>
                    <FilteredMenuItem
                        name='ingredients'
                        allOptions={allIngredients}
                        onChange={onChange}
                        defaultItems={props.defaultFilteredItem}/>
                    <FilteredMenuItem
                        name='allergens'
                        allOptions={allAllergens}
                        onChange={onChange}
                        defaultItems={props.defaultFilteredItem}/>
                    <Grid item xs={12} md={12}>
                        <Button
                            fullWidth
                            variant='contained'
                            onClick={onFilter}>
                            Filter
                        </Button>
                    </Grid>
            </Grid>
        </Box>
    );
}
export default FilteredMenu;
