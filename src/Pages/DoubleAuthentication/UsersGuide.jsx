import * as React from 'react';
import Step1 from '../../Components/UsersGuide/Step1';
import Step2 from '../../Components/UsersGuide/Step2';
import Step3 from '../../Components/UsersGuide/Step3';
import Button from '@mui/joy/Button';

export default function UsersGuide() {
  const [currentStep, setCurrentStep] = React.useState(1);

  const handleNext = () => {
    setCurrentStep(prevStep => (prevStep < 3 ? prevStep + 1 : 3));
  };

  const handlePrevious = () => {
    setCurrentStep(prevStep => (prevStep > 1 ? prevStep - 1 : 1));
  };

  return (
    <div>
      {currentStep === 1 && <Step1 />}
      {currentStep === 2 && <Step2 />}
      {currentStep === 3 && <Step3 />}

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
        <Button
          variant="outlined"
          color="neutral"
          onClick={handlePrevious}
          disabled={currentStep === 1}
        >
          Previous
        </Button>
        <Button
          variant="solid"
          color="primary"
          onClick={handleNext}
          disabled={currentStep === 3}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
