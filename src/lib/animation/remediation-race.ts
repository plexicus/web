export const animateRemediationRace = ({
  animationRef,
  remediationSteps,
  setAnimationStep,
  setPlexicusTime,
  setTraditionalTime,
  totalTraditionalTime,
  totalPlexicusTime,
}: {
  animationRef: React.RefObject<number | null>;
  remediationSteps: { name: string; traditionalTime: number; plexicusTime: number }[];
  setAnimationStep: React.Dispatch<React.SetStateAction<number>>;
  setPlexicusTime: React.Dispatch<React.SetStateAction<number>>;
  setTraditionalTime: React.Dispatch<React.SetStateAction<number>>;
  totalTraditionalTime: number;
  totalPlexicusTime: number;
}) => {
  /**
   * Variables
   */
  let currentStep = 0;
  let traditionalCounter = 0;
  let plexicusCounter = 0;
  let lastTimestamp = 0;
  let animationFrameId: number;

  setTraditionalTime(0);
  setPlexicusTime(0);
  setAnimationStep(0);

  const animate = (timestamp: number) => {
    // Update at most 20 times per second (50ms)
    if (timestamp - lastTimestamp >= 50) {
      lastTimestamp = timestamp;
      // Incrementing state values
      if (traditionalCounter < totalTraditionalTime) {
        traditionalCounter += 1;
        setTraditionalTime(traditionalCounter);
      }

      if (plexicusCounter < totalPlexicusTime) {
        plexicusCounter += 1;
        setPlexicusTime(plexicusCounter);
      }

      // Determine the step based on time
      let traditionalStepTime = 0;
      let plexicusStepTime = 0;
      let newStep = 0;

      for (let i = 0; i < remediationSteps.length; i++) {
        traditionalStepTime += remediationSteps[i].traditionalTime;
        plexicusStepTime += remediationSteps[i].plexicusTime;

        if (traditionalCounter <= traditionalStepTime || plexicusCounter <= plexicusStepTime) {
          newStep = i;
          break;
        }
      }

      // Update step if changed
      if (newStep !== currentStep) {
        currentStep = newStep;
        setAnimationStep(currentStep);
      }

      // Stop animation when both counters reach the end
      if (traditionalCounter >= totalTraditionalTime && plexicusCounter >= totalPlexicusTime) {
        cancelAnimationFrame(animationFrameId);

        // Restart animation after a delay
        setTimeout(() => {
          animateRemediationRace({
            animationRef,
            remediationSteps,
            setAnimationStep,
            setPlexicusTime,
            setTraditionalTime,
            totalTraditionalTime,
            totalPlexicusTime,
          });
        }, 5000);

        return;
      }
    }

    // Continue animation
    animationFrameId = requestAnimationFrame(animate);
  };

  animationFrameId = requestAnimationFrame(animate);

  // Store the ID for cleanup
  animationRef.current = animationFrameId;
};
