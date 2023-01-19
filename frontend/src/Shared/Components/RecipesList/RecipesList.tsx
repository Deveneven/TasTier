import React, {useEffect, useState} from 'react';
import {RecipeDTO} from '../../DTOs/RecipeDTO';
import BaseLayout from '../BaseLayout/BaseLayout';
import CustomCard from '../Card/CustomCard';
type Props = {
    dataAll: RecipeDTO[];
    input?:any;
};

const RecipesList = (props: Props) => {
  const [fiteredData, setFilteredData] = useState<RecipeDTO[]>([]);

  useEffect(() => {
    setFilteredData(props.dataAll);
  }, [props.dataAll]);

  const onSearch = (input: string) => {
    console.log('on search');
    console.log(input);
    if (input.length > 3) {
      const computedData = props.dataAll.filter((elem) => elem.name.toLocaleLowerCase().includes(input));
      setFilteredData(computedData);
    } else if (input == '') {
      setFilteredData(props.dataAll);
    }
  };
  const onFilter = (elem) => {
    console.log('On filter');
    console.log(elem);
    let computedData = props.dataAll;
    console.log(computedData);
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
    console.log(computedData);
    setFilteredData(computedData);
  };
  return (
    <BaseLayout onSearch={onSearch} onFilter={onFilter}>
      {fiteredData?.map((recipe: RecipeDTO) => {
        return (
          <CustomCard key={recipe.id} data={recipe} />
        );
      })}
    </BaseLayout >
  );
};

export default RecipesList;
