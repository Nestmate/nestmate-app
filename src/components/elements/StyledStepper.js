import { Stepper, StepperProps } from '@mantine/core';

export const StyledStepper = (StepperProps) => {
    return (
      <Stepper
        styles={{
          stepBody: {
            display: 'none',
          }
        }}
        {...StepperProps}
      />
    );
}