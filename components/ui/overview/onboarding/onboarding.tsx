import React, { useState } from 'react';
import OnboardingModal from './onboarding-modal';
import Targets from './targets';

function Onboarding() {
  const [results, setResults] = useState({
    bmi: 0,
    calorieTarget: 0,
    proteinTarget: 0,
  });

  const handleSubmit = (data: any) => {
    const {
      weightKg,
      weightLbs,
      heightCm,
      activityLevel,
    } = data;
    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);

    let calorieMultiplier = 14;
    if (activityLevel === 'Sedentary') calorieMultiplier = 14;
    else if (activityLevel === 'Moderately Active') calorieMultiplier = 16;
    else if (activityLevel === 'Highly Active') calorieMultiplier = 18;

    // Use weight in lbs for calorieTarget calculation
    const calorieTarget = weightLbs * calorieMultiplier;
    // Use weight in kg for proteinTarget calculation
    const proteinTarget = weightKg * 1.6;

    setResults({ bmi, calorieTarget, proteinTarget });
  };

  return (
    <>
      {results.calorieTarget === 0 ? (
        <OnboardingModal onSubmit={handleSubmit} />
      ) : (
        <Targets results={results} />
      )}
    </>
  );
}

export default Onboarding;