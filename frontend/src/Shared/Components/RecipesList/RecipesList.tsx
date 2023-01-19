import React, {useEffect, useState} from 'react';
import {RecipeDTO} from '../../DTOs/RecipeDTO';
import BaseLayout from '../BaseLayout/BaseLayout';
import CustomCard from '../Card/CustomCard';
type Props = {
    dataAll?: RecipeDTO[];
    recipeSingle? : RecipeDTO;
    children?;
    input?:any;
};

const RecipesList = (props: Props) => {
  const [fiteredData, setFilteredData] = useState<RecipeDTO[]>([]);

  useEffect(() => {
    if (props.dataAll) {
      setFilteredData(props.dataAll);
    }
  }, [props.dataAll]);

  const onSearch = (input: string) => {
    if (props.dataAll && input.length > 3) {
      const computedData = props.dataAll.filter((elem) => elem.name.toLocaleLowerCase().includes(input));
      setFilteredData(computedData);
    } else if (props.dataAll && input == '') {
      setFilteredData(props.dataAll);
    }
  };
  const onFilter = (elem) => {
    let computedData = props.dataAll;
    if (computedData) {
      if (elem.tags.liked.length > 0) {
        computedData = computedData.filter((x) => x.tags.some((y) => elem.tags.liked.includes(y.tagName)));
      }
      if (elem.tags.disliked.length > 0) {
        computedData = computedData.filter((x) => !x.tags.some((y) => elem.tags.disliked.includes(y.tagName)));
      }
      if (elem.cousine.liked.length > 0) {
        computedData = computedData.filter((x) => elem.cousine.liked.includes(x.cousine));
      }
      if (elem.cousine.disliked.length > 0) {
        computedData = computedData.filter((x) => !elem.cousine.disliked.includes(x.cousine));
      }
      if (elem.ingredients.liked.length > 0) {
        computedData = computedData.filter((x) => x.ingredients.some((y) => elem.ingredients.liked.includes(y.name)));
      }
      if (elem.ingredients.disliked.length > 0) {
        computedData = computedData.filter((x) => !x.ingredients.some((y) => elem.ingredients.disliked.includes(y.name)));
      }
      if (elem.allergens.liked.length > 0) {
        computedData = computedData.filter((x) => x.ingredients.some((y) => elem.allergens.liked.includes(y.allergen_name)));
      }
      if (elem.allergens.disliked.length > 0) {
        computedData = computedData.filter((x) => !x.ingredients.some((y) => elem.allergens.disliked.includes(y.allergen_name)));
      }
      setFilteredData(computedData);
    }
  };
  return (
    <BaseLayout onSearch={onSearch} onFilter={onFilter}>
      {props.children}
      {fiteredData?.map((recipe: RecipeDTO) => {
        return (
          <CustomCard key={recipe.id} data={recipe} />
        );
      })}
      {props.recipeSingle && ( <CustomCard key={props.recipeSingle?.id} data={props.recipeSingle} />)}
    </BaseLayout >
  );
};

export default RecipesList;
