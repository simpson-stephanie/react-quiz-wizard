import { IStepperContext, StepperProps } from '../utility';
import React, { useContext, createContext, useState } from 'react';
import { useQuiz } from './quiz';

export const StepperContext = createContext<IStepperContext | undefined>(
  undefined
);

const Stepper = ({ children, onFinish }: StepperProps) => {
  const childrenArray = React.Children.toArray(children);
  const [step, setStep] = useState(0);
  const { state } = useQuiz();

  const isLastStep = step === childrenArray.length - 1;

  const currentChild = childrenArray[step];

  const handleNext = () => {
    if (isLastStep) {
      onFinish();
    } else {
      setStep((s) => s + 1);
    }
  };
  const goToStep = (index: number) => {
    setStep(() => index);
  };

  const handleBack = () => {
    setStep((s) => s - 1);
  };

  const isCompleted = (questionId: number) => {
    return (
      state.userInputs?.findIndex((ui) => ui.questionId === questionId) > -1
    );
  };

  return (
    <StepperContext.Provider
      value={{
        step,
        handleNext,
        goToStep,
        handleBack,
        isLastStep,
      }}
    >
      {state.questions.length > 0 && (
        <div className='stepper-container'>
          {state.questions.map((q, i) => {
            const isStepDone = isCompleted(q.questionId);
            return (
              <div
                key={q.questionId}
                className={`stepper-item ${isStepDone ? 'completed' : ''} ${
                  step === i ? 'active' : ''
                }`}
              >
                <button
                  className='step-counter'
                  onClick={() => i !== step && setStep(i)}
                >
                  {isStepDone ? '✔' : i + 1}
                </button>
              </div>
            );
          })}
        </div>
      )}
      {currentChild}
    </StepperContext.Provider>
  );
};

export const useStepper = (): IStepperContext => {
  const context = useContext(StepperContext);
  if (!context) {
    throw new Error('useStepper must be used within a <Stepper> component.');
  }
  return context;
};

export default Stepper;
