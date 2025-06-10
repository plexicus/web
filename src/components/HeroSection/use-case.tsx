'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from '@/i18n/utils';

export default function InteractiveHeroSection({ lang }) {
  const t = useTranslations(lang);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  // Compact layout that fits within max-w-4xl
  const steps = [
    { id: 'code', label: 'Code', x: 80, y: 80, icon: '💻' },
    { id: 'scan', label: 'Scan', x: 200, y: 80, icon: '🔍' },
    { id: 'analyze', label: 'Analyze', x: 320, y: 80, icon: '🧠' },
    { id: 'remediate', label: 'Fix', x: 440, y: 80, icon: '⚡' },
    { id: 'deploy', label: 'Deploy', x: 560, y: 80, icon: '🚀' },
  ];

  const connections = [
    { from: 0, to: 1 },
    { from: 1, to: 2 },
    { from: 2, to: 3 },
    { from: 3, to: 4 },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to fit container
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let animationProgress = 0;
    let cursorX = steps[0].x;
    let cursorY = steps[0].y;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update animation progress
      animationProgress += 0.01;

      // Reset animation when complete
      if (animationProgress > connections.length + 1.5) {
        animationProgress = 0;
        cursorX = steps[0].x;
        cursorY = steps[0].y;
      }

      let activeCursorConnection = -1;
      let maxProgress = 0;

      // Draw connections with short dotted lines
      connections.forEach((connection, index) => {
        const fromStep = steps[connection.from];
        const toStep = steps[connection.to];
        const connectionProgress = Math.max(0, Math.min(1, animationProgress - index));

        if (connectionProgress > 0) {
          drawShortDottedLine(ctx, fromStep.x, fromStep.y, toStep.x, toStep.y, connectionProgress);

          // Track which connection should have the cursor
          if (connectionProgress < 1 && connectionProgress > maxProgress) {
            maxProgress = connectionProgress;
            activeCursorConnection = index;
          }
        }
      });

      // Update cursor position based on active connection
      if (activeCursorConnection >= 0) {
        const connection = connections[activeCursorConnection];
        const fromStep = steps[connection.from];
        const toStep = steps[connection.to];
        const t = Math.max(0, Math.min(1, animationProgress - activeCursorConnection));

        cursorX = fromStep.x + (toStep.x - fromStep.x) * t;
        cursorY = fromStep.y + (toStep.y - fromStep.y) * t;
      }

      // Draw steps
      steps.forEach((step, index) => {
        const stepProgress = animationProgress - index * 0.8;
        const isActive = stepProgress > 0;
        const isCompleted = stepProgress > 1;
        drawCompactStep(ctx, step, isActive, isCompleted);
      });

      // Draw simple cursor
      if (animationProgress < connections.length + 0.5) {
        drawSimpleCursor(ctx, cursorX, cursorY);
      }

      // Update current step
      const newStep = Math.min(Math.floor(animationProgress), steps.length - 1);
      if (newStep !== currentStep && newStep >= 0) {
        setCurrentStep(newStep);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    const drawShortDottedLine = (
      ctx: CanvasRenderingContext2D,
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      progress: number,
    ) => {
      const dx = x2 - x1;
      const dy = y2 - y1;
      const length = Math.sqrt(dx * dx + dy * dy);
      const dotSpacing = 12; // Wider spacing for cleaner look
      const numDots = Math.floor(length / dotSpacing);

      ctx.fillStyle = '#7121D4';

      for (let i = 0; i <= numDots * progress; i++) {
        const t = i / numDots;
        const x = x1 + dx * t;
        const y = y1 + dy * t;

        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawCompactStep = (ctx: CanvasRenderingContext2D, step: any, isActive: boolean, isCompleted: boolean) => {
      // Draw step circle
      ctx.beginPath();
      ctx.arc(step.x, step.y, 22, 0, Math.PI * 2);

      if (isCompleted) {
        ctx.fillStyle = '#7D20F6';
      } else if (isActive) {
        ctx.fillStyle = '#F1EFFB';
      } else {
        ctx.fillStyle = '#F8F9FA';
      }

      ctx.fill();

      // Draw border
      ctx.strokeStyle = isActive || isCompleted ? '#6C1CD4' : '#E5E7EB';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw icon
      ctx.fillStyle = isActive || isCompleted ? 'white' : '#6B7280';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(step.icon, step.x, step.y);

      // Draw label below
      ctx.fillStyle = '#374151';
      ctx.font = 'bold 12px Arial';
      ctx.fillText(step.label, step.x, step.y + 40);
    };

    const drawSimpleCursor = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
      // Simple arrow cursor
      ctx.fillStyle = '#374151';
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + 12, y + 12);
      ctx.lineTo(x + 8, y + 16);
      ctx.lineTo(x + 4, y + 20);
      ctx.closePath();
      ctx.fill();

      // White outline
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <section
      className="relative overflow-hidden py-16 -mt-16 pt-32"
      style={{
        background: 'radial-gradient(circle at right, #000000 0%, #1a1a1a 40%, #4a0ba3 70%, #8220ff 100%)',
        boxShadow: 'inset 0 0 100px rgba(0,0,0,0.3)',
      }}
      aria-label="Hero section"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center pt-16 md:pt-20 lg:pt-24">
          <div className="space-y-4 relative z-10">
            <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
              { t('use-case.hero.title') }
            </h1>
            <p className="max-w-[600px] text-white/90 md:text-xl">
              { t('use-case.hero.subtitle') }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => {
                  const featuresSection = document.getElementById('features');
                  if (featuresSection) {
                    featuresSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-6 py-3 bg-white text-[#7D20F6] font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                { t('use-case.hero.buttons').at(0) }
              </button>
              <button
                onClick={() => {
                  const featuresSection = document.getElementById('features');
                  if (featuresSection) {
                    featuresSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-6 py-3 bg-white/10 text-white font-semibold border border-white/20 rounded-lg hover:bg-white/20 transition-colors"
              >
                { t('use-case.hero.buttons').at(1) }
              </button>
            </div>
          </div>

          <div className="relative flex flex-col items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-4xl">
              { /* Background glow effect */ }
              <div className="absolute inset-0 blur-3xl bg-gradient-to-br from-white via-purple-300 to-[#8121FF] opacity-20 rounded-[32px] transform scale-110"></div>

              { /* Interactive Canvas */ }
              <div
                className="w-full rounded-t-xl overflow-hidden relative z-10 bg-gradient-to-br from-[#F8F9FA] to-white"
                style={{
                  borderTopLeftRadius: '16px',
                  borderTopRightRadius: '16px',
                  position: 'relative',
                  minHeight: '200px',
                }}
              >
                <canvas
                  ref={canvasRef}
                  className="w-auto h-full bg-[#F4EDFF]/40"
                  style={{ width: '100%', height: '200px' }}
                  width="640"
                  height="200"
                />

                { /* Process Labels */ }
                <div className="absolute top-3 left-3 bg-white/90 rounded-lg px-2 py-1 shadow-sm">
                  <div className="text-xs font-medium text-gray-700">{ t('use-case.labels.legend') }</div>
                </div>

                { /* Legend */ }
                <div className="absolute bottom-3 right-3 bg-white/90 rounded-lg px-2 py-1 shadow-sm">
                  <div className="flex items-center space-x-3 text-xs">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-[#F1EFFB] border-[#7D20F6] border rounded-full"></div>
                      <span className="text-gray-600">{ t('use-case.labels.active') }</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-[#7D20F6] rounded-full"></div>
                      <span className="text-gray-600">{ t('use-case.labels.done') }</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            { /* Current Step Indicator */ }
            <div className="relative w-full p-4 bg-[#7D20F6] rounded-b-lg backdrop-blur-sm">
              <div className="text-white text-sm mb-2">{ t('use-case.labels.currentProcess') }:</div>
              <div className="text-white font-semibold text-lg">
                { currentStep < steps.length ? steps[currentStep].label : t('use-case.labels.processComplete') }
              </div>
              <div className="text-white/70 text-sm mt-1">
                { currentStep < steps.length ? t('use-case.labels.step', { count: currentStep + 1, total: steps.length }) : t('use-case.labels.readyForNextCycle') }
              </div>

              { /* Progress Bar */ }
              <div className="mt-3 w-full bg-white/20 rounded-full h-2">
                <div
                  className="bg-white h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
