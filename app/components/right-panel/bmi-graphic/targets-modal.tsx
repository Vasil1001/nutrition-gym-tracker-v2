import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

type TargetsModalProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: any) => void
  savedData?: any
}

function TargetsModal({ isOpen, onOpenChange, onSubmit, savedData }: TargetsModalProps) {
  const [sex, setSex] = useState('')
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [unitSystem, setUnitSystem] = useState('metric') // 'metric' or 'imperial'
  const [activityLevel, setActivityLevel] = useState('')
  const [fitnessGoal, setFitnessGoal] = useState('')

  // Initialize form with saved data if available
  useEffect(() => {
    if (savedData) {
      if (savedData.sex) setSex(savedData.sex)
      if (savedData.unitSystem) setUnitSystem(savedData.unitSystem)

      // Set weight and height based on unit system
      if (savedData.unitSystem === 'imperial' && savedData.weightLbs) {
        setWeight(String(Math.round(savedData.weightLbs)))
      } else if (savedData.weightKg) {
        setWeight(String(Math.round(savedData.weightKg)))
      }

      if (savedData.unitSystem === 'imperial' && savedData.heightInches) {
        setHeight(String(Math.round(savedData.heightInches)))
      } else if (savedData.heightCm) {
        setHeight(String(Math.round(savedData.heightCm)))
      }

      if (savedData.activityLevel) setActivityLevel(savedData.activityLevel)
      if (savedData.fitnessGoal) setFitnessGoal(savedData.fitnessGoal)
    }
  }, [savedData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (sex && Number(weight) > 0 && Number(height) > 0 && activityLevel && fitnessGoal) {
      let weightKg = Number(weight)
      let heightCm = Number(height)
      let weightLbs = Number(weight)
      let heightInches = Number(height)

      if (unitSystem === 'imperial') {
        // Convert lbs to kg and inches to cm
        weightKg = weightLbs * 0.453592
        heightCm = heightInches * 2.54
      } else {
        // Convert kg to lbs and cm to inches
        weightLbs = weightKg / 0.453592
        heightInches = heightCm / 2.54
      }

      const data = {
        sex,
        weightKg,
        weightLbs,
        heightCm,
        heightInches,
        activityLevel,
        fitnessGoal,
        unitSystem
      }
      onSubmit(data)
    } else {
      alert('Please fill all fields with valid values.')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto py-6 sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">Set Your Targets</DialogTitle>
          <p className="text-center text-sm text-muted-foreground">
            Help us calculate your recommended daily targets
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-6 py-4">
          {/* Unit System Toggle */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Unit System</Label>
            <RadioGroup value={unitSystem} onValueChange={setUnitSystem} className="flex gap-2">
              <div
                className={`flex flex-1 cursor-pointer items-center justify-between rounded-md border p-2 text-sm transition-colors hover:bg-accent/50 ${
                  unitSystem === 'metric' ? 'border-primary/50 bg-primary/5' : 'border-border'
                }`}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="metric" id="metric" />
                  <Label htmlFor="metric" className="cursor-pointer">
                    Metric (kg & cm)
                  </Label>
                </div>
              </div>
              <div
                className={`flex flex-1 cursor-pointer items-center justify-between rounded-md border p-2 text-sm transition-colors hover:bg-accent/50 ${
                  unitSystem === 'imperial' ? 'border-primary/50 bg-primary/5' : 'border-border'
                }`}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="imperial" id="imperial" />
                  <Label htmlFor="imperial" className="cursor-pointer">
                    Imperial (lbs & inches)
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Sex selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Biological Sex</Label>
            <RadioGroup value={sex} onValueChange={setSex} className="flex gap-2">
              <div
                className={`flex flex-1 cursor-pointer items-center justify-between rounded-md border p-2 text-sm transition-colors hover:bg-accent/50 ${
                  sex === 'Male' ? 'border-primary/50 bg-primary/5' : 'border-border'
                }`}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Male" id="male" />
                  <Label htmlFor="male" className="cursor-pointer">
                    Male
                  </Label>
                </div>
              </div>
              <div
                className={`flex flex-1 cursor-pointer items-center justify-between rounded-md border p-2 text-sm transition-colors hover:bg-accent/50 ${
                  sex === 'Female' ? 'border-primary/50 bg-primary/5' : 'border-border'
                }`}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Female" id="female" />
                  <Label htmlFor="female" className="cursor-pointer">
                    Female
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Weight and height inputs */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="weight" className="text-sm font-medium">
                Weight ({unitSystem === 'metric' ? 'kg' : 'lbs'})
              </Label>
              <Input
                id="weight"
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                min="1"
                required
                className="rounded-md border border-[#30303b] bg-background/50 shadow-sm transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="height" className="text-sm font-medium">
                Height ({unitSystem === 'metric' ? 'cm' : 'inches'})
              </Label>
              <Input
                id="height"
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                min="1"
                required
                className="rounded-md border border-[#30303b] bg-background/50 shadow-sm transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          {/* Activity level selection */}
          <div className="space-y-3">
            <Label className="block text-sm font-medium">Activity Level</Label>
            <RadioGroup
              value={activityLevel}
              onValueChange={setActivityLevel}
              className="space-y-2">
              {[
                { value: 'Sedentary', desc: 'Little to no exercise' },
                { value: 'Moderately Active', desc: 'Regular exercise 3-5 days/week' },
                { value: 'Highly Active', desc: 'Intense exercise 6-7 days/week' }
              ].map((level) => (
                <div
                  key={level.value}
                  className={`flex cursor-pointer items-center rounded-md border p-2.5 transition-colors hover:bg-accent/50 ${
                    activityLevel === level.value
                      ? 'border-primary/50 bg-primary/5'
                      : 'border-border'
                  }`}>
                  <RadioGroupItem value={level.value} id={level.value} className="mr-3" />
                  <Label htmlFor={level.value} className="flex-1 cursor-pointer">
                    <div className="text-sm font-medium">{level.value}</div>
                    <div className="text-xs text-muted-foreground">{level.desc}</div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Fitness goal selection */}
          <div className="space-y-3">
            <Label className="block text-sm font-medium">Fitness Goal</Label>
            <RadioGroup
              value={fitnessGoal}
              onValueChange={setFitnessGoal}
              className="grid grid-cols-3 gap-2">
              {['Build Muscle', 'Lose Weight', 'Maintain'].map((goal) => (
                <div
                  key={goal}
                  className={`flex cursor-pointer flex-col items-center justify-center rounded-md border px-4 py-3 text-center transition-colors hover:bg-accent/50 ${
                    fitnessGoal === goal ? 'border-primary/50 bg-primary/5' : 'border-border'
                  }`}>
                  <RadioGroupItem value={goal} id={goal} className="sr-only" />
                  <Label htmlFor={goal} className="cursor-pointer text-sm">
                    {goal}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <Button type="submit" className="mt-6 w-full">
            Calculate Your Targets
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default TargetsModal
