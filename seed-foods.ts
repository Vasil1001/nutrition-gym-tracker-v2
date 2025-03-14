import { Food } from './lib/types'

export const defaultFoods: Omit<Food, 'id' | 'user_id'>[] = [
  {
    name: 'White Rice',
    serving_size: '100g',
    protein: 2.66,
    calories: 129,
    carbs: 27.9
  },
  {
    name: 'Pasta',
    serving_size: '100g',
    protein: 5,
    calories: 131,
    carbs: 25
  },
  {
    name: 'Protein Shake',
    serving_size: '30g',
    protein: 19,
    calories: 120,
    carbs: 3
  },
  {
    name: 'Chicken Breast',
    serving_size: '100g',
    protein: 31,
    calories: 165,
    carbs: 0
  },
  {
    name: 'Salmon',
    serving_size: '113g',
    protein: 23,
    calories: 206,
    carbs: 0
  },
  {
    name: 'Beef',
    serving_size: '113g',
    protein: 30.6,
    calories: 250,
    carbs: 0
  },
  {
    name: 'Sweet Potato',
    serving_size: '100g',
    protein: 1.6,
    calories: 86,
    carbs: 20.1
  },
  {
    name: 'Broccoli',
    serving_size: '85g',
    protein: 2.5,
    calories: 31,
    carbs: 6
  },
  {
    name: 'Eggs',
    serving_size: '50g',
    protein: 6.3,
    calories: 72,
    carbs: 0.36
  },
  {
    name: 'Lentils',
    serving_size: '200g',
    protein: 17.9,
    calories: 230,
    carbs: 40
  },
  {
    name: 'Greek Yogurt',
    serving_size: '170g',
    protein: 17.3,
    calories: 100,
    carbs: 6.1
  },
  {
    name: 'Milk',
    serving_size: '240g',
    protein: 7.9,
    calories: 149,
    carbs: 12.3
  },
  {
    name: 'Almonds',
    serving_size: '28g',
    protein: 6,
    calories: 164,
    carbs: 6
  },
  {
    name: 'Hazelnuts',
    serving_size: '30g',
    protein: 4.4,
    calories: 188,
    carbs: 5
  },
  {
    name: 'Cheese',
    serving_size: '28g',
    protein: 7,
    calories: 113,
    carbs: 0.5
  },
  {
    name: 'Banana',
    serving_size: '100g',
    protein: 1.1,
    calories: 89,
    carbs: 22.8
  },
  {
    name: 'Chicken Pasta',
    serving_size: '100g',
    protein: 46,
    calories: 675,
    carbs: 72
  },
  {
    name: 'Quinoa',
    serving_size: '185g',
    protein: 8.1,
    calories: 222,
    carbs: 39.4
  },
  {
    name: 'Tofu',
    serving_size: '85g',
    protein: 7.2,
    calories: 64,
    carbs: 2.3
  }
]
