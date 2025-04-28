'use client';

import { useEffect, useState, useRef } from 'react';

export default function RemediationRace() {
  const [animationStep, setAnimationStep] = useState(0);
  const [traditionalTime, setTraditionalTime] = useState(0);
  const [plexicusTime, setPlexicusTime] = useState(0);
  const animationRef = useRef<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const [hourlyRate, setHourlyRate] = useState(50);
  const [selectedPlan, setSelectedPlan] = useState({ id: 'professional', name: 'Professional', price: 8 });
  const [vulnerabilityCount, setVulnerabilityCount] = useState(10);

  // Actualizar los tiempos de los pasos de remediación
  const remediationSteps = [
    { name: 'Initial Detection', traditionalTime: 35, plexicusTime: 5 },
    { name: 'Triage', traditionalTime: 45, plexicusTime: 5 },
    { name: 'Analysis', traditionalTime: 45, plexicusTime: 3 },
    { name: 'Fix Development', traditionalTime: 175, plexicusTime: 10 },
    // Testing eliminado
  ];

  // Calcular el tiempo total
  const totalTraditionalTime = remediationSteps.reduce((acc, step) => acc + step.traditionalTime, 0);
  const totalPlexicusTime = remediationSteps.reduce((acc, step) => acc + step.plexicusTime, 0);

  // Función para iniciar la animación
  const startAnimation = () => {
    // Reiniciar los contadores
    setTraditionalTime(0);
    setPlexicusTime(0);
    setAnimationStep(0);

    // Iniciar la secuencia de animación
    let currentStep = 0;
    let traditionalCounter = 0;
    let plexicusCounter = 0;

    let lastTimestamp = 0;
    let animationFrameId: number;

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
            startAnimation();
          }, 5000);

          return;
        }
      }

      // Continue animation
      animationFrameId = requestAnimationFrame(animate);
    };

    // Start the animation
    animationFrameId = requestAnimationFrame(animate);

    // Store the ID for cleanup
    animationRef.current = animationFrameId;
  };

  // Observador de intersección para iniciar la animación cuando la sección sea visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.3 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Iniciar o detener la animación basado en la visibilidad
  useEffect(() => {
    if (isVisible && !hasAnimated) {
      setHasAnimated(true);
      startAnimation();
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [isVisible,hasAnimated]);

  // Modificar la función formatTime para mostrar todo en minutos
  const formatTime = (minutes: number) => {
    return `${minutes}min`;
  };

  // Calcular el progreso para cada paso
  const getStepProgress = (stepIndex: number, isTraditional: boolean) => {
    const currentTime = isTraditional ? traditionalTime : plexicusTime;
    const steps = remediationSteps;

    let timeBeforeStep = 0;
    for (let i = 0; i < stepIndex; i++) {
      timeBeforeStep += isTraditional ? steps[i].traditionalTime : steps[i].plexicusTime;
    }

    const stepTime = isTraditional ? steps[stepIndex].traditionalTime : steps[stepIndex].plexicusTime;
    const stepProgress = Math.min(100, Math.max(0, ((currentTime - timeBeforeStep) / stepTime) * 100));

    return stepProgress;
  };

  // Verificar si un paso está activo
  const isStepActive = (stepIndex: number, isTraditional: boolean) => {
    const currentTime = isTraditional ? traditionalTime : plexicusTime;
    const steps = remediationSteps;

    let timeBeforeStep = 0;
    for (let i = 0; i < stepIndex; i++) {
      timeBeforeStep += isTraditional ? steps[i].traditionalTime : steps[i].plexicusTime;
    }

    const stepTime = isTraditional ? steps[stepIndex].traditionalTime : steps[stepIndex].plexicusTime;

    return currentTime >= timeBeforeStep && currentTime <= timeBeforeStep + stepTime;
  };

  // Verificar si un paso está completado
  const isStepCompleted = (stepIndex: number, isTraditional: boolean) => {
    const currentTime = isTraditional ? traditionalTime : plexicusTime;
    const steps = remediationSteps;

    let timeBeforeStep = 0;
    for (let i = 0; i <= stepIndex; i++) {
      timeBeforeStep += isTraditional ? steps[i].traditionalTime : steps[i].plexicusTime;
    }

    return currentTime >= timeBeforeStep;
  };

  const calculateTraditionalCost = () => {
    // Calculate the time total in minutes for a single vulnerability
    const totalTimeMinutes = remediationSteps.reduce((acc, step) => acc + step.traditionalTime, 0);

    // Convert to hours
    const totalTimeHours = totalTimeMinutes / 60;

    // Calculate the cost (using the hourly rate)
    return Math.round(totalTimeHours * hourlyRate);
  };

  const calculatePlexicusCost = () => {
    // Fixed price of $10 per vulnerability with Plexicus
    return 10;
  };

  const calculateSavingsPercentage = () => {
    const traditionalCost = calculateTraditionalCost();
    const plexicusCost = calculatePlexicusCost();

    if (traditionalCost <= 0) return 0;

    // Cálculo básico del porcentaje de ahorro
    let percentage = ((traditionalCost - plexicusCost) / traditionalCost) * 100;

    // Para grandes cantidades de vulnerabilidades, AUMENTAMOS el porcentaje de ahorro
    // ya que Plexicus se vuelve más eficiente a escala
    if (vulnerabilityCount > 50) {
      // Factor de aumento basado en la cantidad de vulnerabilidades
      // Máximo aumento del 10% para cantidades muy grandes
      const scaleFactor = Math.min(0.1, (vulnerabilityCount - 50) / 500);
      percentage = Math.min(99, percentage * (1 + scaleFactor));
    }

    return Math.round(percentage);
  };

  return (
    <section ref={sectionRef} className="py-16 bg-white" id="remediation-race">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Vulnerability Remediation Race
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            See how Plexicus dramatically accelerates the vulnerability remediation process compared to traditional
            methods
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          { /* Traditional Method */ }
          <div className="bg-white rounded-xl shadow-md overflow-hidden" style={{ minHeight: '590px' }}>
            <div className="bg-gray-800 text-white p-4">
              <h3 className="text-xl font-bold">Traditional Method</h3>
              <div className="flex items-center justify-between mt-2">
                <div className="text-sm text-gray-300">Time elapsed</div>
                <div className="text-2xl font-mono font-bold flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  { formatTime(traditionalTime) }
                </div>
              </div>
              <div className="w-full bg-gray-600 h-2 mt-2 rounded-full overflow-hidden">
                <div
                  className="bg-red-500 h-full transition-all duration-300 ease-out"
                  style={{ width: `${(traditionalTime / totalTraditionalTime) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="p-4">
              { remediationSteps.map((step, index) => (
                <div key={`trad-${index}`} className="mb-4 last:mb-0">
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                          isStepCompleted(index, true)
                            ? 'bg-green-100 text-green-600'
                            : isStepActive(index, true)
                              ? 'bg-yellow-100 text-yellow-600 animate-pulse'
                              : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        { isStepCompleted(index, true) ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        ) : (
                          index + 1
                        ) }
                      </div>
                      <span
                        className={`font-medium ${
                          isStepActive(index, true)
                            ? 'text-gray-900'
                            : isStepCompleted(index, true)
                              ? 'text-gray-700'
                              : 'text-gray-400'
                        }`}
                      >
                        { step.name }
                      </span>
                    </div>
                    <span
                      className={`text-sm font-mono ${
                        isStepCompleted(index, true)
                          ? 'text-green-600'
                          : isStepActive(index, true)
                            ? 'text-yellow-600'
                            : 'text-gray-400'
                      }`}
                    >
                      { formatTime(step.traditionalTime) }
                    </span>
                  </div>

                  { /* Step visualization */ }
                  <div className="ml-11 mt-2 mb-4">
                    { isStepActive(index, true) && (
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 animate-fadeIn">
                        { index === 0 && (
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-red-500"
                              >
                                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 4 21h16a2 2 0 0 1.73-3Z"></path>
                                <line x1="12" y1="9" x2="12" y2="13"></line>
                                <line x1="12" y1="17" x2="12.01" y2="17"></line>
                              </svg>
                            </div>
                            <div className="text-sm">
                              <div className="font-medium">Vulnerability detected</div>
                              <div className="text-gray-500">Manual scanning process</div>
                            </div>
                          </div>
                        ) }

                        { index === 1 && (
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-yellow-500"
                              >
                                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                                <polyline points="14 2 14 8 20 8"></polyline>
                                <line x1="16" y1="13" x2="8" y2="13"></line>
                                <line x1="16" y1="17" x2="8" y2="17"></line>
                                <line x1="10" y1="9" x2="8" y2="9"></line>
                              </svg>
                            </div>
                            <div className="text-sm">
                              <div className="font-medium">Manual prioritization</div>
                              <div className="text-gray-500">Waiting for security team review</div>
                            </div>
                          </div>
                        ) }

                        { index === 2 && (
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-blue-500"
                              >
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="16" x2="12" y2="12"></line>
                                <line x1="12" y1="8" x2="12.01" y2="8"></line>
                              </svg>
                            </div>
                            <div className="text-sm">
                              <div className="font-medium">Expert analysis required</div>
                              <div className="text-gray-500">Security team investigating root cause</div>
                            </div>
                          </div>
                        ) }

                        { index === 3 && (
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-indigo-500"
                              >
                                <path d="m18 16 4-4-4-4"></path>
                                <path d="m6 8-4 4 4 4"></path>
                                <path d="m14.5 4-5 16"></path>
                              </svg>
                            </div>
                            <div className="text-sm">
                              <div className="font-medium">Manual code fixes</div>
                              <div className="text-gray-500">Developer writing and reviewing patches</div>
                            </div>
                          </div>
                        ) }
                      </div>
                    ) }
                  </div>

                  <div className="ml-11">
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ease-out ${
                          isStepCompleted(index, true)
                            ? 'bg-green-500'
                            : isStepActive(index, true)
                              ? 'bg-yellow-500'
                              : 'bg-gray-200'
                        }`}
                        style={{
                          width: `${isStepActive(index, true) ? getStepProgress(index, true) : isStepCompleted(index, true) ? 100 : 0}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              )) }
            </div>
          </div>

          { /* Plexicus Method */ }
          <div className="bg-white rounded-xl shadow-md overflow-hidden" style={{ minHeight: '590px' }}>
            <div className="bg-[#8220ff] text-white p-4">
              <h3 className="text-xl font-bold">plexicus</h3>
              <div className="flex items-center justify-between mt-2">
                <div className="text-sm text-white/80">Time elapsed</div>
                <div className="text-2xl font-mono font-bold flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  { formatTime(plexicusTime) }
                </div>
              </div>
              <div className="w-full bg-[#8220ff]/40 h-2 mt-2 rounded-full overflow-hidden">
                <div
                  className="bg-green-400 h-full transition-all duration-300 ease-out"
                  style={{ width: `${(plexicusTime / totalPlexicusTime) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="p-4">
              { remediationSteps.map((step, index) => (
                <div key={`plex-${index}`} className="mb-4 last:mb-0">
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                          isStepCompleted(index, false)
                            ? 'bg-green-100 text-green-600'
                            : isStepActive(index, false)
                              ? 'bg-[#8220ff]/10 text-[#8220ff] animate-pulse'
                              : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        { isStepCompleted(index, false) ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        ) : (
                          index + 1
                        ) }
                      </div>
                      <span
                        className={`font-medium ${
                          isStepActive(index, false)
                            ? 'text-gray-900'
                            : isStepCompleted(index, false)
                              ? 'text-gray-700'
                              : 'text-gray-400'
                        }`}
                      >
                        { step.name }
                      </span>
                    </div>
                    <span
                      className={`text-sm font-mono ${
                        isStepCompleted(index, false)
                          ? 'text-green-600'
                          : isStepActive(index, false)
                            ? 'text-[#8220ff]'
                            : 'text-gray-400'
                      }`}
                    >
                      { formatTime(step.plexicusTime) }
                    </span>
                  </div>

                  { /* Step visualization */ }
                  <div className="ml-11 mt-2 mb-4">
                    { isStepActive(index, false) && (
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 animate-fadeIn">
                        { index === 0 && (
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-[#8220ff]/10 rounded-full flex items-center justify-center mr-3">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-[#8220ff]"
                              >
                                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 4 21h16a2 2 0 0 1.73-3Z"></path>
                                <line x1="12" y1="9" x2="12" y2="13"></line>
                                <line x1="12" y1="17" x2="12.01" y2="17"></line>
                              </svg>
                            </div>
                            <div className="text-sm">
                              <div className="font-medium">AI-powered detection</div>
                              <div className="text-gray-500">Continuous automated scanning</div>
                            </div>
                          </div>
                        ) }

                        { index === 1 && (
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-[#8220ff]/10 rounded-full flex items-center justify-center mr-3">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-[#8220ff]"
                              >
                                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                                <polyline points="14 2 14 8 20 8"></polyline>
                                <line x1="16" y1="13" x2="8" y2="13"></line>
                                <line x1="16" y1="17" x2="8" y2="17"></line>
                                <line x1="10" y1="9" x2="8" y2="9"></line>
                              </svg>
                            </div>
                            <div className="text-sm">
                              <div className="font-medium">Automated prioritization</div>
                              <div className="text-gray-500">AI-based risk assessment</div>
                            </div>
                          </div>
                        ) }

                        { index === 2 && (
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-[#8220ff]/10 rounded-full flex items-center justify-center mr-3">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-[#8220ff]"
                              >
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="16" x2="12" y2="12"></line>
                                <line x1="12" y1="8" x2="12.01" y2="8"></line>
                              </svg>
                            </div>
                            <div className="text-sm">
                              <div className="font-medium">AI-powered analysis</div>
                              <div className="text-gray-500">Automated root cause identification</div>
                            </div>
                          </div>
                        ) }

                        { index === 3 && (
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-[#8220ff]/10 rounded-full flex items-center justify-center mr-3">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-[#8220ff]"
                              >
                                <path d="m18 16 4-4-4-4"></path>
                                <path d="m6 8-4 4 4 4"></path>
                                <path d="m14.5 4-5 16"></path>
                              </svg>
                            </div>
                            <div className="text-sm">
                              <div className="font-medium">AI-generated fixes</div>
                              <div className="text-gray-500">Automated code remediation</div>
                            </div>
                          </div>
                        ) }

                        { index === 4 && (
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-[#8220ff]/10 rounded-full flex items-center justify-center mr-3">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-[#8220ff]"
                              >
                                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                              </svg>
                            </div>
                            <div className="text-sm">
                              <div className="font-medium">QA testing</div>
                              <div className="text-gray-500">Manual verification of fixes</div>
                            </div>
                          </div>
                        ) }
                      </div>
                    ) }
                  </div>

                  <div className="ml-11">
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ease-out ${
                          isStepCompleted(index, false)
                            ? 'bg-green-500'
                            : isStepActive(index, false)
                              ? 'bg-[#8220ff]'
                              : 'bg-gray-200'
                        }`}
                        style={{
                          width: `${isStepActive(index, false) ? getStepProgress(index, false) : isStepCompleted(index, false) ? 100 : 0}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              )) }
            </div>
          </div>
        </div>

        { /* Cost Calculator - Interactive Version */ }
        <div className="mt-12 max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                { /* Left Column - Form */ }
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">See how much you can save with Plexicus</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Enter your details below to calculate potential savings
                    </p>
                  </div>

                  { /* Form Inputs */ }
                  <div className="space-y-4 bg-gray-50 p-6 rounded-lg border border-gray-100">
                    { /* Developer Rate Input */ }
                    <div>
                      <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700 mb-1">
                        Developer Hourly Rate ($)
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input
                          type="number"
                          name="hourlyRate"
                          id="hourlyRate"
                          className="block w-full rounded-md border-gray-300 pl-7 pr-12 py-2 text-gray-900 focus:border-[#8220ff] focus:ring-[#8220ff]"
                          placeholder="0.00"
                          defaultValue="50"
                          min="1"
                          onChange={(e) => {
                            const rate = Number.parseFloat(e.target.value) || 50;
                            setHourlyRate(rate);
                          }}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <span className="text-gray-500 sm:text-sm">/hr</span>
                        </div>
                      </div>
                    </div>

                    { /* Vulnerability Count Input */ }
                    <div>
                      <label htmlFor="vulnCount" className="block text-sm font-medium text-gray-700 mb-1">
                        Number of Vulnerabilities
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        <input
                          type="number"
                          name="vulnCount"
                          id="vulnCount"
                          className="block w-full rounded-md border-gray-300 pr-12 py-2 text-gray-900 focus:border-[#8220ff] focus:ring-[#8220ff]"
                          placeholder="10"
                          defaultValue="10"
                          min="1"
                          onChange={(e) => {
                            const count = Number.parseInt(e.target.value) || 10;
                            setVulnerabilityCount(count);
                          }}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <span className="text-gray-500 sm:text-sm">vulns</span>
                        </div>
                      </div>
                    </div>

                    { /* Summary Stats */ }
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <div className="text-sm text-gray-500">Traditional Cost</div>
                          <div className="text-2xl font-bold text-gray-900">
                            ${ (calculateTraditionalCost() * vulnerabilityCount).toLocaleString() }
                          </div>
                        </div>
                        <div className="bg-[#8220ff]/5 p-4 rounded-lg border border-[#8220ff]/20">
                          <div className="text-sm text-[#8220ff]">Plexicus Cost</div>
                          <div className="text-2xl font-bold text-[#8220ff]">
                            ${ (calculatePlexicusCost() * vulnerabilityCount).toLocaleString() }
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 bg-gradient-to-r from-[#8220ff]/10 to-[#8220ff]/20 p-4 rounded-lg border border-[#8220ff]/20">
                        <div className="flex justify-between items-center">
                          <div className="text-sm font-medium text-[#8220ff]">Total Savings</div>
                          <div className="text-xl font-bold text-[#8220ff]">
                            $
                            { (
                              (calculateTraditionalCost() - calculatePlexicusCost()) *
                              vulnerabilityCount
                            ).toLocaleString() }
                          </div>
                        </div>
                        <div className="mt-2 w-full bg-white/50 h-2 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#8220ff]"
                            style={{ width: `${calculateSavingsPercentage()}%` }}
                          ></div>
                        </div>
                        <div className="mt-1 text-right text-sm font-medium text-[#8220ff]">
                          { calculateSavingsPercentage() }% saved
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                { /* Right Column - Excel Visualization */ }
                <div className="relative">
                  { /* Spreadsheet illustration - savings calculator */ }
                  <div className="relative shadow-xl w-full h-full">
                    <div className="w-full h-full bg-white rounded-lg border border-gray-200 flex flex-col overflow-hidden">
                      { /* Mac-style window header */ }
                      <div className="h-8 bg-gray-100 border-b border-gray-200 flex items-center px-3">
                        <div className="flex space-x-2 mr-4">
                          <div className="w-3 h-3 rounded-full bg-red-400 hover:bg-red-500 transition-colors"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-400 hover:bg-yellow-500 transition-colors"></div>
                          <div className="w-3 h-3 rounded-full bg-green-400 hover:bg-green-500 transition-colors"></div>
                        </div>
                        <div className="flex-1 text-center text-xs font-medium text-gray-500">
                          Plexicus Savings Calculator.xlsx
                        </div>
                      </div>

                      { /* Excel-like menu bar */ }
                      <div className="h-7 bg-[#217346] text-white text-xs flex items-center px-2 border-b border-[#185a34]">
                        <div className="flex space-x-3">
                          <span className="hover:bg-[#185a34] px-2 py-1 rounded">File</span>
                          <span className="hover:bg-[#185a34] px-2 py-1 rounded">Home</span>
                          <span className="hover:bg-[#185a34] px-2 py-1 rounded">Insert</span>
                          <span className="hover:bg-[#185a34] px-2 py-1 rounded">Data</span>
                          <span className="hover:bg-[#185a34] px-2 py-1 rounded">View</span>
                        </div>
                      </div>

                      { /* Spreadsheet header */ }
                      <div className="h-10 bg-[#8220ff] text-white p-2 flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2"
                        >
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="3" y1="9" x2="21" y2="9"></line>
                          <line x1="3" y1="15" x2="21" y2="15"></line>
                          <line x1="9" y1="3" x2="9" y2="21"></line>
                          <line x1="15" y1="3" x2="15" y2="21"></line>
                        </svg>
                        <div className="text-sm font-bold">Plexicus Savings Calculator</div>
                      </div>

                      { /* Excel-like formula bar */ }
                      <div className="h-7 bg-gray-50 border-b border-gray-200 flex items-center px-2 text-xs">
                        <div className="w-10 text-gray-500 mr-1">fx</div>
                        <div className="flex-1 bg-white border border-gray-300 rounded px-2 py-0.5 text-gray-700 font-mono">
                          =SUM(Traditional-Plexicus)
                        </div>
                      </div>

                      { /* Column headers */ }
                      <div className="flex border-b border-gray-200 bg-gray-50 text-xs font-medium text-gray-700">
                        <div className="w-1/3 p-2 border-r border-gray-200">Item</div>
                        <div className="w-1/3 p-2 border-r border-gray-200 text-center">Traditional</div>
                        <div className="w-1/3 p-2 text-center">Plexicus</div>
                      </div>

                      { /* Spreadsheet rows */ }
                      <div className="flex-1 overflow-y-auto" style={{ minHeight: '300px' }}>
                        { /* Time row */ }
                        <div className="flex border-b border-gray-200 text-xs">
                          <div className="w-1/3 p-2 border-r border-gray-200 font-medium">Time (min)</div>
                          <div className="w-1/3 p-2 border-r border-gray-200 text-center">{ totalTraditionalTime }</div>
                          <div className="w-1/3 p-2 text-center text-[#8220ff] font-medium">{ totalPlexicusTime }</div>
                        </div>

                        { /* Cost per vuln row */ }
                        <div className="flex border-b border-gray-200 text-xs">
                          <div className="w-1/3 p-2 border-r border-gray-200 font-medium">Cost per vuln</div>
                          <div className="w-1/3 p-2 border-r border-gray-200 text-center">
                            ${ calculateTraditionalCost() }
                          </div>
                          <div className="w-1/3 p-2 text-center text-[#8220ff] font-medium">$10</div>
                        </div>

                        { /* Total vulns row */ }
                        <div className="flex border-b border-gray-200 text-xs bg-gray-50">
                          <div className="w-1/3 p-2 border-r border-gray-200 font-medium">Total vulns</div>
                          <div className="w-1/3 p-2 border-r border-gray-200 text-center">{ vulnerabilityCount }</div>
                          <div className="w-1/3 p-2 text-center">{ vulnerabilityCount }</div>
                        </div>

                        { /* Total cost row */ }
                        <div className="flex border-b border-gray-200 text-xs">
                          <div className="w-1/3 p-2 border-r border-gray-200 font-medium">Total cost</div>
                          <div className="w-1/3 p-2 border-r border-gray-200 text-center">
                            ${ (calculateTraditionalCost() * vulnerabilityCount).toLocaleString() }
                          </div>
                          <div className="w-1/3 p-2 text-center text-[#8220ff] font-medium">
                            ${ (calculatePlexicusCost() * vulnerabilityCount).toLocaleString() }
                          </div>
                        </div>

                        { /* Savings row */ }
                        <div className="flex border-b border-gray-200 text-xs bg-[#8220ff]/5">
                          <div className="w-1/3 p-2 border-r border-gray-200 font-bold">Savings</div>
                          <div className="w-2/3 p-2 text-center text-[#8220ff] font-bold" >
                            $
                            { (
                              (calculateTraditionalCost() - calculatePlexicusCost()) *
                              vulnerabilityCount
                            ).toLocaleString() }
                          </div>
                        </div>

                        { /* Percentage row */ }
                        <div className="flex text-xs bg-[#8220ff]/10">
                          <div className="w-1/3 p-2 border-r border-gray-200 font-bold">% Saved</div>
                          <div className="w-2/3 p-2 text-center text-[#8220ff] font-bold">
                            { calculateSavingsPercentage() }%
                          </div>
                        </div>

                        { /* Formula row */ }
                        <div className="flex border-t border-gray-300 text-xs bg-gray-50 mt-auto">
                          <div className="w-full p-2 font-mono text-gray-500 text-center">
                            { /* Empty formula row */ }
                          </div>
                        </div>
                      </div>

                      { /* Spreadsheet footer */ }
                      <div className="h-10 bg-[#8220ff]/80 text-white p-2 text-xs flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-green-400 mr-1"></div>
                          <span>Sheet1</span>
                          <span className="ml-2 px-1 bg-white/20 rounded text-white/90">Ready</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="15 18 9 12 15 6"></polyline>
                          </svg>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="9 18 15 12 9 6"></polyline>
                          </svg>
                          <span>100%</span>
                          <div className="ml-2 px-1 bg-white/20 rounded">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="10"
                              height="10"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                              <polyline points="15 3 21 3 21 9"></polyline>
                              <line x1="10" y1="14" x2="21" y2="3"></line>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
