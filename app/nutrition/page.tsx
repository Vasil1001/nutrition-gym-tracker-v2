import { CardTitle, CardDescription, CardContent, Card } from '@/components/ui/card'

export default function Page() {
  const foods = [
    { name: 'Chicken Breast', servingSize: '100g', protein: '31g', calories: '165' },
    { name: 'Almonds', servingSize: '25g', protein: '21g', calories: '576' },
    { name: 'Broccoli', servingSize: '350g', protein: '2.8g', calories: '55' },
    { name: 'Salmon', servingSize: '53g', protein: '20g', calories: '206' },
    { name: 'Eggs', servingSize: '53g', protein: '13g', calories: '155' },
    { name: 'Quinoa', servingSize: '100g', protein: '4.4g', calories: '120' },
    { name: 'Tofu', servingSize: '100g', protein: '8g', calories: '144' },
    { name: 'Beef', servingSize: '100g', protein: '26g', calories: '250' },
    { name: 'Lentils', servingSize: '100g', protein: '9g', calories: '116' },
    { name: 'Greek Yogurt', servingSize: '100g', protein: '10g', calories: '59' },
    { name: 'Milk', servingSize: '100g', protein: '3.4g', calories: '42' },
    { name: 'Cheese', servingSize: '100g', protein: '25g', calories: '402' }
  ]
  return (
    <div className=" grid h-screen grid-cols-[2fr_1fr] gap-4">
      <div className="overflow-auto">
        <h1 className="mb-4 mt-6 text-2xl font-bold">Food List</h1>
        <div className="grid grid-cols-3 gap-4">
          {foods.map((food) => (
            <Card className="" key={food.name}>
              <CardContent className="gap-4 p-3 text-base">
                <div>
                  <CardTitle className="">{food.name}</CardTitle>
                  <CardDescription>
                    <div className="mb-3 mt-0.5 text-[0.78rem] text-muted-foreground">
                      Per {food.servingSize} serving
                    </div>
                  </CardDescription>
                </div>
                <div>
                  <div className="text-[0.90rem] ">Protein {food.protein}</div>
                  {food.protein}
                </div>
                <div className="flex items-center justify-center gap-4">
                  <div className="flex flex-col  items-center text-[0.90rem] ">
                    <div className="text-[0.70rem] uppercase text-muted-foreground">Protein </div>
                    {food.protein}
                  </div>
                  <div className="flex flex-col  items-center text-[0.90rem] ">
                    <div className="text-[0.70rem] uppercase text-muted-foreground">Calories </div>
                    {food.calories}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div className="border-l pl-4">
        <h1 className="mb-4 mt-6 text-2xl font-bold">Total Daily Intake</h1>
        <div className="mb-2 grid gap-4">
          {foods.map((food) => (
            <Card key={food.name}>
              <CardContent className="flex items-center justify-between p-2 text-sm">
                <div>
                  <CardTitle>x2 {food.name}</CardTitle>
                </div>
                <div className="text-lg font-bold">{food.protein} Protein</div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="border-t pt-4">
          <h2 className="mb-2 text-xl font-bold">Total Protein</h2>
          <p className="text-lg">52g</p>
        </div>
      </div>
    </div>
  )
}
