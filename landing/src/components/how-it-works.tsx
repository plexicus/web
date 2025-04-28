'use client';

import { useEffect, useRef, useState } from 'react';

export default function HowItWorks() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const sectionRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const [codeAnimationState, setCodeAnimationState] = useState(0);
  const [showPullRequest, setShowPullRequest] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [typingText, setTypingText] = useState('');
  const [cursorPosition, setCursorPosition] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [hasClickedApprove, setHasClickedApprove] = useState(false);

  const [discoverStep, setDiscoverStep] = useState(0);
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });
  const [showVulnerability, setShowVulnerability] = useState(false);

  const [enrichStep, setEnrichStep] = useState(0);
  const [showComplianceInfo, setShowComplianceInfo] = useState(false);
  const [showSecurityDetails, setShowSecurityDetails] = useState(false);

  // Original and modified code
  const originalCode = `if(isset($_GET['id'])) {
   $id = $_GET['id'];
   $sql = "SELECT * FROM users WHERE id = $id";          
   $result = $conn->query($sql);
}`;

  const modifiedCode = `if(isset($_GET['id'])) {
   $id = mysqli_real_escape_string(
       $conn, $_GET['id']
   );
   $sql = "SELECT * FROM users WHERE id = '$id'";          
   $result = $conn->query($sql);
}`;

  // No scroll effect - only manual navigation
  useEffect(() => {
    // Initial setup - just to make sure the component renders properly
    if (sectionRef.current) {
      // Set initial scroll position for any styling that might depend on it
      setScrollPosition(0.5);
    }
    setIsMounted(true);
  }, []);

  // Añadir una animación de transición entre el robot y el humano
  // Modificar los estilos CSS para las animaciones
  useEffect(() => {
    if (!isMounted) return;

    // Añadir estilos CSS para asegurar que las animaciones funcionen correctamente
    const style = document.createElement('style');
    style.textContent = `
 @keyframes fadeIn {
   from { opacity: 0; }
   to { opacity: 1; }
 }
 .animate-fadeIn {
   animation-name: fadeIn;
   animation-duration: 0.5s;
   animation-fill-mode: forwards;
 }
 @keyframes typing {
   from { width: 0 }
   to { width: 100% }
 }
 .typing-animation {
   overflow: hidden;
   white-space: nowrap;
   animation: typing 3.5s steps(40, end);
 }
 @keyframes slideInFromLeft {
   from { transform: translateX(-100%); opacity: 0; }
   to { transform: translateX(0); opacity: 1; }
 }
 .slide-in-left {
   animation: slideInFromLeft 0.8s ease-out forwards;
 }
 @keyframes slideOutToLeft {
   from { transform: translateX(0); opacity: 1; }
   to { transform: translateX(-100%); opacity: 0; }
 }
 .slide-out-left {
   animation: slideOutToLeft 0.8s ease-out forwards;
 }
 @keyframes attention {
   0% { transform: scale(0.8); opacity: 0; }
   50% { transform: scale(1.1); }
   100% { transform: scale(1); opacity: 1; }
 }
 .animate-attention {
   animation: attention 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}
@keyframes float {
  0% { transform: translateY(10px) rotate(-3deg); opacity: 0; }
  50% { transform: translateY(-10px) rotate(3deg); opacity: 0.7; }
  100% { transform: translateY(-30px) rotate(-2deg); opacity: 0; }
}
.animate-float {
  animation: float 3s ease-in-out forwards;
}
`;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [isMounted]);

  // Modificar el useEffect que controla la animación para crear un bucle infinito
  // y cambiar la secuencia para que el robot haga la remediación y luego aparezca un humano
  useEffect(() => {
    if (!isMounted) return;

    if (activeStep === 2) {
      // Función para ejecutar un ciclo completo de animación
      const runAnimationCycle = () => {
        // Reset animation states when entering the Remediate step
        // Pero NO resetear hasClickedApprove para mantener visible el QA Tester Review
        setCodeAnimationState(0);
        setShowPullRequest(false);
        setShowReview(false);
        setTypingText('');
        setCursorPosition(0);

        // Start the animation sequence - slightly slower now
        const timer1 = setTimeout(() => {
          setTypingText(originalCode);
          setCodeAnimationState(1);
        }, 800);

        const timer2 = setTimeout(() => {
          // Start typing animation - el robot está haciendo la remediación
          setCodeAnimationState(2);
          let currentPos = 0;
          const typingInterval = setInterval(() => {
            if (currentPos <= modifiedCode.length) {
              setCursorPosition(currentPos);
              currentPos += 2; // Type slower by incrementing by 2 characters at a time
            } else {
              clearInterval(typingInterval);
              setCodeAnimationState(3);

              // El robot ha terminado, ahora aparece el humano para hacer el pull request
              setTimeout(() => {
                // Mostrar el pull request (creado por el humano)
                setShowPullRequest(true);

                // No necesitamos mostrar la revisión aquí, ya que se mostrará basado en hasClickedApprove
                setTimeout(() => {
                  // Wait a bit before restarting the animation cycle
                  setTimeout(() => {
                    runAnimationCycle(); // Restart the animation cycle
                  }, 4000); // Wait 4 seconds before restarting
                }, 1500);
              }, 1000);
            }
          }, 30); // Slower typing speed
        }, 2000); // Start typing later

        return () => {
          clearTimeout(timer1);
          clearTimeout(timer2);
        };
      };

      // Start the initial animation cycle
      const cleanup = runAnimationCycle();

      return cleanup;
    }
  }, [activeStep, originalCode, modifiedCode, isMounted]);

  // Reset hasClickedApprove when activeStep changes
  useEffect(() => {
    setHasClickedApprove(false);
  }, [activeStep]);

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];

    // Function to create a timeout that we can track
    const createTrackedTimeout = (callback: ()=> void, delay: number) => {
      const id = setTimeout(callback, delay);
      timeouts.push(id);
      return id;
    }

    // Make createTrackedTimeout available to other effects if needed
    ;(window as any).createTrackedTimeout = createTrackedTimeout;

    // Clean up all tracked timeouts
    return () => {
      timeouts.forEach(clearTimeout);
      delete (window as any).createTrackedTimeout;
    };
  }, [activeStep]);

  useEffect(() => {
    if (activeStep === 0) {
      // Function to run the animation sequence
      const runAnimationCycle = () => {
        // Reset animation states
        setDiscoverStep(0);
        setShowMagnifier(false);
        setShowVulnerability(false);

        // Start animation sequence
        const timer1 = setTimeout(() => setDiscoverStep(1), 500);
        const timer2 = setTimeout(() => setDiscoverStep(2), 1500);
        const timer3 = setTimeout(() => {
          setShowMagnifier(true);

          // Animate magnifier movement
          let position = 0;
          const magnifierInterval = setInterval(() => {
            position += 5;
            if (position <= 100) {
              setMagnifierPosition({ x: position, y: position * 0.5 });
            } else {
              clearInterval(magnifierInterval);

              // First show the exclamation mark (vulnerability alert)
              setShowVulnerability(true);

              // Then show the SQL injection message with a delay for an eye-catching effect
              setTimeout(() => {
                // Add a class to make the vulnerability message appear with an attention-grabbing effect
                const vulnMessage = document.querySelector('.vulnerability-message');
                if (vulnMessage) {
                  vulnMessage.classList.add('animate-attention');
                }
              }, 800);

              // Wait a bit before restarting the animation
              setTimeout(() => {
                // Reset and restart the animation cycle
                runAnimationCycle();
              }, 5000); // Show the vulnerability for 5 seconds before restarting
            }
          }, 100);
        }, 2500);

        return () => {
          clearTimeout(timer1);
          clearTimeout(timer2);
          clearTimeout(timer3);
        };
      };

      // Start the initial animation cycle
      const cleanup = runAnimationCycle();
      return cleanup;
    }
  }, [activeStep]);

  useEffect(() => {
    if (activeStep === 1) {
      // Function to run the animation sequence for Enrich step
      const runEnrichmentCycle = () => {
        // Reset animation states
        setEnrichStep(0);
        setShowComplianceInfo(false);
        setShowSecurityDetails(false);

        // Start animation sequence
        const timer1 = setTimeout(() => setEnrichStep(1), 1000); // Start with basic report

        const timer2 = setTimeout(() => {
          // Show the LLM processing animation
          setEnrichStep(2);

          // After a delay, show compliance information
          const timer3 = setTimeout(() => {
            setShowComplianceInfo(true);

            // Then show security details
            const timer4 = setTimeout(() => {
              setShowSecurityDetails(true);

              // Complete the enrichment
              const timer5 = setTimeout(() => {
                setEnrichStep(3);

                // Wait before restarting the animation cycle
                const timer6 = setTimeout(() => {
                  runEnrichmentCycle();
                }, 4000);

                return () => clearTimeout(timer6);
              }, 2000);

              return () => clearTimeout(timer5);
            }, 1500);

            return () => clearTimeout(timer4);
          }, 1500);

          return () => clearTimeout(timer3);
        }, 2000);

        return () => {
          clearTimeout(timer1);
          clearTimeout(timer2);
        };
      };

      // Start the initial animation cycle
      const cleanup = runEnrichmentCycle();
      return cleanup;
    }
  }, [activeStep]);

  return (
    <section
      ref={sectionRef}
      className="py-16 bg-gray-50 relative overflow-hidden"
      style={{
        minHeight: '150vh', // Taller section to allow more scroll space
        scrollMarginTop: '50px', // Add margin to ensure section starts in view
      }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">How it works</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Plexicus simplifies vulnerability remediation with a three-step process
          </p>
        </div>

        <div className="max-w-6xl mx-auto relative">
          <div className="grid grid-cols-[200px_1fr] gap-8">
            { /* Vertical navigation on the left */ }
            <div className="pt-8">
              <div className="bg-white rounded-lg shadow-sm p-3 mb-4 w-full">
                <h3 className="text-xs font-medium text-gray-500 mb-3">Navigation</h3>
                <div className="flex flex-col space-y-3">
                  { [0, 1, 2].map((step) => (
                    <div key={step} className="flex flex-col border border-[#8220ff]/10 rounded-md overflow-hidden">
                      { /* Top part: Number and title */ }
                      <button
                        onClick={() => setActiveStep(step)}
                        className={`px-4 py-3 text-left text-sm font-medium rounded-t-md transition-all duration-200 flex items-center ${activeStep === step ? 'bg-[#8220ff] text-white' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3 ${activeStep === step ? 'bg-white text-[#8220ff]' : 'bg-gray-200 text-gray-500'
                          }`}
                        >
                          { step + 1 }
                        </div>
                        <span className="font-semibold">
                          { step === 0 ? 'Discover' : step === 1 ? 'Enrich' : 'Remediate' }
                        </span>
                      </button>

                      { /* Bottom part: Icon and description */ }
                      <div
                        className={`px-4 py-3 rounded-b-md flex items-start transition-all duration-200 ${activeStep === step
                          ? 'bg-[#8220ff]/10 border-t border-[#8220ff]/20'
                          : 'bg-gray-50/80 border-t border-gray-100'
                        }`}
                      >
                        <div
                          className={`w-12 h-12 rounded-md overflow-hidden flex items-center justify-center p-1 mr-3 ${activeStep === step ? 'bg-white/60' : 'bg-gray-100'
                          }`}
                        >
                          { step === 0 && (
                            // Discover - Magnifying glass
                            <div className="w-full h-full bg-[#8220ff]/10 rounded-md flex items-center justify-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke={activeStep === step ? '#8220ff' : '#8220ff'}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                              </svg>
                            </div>
                          ) }

                          { step === 1 && (
                            // Enrich - Report document
                            <div className="w-full h-full relative flex items-center justify-center">
                              <div className="absolute inset-0 bg-gradient-to-br from-[#8220ff]/10 to-[#8220ff]/5 rounded-md"></div>
                              <div className="relative w-8 h-8 bg-white rounded-md border border-[#8220ff]/20 flex flex-col justify-start p-1">
                                <div className="w-full h-1 bg-[#8220ff] mb-1 rounded-sm"></div>
                                <div className="w-3/4 h-1 bg-gray-200 mb-1 rounded-sm"></div>
                                <div className="w-full h-1 bg-gray-200 rounded-sm"></div>
                              </div>
                            </div>
                          ) }

                          { step === 2 && (
                            // Remediate - Robot and human
                            <div className="w-full h-full bg-[#8220ff]/10 rounded-md flex items-center justify-center">
                              <div className="relative flex items-center">
                                { /* Robot */ }
                                <div className="w-5 h-5 bg-[#8220ff] rounded-sm relative mr-1">
                                  <div className="absolute w-3 h-2 bg-gray-800 left-1/2 top-1/3 transform -translate-x-1/2 -translate-y-1/2 rounded-sm"></div>
                                  <div className="absolute w-1 h-1 bg-blue-400 left-1/3 top-1/3 transform -translate-y-1/2 rounded-full"></div>
                                  <div className="absolute w-1 h-1 bg-blue-400 right-1/3 top-1/3 transform -translate-y-1/2 rounded-full"></div>
                                </div>

                                { /* Human */ }
                                <div className="w-5 h-5 flex flex-col items-center">
                                  <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                                  <div className="w-4 h-2 bg-gray-300 rounded-md"></div>
                                </div>
                              </div>
                            </div>
                          ) }
                        </div>

                        <span className="text-xs mt-1 opacity-80 text-gray-700">
                          { step === 0
                            ? 'Find vulnerabilities'
                            : step === 1
                              ? 'Analyze & contextualize'
                              : 'Fix & implement' }
                        </span>
                      </div>
                    </div>
                  )) }
                </div>
                <div className="mt-4 text-xs text-gray-500">
                  <p>Click on a step to navigate</p>
                </div>
              </div>
            </div>

            { /* Parallax Scenes - Fixed height to prevent layout shifts */ }
            <div className="relative h-[600px] bg-white rounded-xl shadow-lg overflow-hidden">
              { /* Scene 1: Discover */ }
              <div
                className={`absolute inset-0 transition-opacity duration-1000 flex items-center justify-center p-8 ${
                  activeStep === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <div className="grid md:grid-cols-3 gap-8 items-center">
                  <div className="space-y-4 md:col-span-1">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#8220ff]/10 text-[#8220ff]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Discover</h3>
                    <p className="mt-4 text-gray-600">
                      Our advanced scanning technology detects vulnerabilities in your code repositories, identifying
                      security issues like SQL injections before they become threats.
                    </p>
                    <div className="bg-purple-50 border border-purple-100 rounded-md p-3 mt-2">
                      <span className="text-sm font-medium text-[#8220ff]">Powered by Plexalyzer</span>
                      <p className="text-xs text-gray-600 mt-1">
                        Our scanning technology that continuously monitors your codebase for vulnerabilities
                      </p>
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <svg
                          className="h-6 w-6 mr-2 text-[#8220ff]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Automatic repository scanning</span>
                      </li>
                      <li className="flex items-start">
                        <svg
                          className="h-6 w-6 mr-2 text-[#8220ff]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Multiple vulnerability detection engines</span>
                      </li>
                      <li className="flex items-start">
                        <svg
                          className="h-6 w-6 mr-2 text-[#8220ff]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Real-time issue identification</span>
                      </li>
                    </ul>
                  </div>
                  <div className="relative md:col-span-2">
                    <div className="bg-gray-100 rounded-lg p-6 shadow-inner">
                      { /* Command 1 - Git Clone */ }
                      <div
                        className={`flex items-start mb-4 transition-opacity duration-500 ${
                          discoverStep >= 1 ? 'opacity-100' : 'opacity-0'
                        }`}
                      >
                        <div className="mr-4 mt-1">
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
                            className="text-[#8220ff]"
                          >
                            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                            <path d="M9 18c-4.51 2-5-2-7-2" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-mono text-sm bg-gray-800 text-green-400 p-2 rounded mb-2">
                            $ git clone https://github.com/example/vulnerable-app.git
                          </div>
                        </div>
                      </div>

                      { /* Command 2 - Scan */ }
                      <div
                        className={`flex items-start mb-4 transition-opacity duration-500 ${
                          discoverStep >= 2 ? 'opacity-100' : 'opacity-0'
                        }`}
                      >
                        <div>
                          <div className="font-mono text-sm bg-gray-800 text-green-400 p-2 rounded">
                            $ plexalyzer scan --repo ./vulnerable-app
                          </div>
                        </div>
                      </div>

                      { /* Code with vulnerability */ }
                      <div
                        className={`border border-gray-200 rounded-lg p-4 bg-white relative transition-opacity duration-500 ${
                          discoverStep >= 2 ? 'opacity-100' : 'opacity-0'
                        }`}
                      >
                        <div className="font-mono text-sm overflow-x-auto">
                          <pre className="text-red-500">
                            { `if(isset($_GET['id'])) {
  $id = $_GET['id'];
  $sql = "SELECT * FROM users WHERE id = $id";          
  $result = $conn->query($sql);
}` }
                          </pre>
                        </div>

                        { /* Magnifying glass */ }
                        { showMagnifier && (
                          <div
                            className="absolute w-12 h-12 pointer-events-none transition-all duration-300"
                            style={{
                              left: `${magnifierPosition.x}%`,
                              top: `${magnifierPosition.y}%`,
                              transform: 'translate(-50%, -50%)',
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="48"
                              height="48"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-[#8220ff]"
                            >
                              <circle cx="11" cy="11" r="8" />
                              <path d="m21 21-4.3-4.3" />
                            </svg>
                          </div>
                        ) }

                        { /* Vulnerability alert */ }
                        { showVulnerability && (
                          <div className="absolute -right-4 -top-4 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center animate-pulse">
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
                              className="text-red-500"
                            >
                              <circle cx="12" cy="12" r="10" />
                              <line x1="12" y1="8" x2="12" y2="12" />
                              <line x1="12" y1="16" x2="12.01" y2="16" />
                            </svg>
                          </div>
                        ) }
                      </div>

                      { /* Vulnerability message */ }
                      { showVulnerability && (
                        <div className="mt-4 p-3 bg-red-50 rounded border border-red-100 text-sm vulnerability-message opacity-0">
                          <div className="font-semibold text-red-700">SQL Injection Vulnerability Detected</div>
                          <div className="text-red-600 mt-1">
                            Direct use of user input in SQL query without sanitization
                          </div>
                        </div>
                      ) }
                    </div>
                  </div>
                </div>
              </div>

              { /* Scene 2: Enrich */ }
              <div
                className={`absolute inset-0 transition-opacity duration-1000 flex items-center justify-center p-8 ${
                  activeStep === 1 ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <div className="grid md:grid-cols-3 gap-8 items-center">
                  <div className="space-y-4 md:col-span-1">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#8220ff]/10 text-[#8220ff]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Enrich</h3>
                    <p className="mt-4 text-gray-600">
                      Our AI-powered system transforms basic vulnerability reports into comprehensive analyses with
                      detailed context, impact assessment, and remediation guidance.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <svg
                          className="h-6 w-6 mr-2 text-[#8220ff]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>LLM-powered vulnerability analysis</span>
                      </li>
                      <li className="flex items-start">
                        <svg
                          className="h-6 w-6 mr-2 text-[#8220ff]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Contextual security insights</span>
                      </li>
                      <li className="flex items-start">
                        <svg
                          className="h-6 w-6 mr-2 text-[#8220ff]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Severity and impact assessment</span>
                      </li>
                    </ul>
                  </div>
                  <div className="relative md:col-span-2">
                    <div className="flex items-center justify-center">
                      <div className="relative">
                        { /* Basic Report */ }
                        <div className="absolute left-0 top-0 transform -translate-x-20 -translate-y-10 rotate-[-15deg] w-48 h-64 bg-white border border-gray-200 rounded-lg shadow p-4 z-10">
                          <div className="w-full h-6 bg-red-100 mb-2 rounded"></div>
                          <div className="w-3/4 h-4 bg-gray-100 mb-2 rounded"></div>
                          <div className="w-full h-4 bg-gray-100 mb-2 rounded"></div>
                          <div className="w-1/2 h-4 bg-gray-100 mb-6 rounded"></div>
                          <div className="w-full h-20 bg-gray-100 rounded"></div>
                        </div>

                        { /* Cauldron/Magic Pot */ }
                        <div className="relative z-20">
                          <div className="w-48 h-48 bg-gradient-to-br from-[#8220ff] to-purple-700 rounded-full flex items-center justify-center">
                            <div className="w-40 h-40 bg-gradient-to-br from-purple-600 to-[#8220ff] rounded-full flex items-center justify-center relative overflow-hidden">
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-32 h-32 bg-purple-500 rounded-full flex items-center justify-center animate-pulse">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="64"
                                    height="64"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="white"
                                    strokeWidth="1"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="animate-spin"
                                    style={{ animationDuration: '3s' }}
                                  >
                                    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                                    <path d="M3 3v5h5" />
                                    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                                    <path d="M16 16h5v5" />
                                  </svg>
                                </div>
                              </div>
                              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-xl">
                                LLM
                              </div>
                            </div>
                          </div>

                          { /* Sparkles */ }
                          <div className="absolute -top-4 -left-4 w-8 h-8 bg-yellow-300 rounded-full animate-ping opacity-75"></div>
                          <div
                            className="absolute top-0 right-0 w-6 h-6 bg-blue-300 rounded-full animate-ping opacity-75"
                            style={{ animationDelay: '0.5s' }}
                          ></div>
                          <div
                            className="absolute bottom-0 left-4 w-5 h-5 bg-green-300 rounded-full animate-ping opacity-75"
                            style={{ animationDelay: '1s' }}
                          ></div>

                          { /* Add floating text elements that appear during enrichment */ }
                          { enrichStep === 2 && (
                            <>
                              <div className="absolute -top-8 -left-8 text-xs font-mono bg-purple-100 text-purple-800 px-2 py-1 rounded animate-float opacity-70">
                                PCI DSS
                              </div>
                              <div
                                className="absolute top-0 -right-16 text-xs font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded animate-float opacity-70"
                                style={{ animationDelay: '0.3s' }}
                              >
                                CVSS: 8.6
                              </div>
                              <div
                                className="absolute -bottom-8 left-0 text-xs font-mono bg-green-100 text-green-800 px-2 py-1 rounded animate-float opacity-70"
                                style={{ animationDelay: '0.6s' }}
                              >
                                ISO 27001
                              </div>
                              <div
                                className="absolute -bottom-4 -right-12 text-xs font-mono bg-red-100 text-red-800 px-2 py-1 rounded animate-float opacity-70"
                                style={{ animationDelay: '0.9s' }}
                              >
                                CWE-89
                              </div>
                              <div
                                className="absolute -top-12 right-4 text-xs font-mono bg-yellow-100 text-yellow-800 px-2 py-1 rounded animate-float opacity-70"
                                style={{ animationDelay: '1.2s' }}
                              >
                                SOC2
                              </div>
                              <div
                                className="absolute top-8 -right-8 text-xs font-mono bg-indigo-100 text-indigo-800 px-2 py-1 rounded animate-float opacity-70"
                                style={{ animationDelay: '1.5s' }}
                              >
                                CVE-2023-1234
                              </div>
                            </>
                          ) }
                        </div>

                        { /* Enriched Report */ }
                        <div className="absolute right-0 bottom-0 transform translate-x-20 translate-y-10 rotate-[15deg] w-64 h-80 bg-white border-2 border-[#8220ff] rounded-lg shadow-lg p-4 z-10">
                          <div className="flex items-center mb-4">
                            <div className="w-8 h-8 bg-red-500 rounded-full mr-2 flex items-center justify-center text-white font-bold text-xs">
                              P1
                            </div>
                            <div className="text-red-500 font-bold">Critical Vulnerability</div>
                          </div>
                          <div className="space-y-2">
                            <div className="w-full h-4 bg-gray-100 rounded"></div>
                            <div className="w-full h-4 bg-gray-100 rounded"></div>
                            <div className="w-3/4 h-4 bg-gray-100 rounded"></div>
                          </div>

                          { /* Compliance Information */ }
                          { showComplianceInfo && (
                            <div className="mt-4 p-2 bg-purple-50 border border-purple-100 rounded text-xs animate-attention">
                              <div className="font-bold text-purple-700">Compliance Impact</div>
                              <div className="mt-1 space-y-1">
                                <div className="flex items-center">
                                  <div className="w-3 h-3 bg-purple-200 rounded-sm mr-1 flex-shrink-0"></div>
                                  <span className="text-purple-700 text-xs">PCI DSS 6.5.1</span>
                                </div>
                                <div className="flex items-center">
                                  <div className="w-3 h-3 bg-purple-200 rounded-sm mr-1 flex-shrink-0"></div>
                                  <span className="text-purple-700 text-xs">ISO 27001 A.14.2</span>
                                </div>
                                <div className="flex items-center">
                                  <div className="w-3 h-3 bg-purple-200 rounded-sm mr-1 flex-shrink-0"></div>
                                  <span className="text-purple-700 text-xs">SOC2 Type II</span>
                                </div>
                              </div>
                            </div>
                          ) }

                          { /* Security Details */ }
                          { showSecurityDetails && (
                            <div className="mt-4 p-2 bg-blue-50 border border-blue-100 rounded text-xs animate-attention">
                              <div className="font-bold text-blue-700">Security Details</div>
                              <div className="mt-1 space-y-1">
                                <div className="flex items-center">
                                  <div className="w-3 h-3 bg-blue-200 rounded-sm mr-1 flex-shrink-0"></div>
                                  <span className="text-blue-700 text-xs">CVSS: 8.6 (High)</span>
                                </div>
                                <div className="flex items-center">
                                  <div className="w-3 h-3 bg-blue-200 rounded-sm mr-1 flex-shrink-0"></div>
                                  <span className="text-blue-700 text-xs">CVE-2023-1234</span>
                                </div>
                                <div className="flex items-center">
                                  <div className="w-3 h-3 bg-blue-200 rounded-sm mr-1 flex-shrink-0"></div>
                                  <span className="text-blue-700 text-xs">CWE-89: SQL Injection</span>
                                </div>
                              </div>
                            </div>
                          ) }

                          <div className="mt-4 p-2 bg-green-50 border border-green-100 rounded text-xs">
                            <div className="font-bold">Remediation Steps</div>
                            <div className="w-full h-2 bg-gray-100 mt-1 rounded"></div>
                            <div className="w-full h-2 bg-gray-100 mt-1 rounded"></div>
                            <div className="w-1/2 h-2 bg-gray-100 mt-1 rounded"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              { /* Scene 3: Remediate */ }
              <div
                className={`absolute inset-0 transition-opacity duration-1000 flex items-center justify-center p-8 ${
                  activeStep === 2 ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <div className="grid md:grid-cols-3 gap-8 items-center">
                  <div className="space-y-4 md:col-span-1">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#8220ff]/10 text-[#8220ff]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Remediate</h3>
                    <p className="mt-4 text-gray-600">
                      Our AI agent automatically generates and implements fixes for detected vulnerabilities, creating
                      pull requests that you can review and approve with a single click.
                    </p>
                    <div className="bg-purple-50 border border-purple-100 rounded-md p-3 mt-2">
                      <span className="text-sm font-medium text-[#8220ff]">Powered by Codex Remedium</span>
                      <p className="text-xs text-gray-600 mt-1">
                        Our AI Agent that automatically generates and implements fixes for vulnerabilities
                      </p>
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <svg
                          className="h-6 w-6 mr-2 text-[#8220ff]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Automated fix generation</span>
                      </li>
                      <li className="flex items-start">
                        <svg
                          className="h-6 w-6 mr-2 text-[#8220ff]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Pull request creation</span>
                      </li>
                      <li className="flex items-start">
                        <svg
                          className="h-6 w-6 mr-2 text-[#8220ff]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>One-click approval workflow</span>
                      </li>
                    </ul>
                  </div>
                  <div className="relative md:col-span-2">
                    <div className="bg-gray-100 rounded-lg p-6 shadow-inner">
                      { /* Robot AI Agent */ }
                      <div
                        className={`absolute -left-8 top-1/2 transform -translate-y-1/2 w-16 transition-all duration-1000 z-50 ${codeAnimationState < 3 ? 'opacity-100 translate-x-0 slide-in-left' : 'opacity-0 -translate-x-16 slide-out-left'}`}
                      >
                        <div className="w-16 h-16 bg-[#8220ff] rounded-t-lg relative">
                          <div className="absolute w-10 h-6 bg-gray-800 left-1/2 top-1/3 transform -translate-x-1/2 -translate-y-1/2 rounded"></div>
                          <div className="absolute w-2 h-2 bg-blue-400 left-1/3 top-1/3 transform -translate-y-1/2 rounded-full animate-pulse"></div>
                          <div className="absolute w-2 h-2 bg-blue-400 right-1/3 top-1/3 transform -translate-y-1/2 rounded-full animate-pulse"></div>
                        </div>
                        <div className="w-12 h-12 bg-gray-300 mx-auto rounded-b-lg"></div>
                        <div className="w-4 h-8 bg-gray-400 absolute -right-2 top-8 rounded-r-lg"></div>
                        <div className="w-4 h-8 bg-gray-400 absolute -left-2 top-8 rounded-l-lg"></div>
                      </div>

                      { /* Human Developer - aparece después de que el robot termina */ }
                      <div
                        className={`absolute -left-8 top-1/2 transform -translate-y-1/2 w-32 transition-all duration-1000 z-50 ${codeAnimationState >= 3 ? 'opacity-100 translate-x-0 slide-in-left' : 'opacity-0 -translate-x-16 slide-out-left'}`}
                        style={{ marginLeft: '-25px' }}
                      >
                        <div className="relative w-32 h-32">
                          <img
                            src="/images/developer.png"
                            alt="Developer"
                            width={128}
                            height={128}
                            className="object-contain"
                          />
                        </div>
                      </div>

                      { /* Code Fix */ }
                      <div className="flex flex-col">
                        <div
                          className="font-mono text-sm bg-gray-800 text-green-400 p-2 rounded mb-4 opacity-0 animate-fadeIn"
                          style={{ animationDelay: '0.2s', animationDuration: '0.5s', animationFillMode: 'forwards' }}
                        >
                          $ codex-remedium --vulnerability SQL_INJECTION_001
                        </div>

                        { /* Modificar la parte del código que muestra la animación para que las transiciones sean más suaves */ }
                        <div className="mb-4">
                          <div
                            className="border border-gray-200 rounded-lg p-3 bg-white transition-all duration-700 relative overflow-hidden"
                            style={{ minHeight: '180px' }}
                          >
                            { /* Initial loading state */ }
                            { codeAnimationState === 0 && (
                              <div className="absolute inset-0 flex items-center justify-center bg-white">
                                <div className="w-8 h-8 border-4 border-[#8220ff] border-t-transparent rounded-full animate-spin"></div>
                              </div>
                            ) }

                            { /* Original code state */ }
                            { codeAnimationState >= 1 && (
                              <div
                                className={`transition-opacity duration-700 ${codeAnimationState === 1 ? 'opacity-100' : 'opacity-0'} ${codeAnimationState > 1 ? 'absolute inset-0' : ''}`}
                              >
                                <div className="text-xs text-gray-700 font-semibold mb-2">Vulnerable Code</div>
                                <div className="font-mono text-xs overflow-x-auto">
                                  <pre className="text-red-500">{ typingText }</pre>
                                </div>
                              </div>
                            ) }

                            { /* Typing animation state - Robot fixing code */ }
                            { codeAnimationState >= 2 && (
                              <div
                                className={`transition-opacity duration-700 ${codeAnimationState >= 2 ? 'opacity-100' : 'opacity-0'}`}
                              >
                                <div className="text-xs text-gray-700 font-semibold mb-2 flex items-center">
                                  { codeAnimationState === 2 ? (
                                    <>
                                      <span className="inline-block w-3 h-3 bg-[#8220ff] rounded-full mr-2 animate-pulse"></span>
                                      <span>AI Agent Fixing Code...</span>
                                    </>
                                  ) : (
                                    <>
                                      <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                                      <span>Fixed Code</span>
                                    </>
                                  ) }
                                </div>
                                <div className="font-mono text-xs overflow-x-auto">
                                  { codeAnimationState === 2 ? (
                                    <div className="relative">
                                      <pre className="text-gray-600">
                                        { modifiedCode.substring(0, cursorPosition) }
                                        <span className="animate-pulse inline-block w-2 h-4 bg-[#8220ff] ml-0.5"></span>
                                      </pre>
                                    </div>
                                  ) : (
                                    <>
                                      <pre className="text-gray-600">{ 'if(isset($_GET[\'id\'])) {' }</pre>
                                      <pre className="bg-red-50 text-red-500">{ '    $id = $_GET[\'id\'];' }</pre>
                                      <pre className="bg-green-50 text-green-600">
                                        { `    $id = mysqli_real_escape_string(
   $conn, $_GET['id']
);` }
                                      </pre>
                                      <pre className="text-gray-600">
                                        { '    $sql = "SELECT * FROM users WHERE id = ' }
                                      </pre>
                                      <pre className="bg-red-50 text-red-500 inline">{ '$id' }</pre>
                                      <pre className="text-gray-600 inline">{ '";' }</pre>
                                      <pre className="bg-green-50 text-green-600 block">
                                        { '    $sql = "SELECT * FROM users WHERE id = \'$id\'";' }
                                      </pre>
                                      <pre className="text-gray-600">
                                        { `    $result = $conn->query($sql);
}` }
                                      </pre>
                                    </>
                                  ) }
                                </div>
                                { codeAnimationState === 3 && (
                                  <div className="mt-2 flex animate-fadeIn" style={{ animationDuration: '0.7s' }}>
                                    <div className="flex items-center mr-4">
                                      <div className="w-3 h-3 bg-red-500 rounded-sm mr-1"></div>
                                      <span className="text-xs text-gray-600">Removed</span>
                                    </div>
                                    <div className="flex items-center">
                                      <div className="w-3 h-3 bg-green-500 rounded-sm mr-1"></div>
                                      <span className="text-xs text-gray-600">Added</span>
                                    </div>
                                  </div>
                                ) }
                              </div>
                            ) }
                          </div>
                        </div>

                        { /* Pull Request UI - appears after code fix */ }
                        { (showPullRequest || codeAnimationState >= 3) && (
                          <div
                            className="border border-gray-200 rounded-lg p-4 bg-white opacity-0 animate-fadeIn"
                            style={{
                              animationDuration: '0.8s',
                              animationFillMode: 'forwards',
                              animationDelay: codeAnimationState >= 3 ? '0.5s' : '0s',
                            }}
                          >
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center">
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
                                  className="text-green-500 mr-2"
                                >
                                  <path d="M18 15a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
                                  <path d="M6 3a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
                                  <path d="M18 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
                                  <path d="M6 21V9" />
                                  <path d="m15 6-3.5 2-3.5-2" />
                                  <path d="M18 15v-3" />
                                </svg>
                                <span className="font-medium text-sm">
                                  Pull Request #42: Fix SQL Injection Vulnerability
                                </span>
                              </div>
                              <div className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded">
                                Awaiting Review
                              </div>
                            </div>
                            <div className="text-xs text-gray-500 mb-3">
                              Created by <span className="text-gray-700 font-medium">Developer</span> • 3 minutes ago
                            </div>
                            <div className="flex justify-end space-x-2">
                              <button className="px-3 py-1 text-xs border border-gray-300 rounded hover:bg-gray-100">
                                View Details
                              </button>
                              <div className="relative">
                                { !hasClickedApprove && (
                                  <div className="absolute -top-8 right-4 animate-bounce">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="#8220ff"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    >
                                      <line x1="12" y1="5" x2="12" y2="19"></line>
                                      <polyline points="19 12 12 19 5 12"></polyline>
                                    </svg>
                                  </div>
                                ) }
                                <button
                                  className="px-3 py-1 text-xs bg-[#8220ff] text-white rounded hover:bg-[#8220ff]/80"
                                  onClick={() => {
                                    setHasClickedApprove(true);
                                    // Establecer un temporizador para ocultar el QA Tester Review después de 3 segundos
                                    setTimeout(() => {
                                      setHasClickedApprove(false);
                                    }, 3000);
                                  }}
                                >
                                  Approve & Merge
                                </button>
                              </div>
                            </div>
                          </div>
                        ) }

                        { /* Test Review - appears after clicking Approve & Merge */ }
                        { hasClickedApprove && (
                          <div
                            className="mt-4 flex items-center opacity-0 animate-fadeIn"
                            style={{
                              animationDuration: '0.8s',
                              animationFillMode: 'forwards',
                            }}
                          >
                            <div className="w-10 h-10 rounded-full bg-blue-100 border-2 border-blue-300 flex items-center justify-center text-blue-500 mr-3 flex-shrink-0">
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
                              >
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                              </svg>
                            </div>
                            <div className="flex-1 p-3 bg-blue-50 rounded-lg border border-blue-100">
                              <div className="text-sm font-medium">QA Tester Review</div>
                              <div className="text-xs text-gray-600 mt-1">
                                Tests passed! The fix properly sanitizes user input and prevents SQL injection.
                                Approving this PR.
                              </div>
                            </div>
                          </div>
                        ) }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>{ ' ' }
          { /* Cierre del grid */ }
        </div>

        <div className="mt-16 grid lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 ml-8">
            <div className="inline-block px-4 py-2 bg-primary/10 text-primary font-medium rounded-full text-sm">
              Exclusive Report
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">AI-powered ASPM accelerates remediation</h3>
            <p className="text-gray-600">
              Download our report on how AI-powered ASPM accelerates remediation, reducing response times by 95%
            </p>
            <button className="bg-[#8220ff] text-white py-2 px-6 rounded-md hover:bg-opacity-90 transition-all duration-300">
              Download Report
            </button>
          </div>
          <div className="bg-gray-200 aspect-video rounded-lg flex items-center justify-center relative overflow-hidden shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-[#8220ff]/10 to-transparent"></div>
            <div className="relative transform rotate-12 hover:rotate-0 transition-transform duration-500">
              <div className="w-64 h-80 bg-white rounded-lg shadow-xl flex flex-col">
                <div className="h-40 bg-[#8220ff] rounded-t-lg flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">ASPM Report</span>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h4 className="font-bold text-lg mb-2">AI-Powered Security</h4>
                  <div className="space-y-2 flex-1">
                    <div className="h-2 bg-gray-200 rounded w-full"></div>
                    <div className="h-2 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-2 bg-gray-200 rounded w-4/6"></div>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="h-8 w-20 bg-[#8220ff] rounded"></div>
                    <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
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
