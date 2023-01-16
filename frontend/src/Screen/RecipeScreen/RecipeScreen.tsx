import React from 'react';
import BaseLayout from '../../Shared/Components/BaseLayout/BaseLayout';
import CustomCard from '../../Shared/Components/Card/CustomCard';
// import {useParams} from 'react-router-dom';
const RecipeScreen = () => {
  // const {id} = useParams();
  const recipe = {
    'id': 49,
    'name': 'Carrots',
    'difficulty': 1,
    'time': '00:10',
    'images': [
      // eslint-disable-next-line max-len
      'https://tastierblobstorage.blob.core.windows.net/images/png-clipart-hawaiian-pizza-kebab-pizza-hut-long-ping-yuen-long-pizza-food-recipe.png',
    ],
    'description': 'Carrots',
    'username': 'Konrad',
    'cousine': 'French',
    'date': '2023-01-15T00:00:00',
    'rating': 0,
    'priv': true,
    'ingredients': [
      {
        'id': 21,
        'name': 'CARROT',
        'calories': 10,
        'allergen': false,
        'amount': 200,
        'unit': 'Spoon',
        'totalMass': '3000',
      },
    ],
    'steps': [
      {
        'step_Number': 0,
        'stepDesc': 'peel carrots',
      },
    ],
    'tags': [
      {
        'id_tag': 5,
        'tagName': 'vegan',
      },
      {
        'id_tag': 9,
        'tagName': 'carrot',
      },
    ],
    'avatar': 'https://tastierblobstorage.blob.core.windows.net/images/mata.png',
    'total_Calories': null,
  };
  return (
    <BaseLayout>
      <CustomCard data={recipe} />
    </BaseLayout>
  );
};

export default RecipeScreen;

