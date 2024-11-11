export type Food = {
  name: string
  servingSize: string
  protein: string
  calories: string
  carbs: string
}

export const foods = [
  // Chicken Breast - 100g serving
  { name: 'Chicken Breast', servingSize: '100', protein: '31', calories: '165', carbs: '0' },

  // Almonds - 28g serving (about a small handful)
  {
    name: 'Almonds',
    servingSize: '28',
    protein: '6',
    calories: '164',
    carbs: '6'
  },

  // Broccoli - 85g serving (about 1 cup chopped, raw)
  {
    name: 'Broccoli',
    servingSize: '85',
    protein: '2.5',
    calories: '31',
    carbs: '6'
  },

  // Salmon - 113g serving (typical fillet)
  { name: 'Salmon', servingSize: '113', protein: '23', calories: '206', carbs: '0' },

  // Eggs - 50g serving (1 large egg)
  {
    name: 'Eggs',
    servingSize: '50',
    protein: '6.3',
    calories: '72',
    carbs: '0.36'
  },

  // Quinoa - 185g serving (about 1 cup cooked)
  {
    name: 'Quinoa',
    servingSize: '185',
    protein: '8.1',
    calories: '222',
    carbs: '39.4'
  },

  // Tofu - 85g serving
  { name: 'Tofu', servingSize: '85', protein: '7.2', calories: '64', carbs: '2.3' },

  // Beef (lean) - 113g serving
  { name: 'Beef', servingSize: '113', protein: '30.6', calories: '250', carbs: '0' },

  // Lentils - 198g serving (about 1 cup cooked)
  {
    name: 'Lentils',
    servingSize: '200',
    protein: '17.9',
    calories: '230',
    carbs: '40'
  },

  // Greek Yogurt - 170g serving (about 3/4 cup)
  {
    name: 'Greek Yogurt',
    servingSize: '170',
    protein: '17.3 ',
    calories: '100 ',
    carbs: '6.1'
  },

  // Milk - A standard serving size of milk is about 240ml (~240 grams, equivalent to about 1 cup)
  {
    name: 'Milk (whole)',
    servingSize: '240',
    protein: '7.9 ',
    calories: '149',
    carbs: '12.3'
  },

  // Cheese (Cheddar) - A typical serving size is about 28 grams (~1 oz)
  {
    name: 'Cheese',
    servingSize: '28',
    protein: '7 ',
    calories: '113',
    carbs: '<1'
  }
]
