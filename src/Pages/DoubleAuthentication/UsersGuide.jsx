import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Step1 from '../../Components/UsersGuide/Step1';
import Step2 from '../../Components/UsersGuide/Step2';
import Step3 from '../../Components/UsersGuide/Step3';
import '../../Styles/Authentification/UsersGuide/Card.css'; 

export default function UsersGuide() {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = React.useState(1);

    const handleNext = () => {
        setCurrentStep(prevStep => (prevStep < 3 ? prevStep + 1 : 3));
    };

    const handlePrevious = () => {
        setCurrentStep(prevStep => (prevStep > 1 ? prevStep - 1 : 1));
    };

    const gettingStarted = () => {
        navigate('/scanqrcode');
    };

    return (
        <div className="users-guide-container">
            <div className={`step ${currentStep === 1 ? 'active' : 'inactive'}`}>
                <Step1 currentStep={currentStep === 1} handleNext={handleNext} handlePrevious={handlePrevious} gettingStarted={gettingStarted} />
            </div>
            <div className={`step ${currentStep === 2 ? 'active' : 'inactive'}`}>
                <Step2 currentStep={currentStep === 2} handleNext={handleNext} handlePrevious={handlePrevious} gettingStarted={gettingStarted} />
            </div>
            <div className={`step ${currentStep === 3 ? 'active' : 'inactive'}`}>
                <Step3 currentStep={currentStep === 3} handleNext={handleNext} handlePrevious={handlePrevious} gettingStarted={gettingStarted} />
            </div>
        </div>
    );
}
