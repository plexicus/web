
import type React from 'react';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  GitPullRequest,
  Search,
  FlaskConical,
  Book,
  Microscope,
  Wrench,
  GitMerge,
  Edit,
  Check,
  FileText,
  Bot,
  User,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface BoxPosition {
  x: number;
  y: number;
  width: number;
  height: number;
  left: number;
  right: number;
  top: number;
  bottom: number;
}

interface LineSegment {
  path: string;
  step: number;
  label?: string;
}

interface WorkflowStep {
  id: string;
  index: number;
  icon?: React.ReactNode;
  icons?: React.ReactNode[];
  label: string;
  description: string;
  bgColor: string;
  aspect: string;
  activeBgColor: string;
  borderColor: string;
  activeBorderColor: string;
  iconColor: string;
  activeIconColor: string;
  shape: string;
  isWide?: boolean;
  // Layout configuration
  row: 'top' | 'bottom';
  position: number; // Position within the row
  flexSize: number; // 1 for normal, 2 for wide
  tooltipSide: 'top' | 'bottom';
}

export default function AnimatedGrid() {
  // Track the current animation step
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [showDecisionShake, setShowDecisionShake] = useState(false);
  const [lineSegments, setLineSegments] = useState<LineSegment[]>([]);

  // Refs for each box to get their positions
  const boxRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const containerRef = useRef<HTMLDivElement>(null);

  // Total number of steps: 6 boxes + 5 lines = 11 steps
  const totalSteps = 11;

  // Reset animation
  const resetAnimation = () => {
    setCurrentStep(0);
    setIsAnimating(true);
    setIsPaused(false);
    setIsEdited(false);
    setShowDecisionShake(false);
  };

  // Calculate line coordinates based on actual box positions
  const calculateLineSegments = () => {
    if (!containerRef.current) return;

    const boxes: Record<string, BoxPosition> = {};

    // Get positions of all boxes relative to container
    Object.keys(boxRefs.current).forEach((key) => {
      if (boxRefs.current[key]) {
        const boxRect = boxRefs.current[key]!.getBoundingClientRect();
        const containerRect = containerRef.current!.getBoundingClientRect();
        boxes[key] = {
          x: boxRect.left - containerRect.left + boxRect.width / 2,
          y: boxRect.top - containerRect.top + boxRect.height / 2,
          width: boxRect.width,
          height: boxRect.height,
          left: boxRect.left - containerRect.left,
          right: boxRect.left - containerRect.left + boxRect.width,
          top: boxRect.top - containerRect.top,
          bottom: boxRect.top - containerRect.top + boxRect.height,
        };
      }
    });

    // Create individual line segments
    if (boxes.gitpr && boxes.search && boxes.review && boxes.remediation && boxes.approval && boxes.gitmerge) {
      const segments: LineSegment[] = [
        // Segment 1: Git PR to Search
        {
          path: `M ${boxes.gitpr.right} ${boxes.gitpr.y} L ${boxes.search.left} ${boxes.search.y}`,
          step: 1,
          label: 'Submit',
        },
        // Segment 2: Search to Review
        {
          path: `M ${boxes.search.right} ${boxes.search.y} L ${boxes.review.left} ${boxes.review.y}`,
          step: 3,
          label: 'Analyze',
        },
        // Segment 3: Review to Remediation - with higher elbow and rounded corners
        {
          path: `M ${boxes.review.x} ${boxes.review.bottom} 
                 Q ${boxes.review.x} ${boxes.review.bottom + 20} ${boxes.review.x + 10} ${boxes.review.bottom + 20}
                 L ${boxes.remediation.x - 10} ${boxes.review.bottom + 20} 
                 Q ${boxes.remediation.x} ${boxes.review.bottom + 20} ${boxes.remediation.x} ${boxes.review.bottom + 30}
                 L ${boxes.remediation.x} ${boxes.remediation.top}`,
          step: 5,
          label: 'Process',
        },
        // Segment 4: Remediation to Approval
        {
          path: `M ${boxes.remediation.left} ${boxes.remediation.y} L ${boxes.approval.right} ${boxes.approval.y}`,
          step: 7,
          label: 'Validate',
        },
        // Segment 5: Approval to Git Merge
        {
          path: `M ${boxes.approval.left} ${boxes.approval.y} L ${boxes.gitmerge.right} ${boxes.gitmerge.y}`,
          step: 9,
          label: 'Complete',
        },
      ];
      setLineSegments(segments);
    }
  };

  // Recalculate coordinates when component mounts or resizes
  useEffect(() => {
    const handleResize = () => {
      setTimeout(calculateLineSegments, 100); // Small delay to ensure layout is complete
    };

    calculateLineSegments();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [currentStep]);

  // Auto restart after 6 seconds when animation completes
  useEffect(() => {
    if (!isAnimating && currentStep >= totalSteps - 1) {
      const timer = setTimeout(() => {
        resetAnimation();
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [isAnimating, currentStep]);

  // Shake animation for decision prompt
  useEffect(() => {
    if (isPaused && !showDecisionShake) {
      const timer = setTimeout(() => {
        setShowDecisionShake(true);
        setTimeout(() => setShowDecisionShake(false), 1000);
      }, 3000); // Start shaking after 3 seconds of waiting
      return () => clearTimeout(timer);
    }
  }, [isPaused, showDecisionShake]);

  // Box variants
  const boxVariants = {
    hidden: { scale: 1 },
    visible: {
      scale: [1, 1.05, 1],
      transition: { duration: 1.5, ease: 'easeInOut' },
    },
    breathing: {
      scale: [1, 1.02, 1],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: 'easeInOut',
      },
    },
  };

  // Shake variants for decision prompt
  const shakeVariants = {
    shake: {
      x: [0, -5, 5, -5, 5, 0],
      transition: { duration: 0.5, ease: 'easeInOut' },
    },
  };

  // Workflow steps data with monochromatic purple theme
  const workflowSteps: WorkflowStep[] = [
    {
      id: 'gitpr',
      index: 0,
      icon: <GitPullRequest size={24} />,
      label: 'Git PR',
      description: 'Create and submit a pull request with your code changes for review',
      bgColor: 'bg-white',
      activeBgColor: 'bg-white',
      borderColor: 'border-purple-200',
      activeBorderColor: 'border-purple-200',
      iconColor: 'text-purple-600',
      activeIconColor: 'text-purple-600',
      shape: 'rounded',
      row: 'top',
      position: 0,
      flexSize: 1,
      tooltipSide: 'bottom',
      aspect: 'w-1/4 flex-grow aspect-square',
    },
    {
      id: 'search',
      index: 1,
      icon: <Search size={24} />,
      label: 'Search',
      description: 'Automatically scan and discover security vulnerabilities in your code',
      bgColor: 'bg-white',
      activeBgColor: 'bg-white',
      borderColor: 'border-purple-200',
      activeBorderColor: 'border-purple-200',
      iconColor: 'text-purple-600',
      activeIconColor: 'text-purple-600',
      shape: 'rounded',
      row: 'top',
      position: 1,
      flexSize: 1,
      tooltipSide: 'bottom',
      aspect: 'w-1/4 flex-grow aspect-square',
    },
    {
      id: 'review',
      index: 2,
      icons: [
        <FlaskConical size={24} key="lab" />,
        <Book size={24} key="book" />,
        <Microscope size={24} key="microscope" />,
      ],
      label: 'Review',
      description: 'Analyze findings and assess the security impact of discovered issues',
      bgColor: 'bg-white',
      activeBgColor: 'bg-white',
      borderColor: 'border-purple-200',
      activeBorderColor: 'border-purple-200',
      iconColor: 'text-purple-600',
      activeIconColor: 'text-purple-600',
      shape: 'rounded',
      row: 'top',
      position: 2,
      flexSize: 2,
      tooltipSide: 'bottom',
      aspect: 'w-1/2 flex-grow aspect-2/1',
    },
    {
      id: 'remediation',
      index: 3,
      icon: <Wrench size={24} />,
      label: 'Remediation',
      description: 'Apply automated fixes and security patches to resolve identified issues',
      bgColor: 'bg-white',
      activeBgColor: 'bg-white',
      borderColor: 'border-purple-200',
      activeBorderColor: 'border-purple-200',
      iconColor: 'text-purple-600',
      activeIconColor: 'text-purple-600',
      shape: 'rounded',
      row: 'bottom',
      position: 2, // Right side of bottom row
      flexSize: 1,
      tooltipSide: 'top',
      aspect: 'w-1/4 flex-grow aspect-square',
    },
    {
      id: 'approval',
      index: 4,
      icons: isEdited
        ? [<FileText size={24} key="file" />, <User size={24} key="user" />, <Edit size={24} key="edit" />]
        : [<Bot size={24} key="bot" />, <User size={24} key="user" />, <Check size={24} key="check" />],
      label: isEdited ? 'Edited' : 'Approval',
      description: isEdited
        ? 'Code has been modified based on review feedback and is ready for re-evaluation'
        : 'Review the security findings and decide whether to approve or request changes',
      bgColor: 'bg-white',
      activeBgColor: 'bg-white',
      borderColor: 'border-purple-200',
      activeBorderColor: 'border-purple-200',
      iconColor: 'text-purple-600',
      activeIconColor: 'text-purple-600',
      shape: 'rounded',
      row: 'bottom',
      position: 1, // Center of bottom row
      flexSize: 2,
      tooltipSide: 'top',
      aspect: 'w-1/2 flex-grow aspect-2/1',
    },
    {
      id: 'gitmerge',
      index: 5,
      icon: <GitMerge size={24} />,
      label: 'Git Merge',
      description: 'Merge the approved changes into the main branch after all checks pass',
      bgColor: 'bg-white',
      activeBgColor: 'bg-white',
      borderColor: 'border-purple-200',
      activeBorderColor: 'border-purple-200',
      iconColor: 'text-purple-600',
      activeIconColor: 'text-purple-600',
      shape: 'rounded',
      row: 'bottom',
      position: 0, // Left side of bottom row
      flexSize: 1,
      tooltipSide: 'top',
      aspect: 'w-1/4 flex-grow aspect-square',
    },
  ];

  // When an animation completes, move to the next step
  const handleAnimationComplete = () => {
    // If we're at the approval box (step 8) and not edited yet, pause the animation
    if (currentStep === 8 && !isEdited) {
      setIsPaused(true);
      return;
    }

    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsAnimating(false);
    }
  };

  // Handle approve button click
  const handleApprove = () => {
    setIsPaused(false);
    setShowDecisionShake(false);
    setCurrentStep(currentStep + 1);
  };

  // Handle edit button click
  const handleEdit = () => {
    setIsEdited(true);
    setIsPaused(false);
    setShowDecisionShake(false);
    setCurrentStep(currentStep + 1);
  };

  // Is this box currently animating?
  const isBoxAnimating = (boxIndex: number) => {
    return currentStep === boxIndex * 2;
  };

  // Is this box in waiting/breathing state?
  const isBoxWaiting = (boxIndex: number) => {
    return boxIndex === 4 && isPaused && !isEdited;
  };

  // Is the workflow at the approval step?
  const isAtApprovalStep = currentStep === 8 && isPaused && !isEdited;

  // Get box shape class based on shape type
  const getBoxShapeClass = (shape: string) => {
    switch (shape) {
      case 'pill':
        return 'rounded-full';
      case 'rounded':
        return 'rounded-2xl';
      default:
        return 'rounded-lg';
    }
  };

  // Group boxes by row and sort by position
  const topRowBoxes = workflowSteps.filter((step) => step.row === 'top').sort((a, b) => a.position - b.position);

  const bottomRowBoxes = workflowSteps.filter((step) => step.row === 'bottom').sort((a, b) => a.position - b.position);

  // Render a single box component
  const renderBox = (step: WorkflowStep) => (
    <div key={step.id} style={{ flex: step.flexSize }} className={`relative ${step.aspect}`}>
      { /* Label above first box in each row */ }

      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            ref={(el) => {
              boxRefs.current[step.id] = el;
            }}
            className={`w-full h-full p-4 ${getBoxShapeClass(step.shape)} relative bg-white rounded-2xl border transition-all duration-500 ${
              isBoxAnimating(step.index)
                ? 'border-purple-300 shadow-active'
                : currentStep >= step.index * 2
                  ? 'border-purple-200 bg-purple-50'
                  : 'border-gray-200 opacity-80'
            }`}
            style={{
              boxShadow: isBoxAnimating(step.index)
                ? '0 10px 25px -5px rgba(139, 92, 246, 0.4), 0 8px 10px -6px rgba(139, 92, 246, 0.2)'
                : currentStep >= step.index * 2
                  ? '0 4px 12px -4px rgba(139, 92, 246, 0.15)'
                  : '0 2px 8px -4px rgba(0, 0, 0, 0.1)',
            }}
            variants={boxVariants}
            initial="hidden"
            animate={isBoxAnimating(step.index) ? 'visible' : isBoxWaiting(step.index) ? 'breathing' : 'hidden'}
            onAnimationComplete={isBoxAnimating(step.index) ? handleAnimationComplete : undefined}
            whileHover={{
              scale: 1.02,
              boxShadow: '0 8px 25px -6px rgba(139, 92, 246, 0.2), 0 0 0 1px rgba(139, 92, 246, 0.1)',
              transition: { duration: 0.2 },
            }}
          >
            { /* Card Corners */ }
            <div className="absolute top-2 left-2 w-2 h-2 bg-gray-200 rounded-full"></div>
            <div className="absolute top-2 right-2 w-2 h-2 bg-gray-200 rounded-full"></div>
            <div className="absolute bottom-2 left-2 w-2 h-2 bg-gray-200 rounded-full"></div>
            <div className="absolute bottom-2 right-2 w-2 h-2 bg-gray-200 rounded-full"></div>

            { /* Icon Circle */ }
            <div className="flex justify-center items-center h-full mb-2">
              <div
                className={`w-16 h-16 md:w-14 md:h-14 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                  currentStep >= step.index * 2 ? 'bg-[#f0e9e2] text-purple-600' : 'bg-gray-100 text-gray-400'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    currentStep >= step.index * 2 ? 'bg-white text-purple-600 shadow-sm' : 'bg-gray-50 text-gray-400'
                  }`}
                >
                  <div className="w-6 h-6 text-current">
                    { step.icons ? <div className="flex items-center justify-center">{ step.icons[0] }</div> : step.icon }
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent side={step.tooltipSide} className="max-w-xs z-50 bg-white border-gray-200 text-gray-800">
          <div className="text-center">
            <div className="font-semibold mb-1">{ step.label }</div>
            <div className="text-xs text-gray-600">{ step.description }</div>
          </div>
        </TooltipContent>
      </Tooltip>
    </div>
  );

  return (
    <TooltipProvider>
      <div className="w-full max-w-6xl mx-auto">
        { /* Current step indicator */ }
        <div className="mb-4 text-gray-700 font-mono text-sm bg-white px-4 py-2 rounded-xl border border-gray-200 inline-block shadow-md">
          { isAnimating ? (
            <div>
              { currentStep % 2 === 0 ? workflowSteps[Math.floor(currentStep / 2)]?.label || 'Unknown' : 'Connecting...' }
              { isPaused && ' (Awaiting Decision)' }
            </div>
          ) : (
            <div>Complete - Restarting in { Math.ceil((6000 - (Date.now() % 6000)) / 1000) }s</div>
          ) }
        </div>

        { /* Main diagram container */ }
        <div
          ref={containerRef}
          className="relative rounded-2xl p-3 md:p-6 sm:p-4 border border-gray-200 bg-[#F2EAFF] shadow-lg"
        >
          { /* Sequential animated workflow lines */ }
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
            { lineSegments.map((segment, index) => (
              <g key={index}>
                { /* Line segment */ }
                <motion.path
                  d={segment.path}
                  stroke="#C4B5FD"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={currentStep >= segment.step ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                  transition={currentStep === segment.step ? { duration: 1, ease: 'easeInOut' } : { duration: 0 }}
                  onAnimationComplete={currentStep === segment.step ? handleAnimationComplete : undefined}
                />

                { /* Pulsing circle for currently animating line */ }
                { currentStep === segment.step && (
                  <motion.circle
                    cx="0"
                    cy="0"
                    r="6"
                    fill="#8B5CF6"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: [0.5, 1.2, 0.5],
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 0.6,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: 'easeInOut',
                    }}
                  >
                    <animateMotion dur="1s" repeatCount="indefinite">
                      <mpath xlinkHref={`#segment-${index}`} />
                    </animateMotion>
                  </motion.circle>
                ) }

                { /* Hidden path for motion */ }
                <path id={`segment-${index}`} d={segment.path} style={{ display: 'none' }} />
              </g>
            )) }
          </svg>

          { /* Flexbox layout for boxes */ }
          <div className="flex flex-col gap-10 md:gap-16 sm:gap-12">
            { /* Top row */ }
            <div className="flex items-center justify-between md:gap-6 gap-3">
              { topRowBoxes.map(renderBox) }
            </div>

            { /* Bottom row */ }
            <div className="flex items-center justify-between md:gap-6 gap-3">
              { bottomRowBoxes.map(renderBox) }
            </div>
          </div>
        </div>

        { /* Action buttons */ }
        { isAtApprovalStep && (
          <div className="mt-8 md:mt-6 sm:mt-4 flex justify-center">
            <div className="bg-white rounded-xl p-4 sm:p-3 border border-gray-200 flex gap-4 sm:gap-2 shadow-lg">
              <motion.div
                variants={shakeVariants}
                animate={showDecisionShake ? 'shake' : ''}
                className="flex gap-4 sm:gap-2"
              >
                <Button
                  variant="ghost"
                  className="px-5 py-2 sm:px-3 sm:py-1 bg-white text-purple-600 font-medium rounded-lg hover:bg-gray-50 border border-purple-200 transition-all duration-300 hover:scale-105 shadow-md"
                  onClick={handleEdit}
                >
                  <Edit size={16} className="mr-2 sm:mr-1" />
                  <span className="sm:text-sm">Edit</span>
                </Button>

                <Button
                  className="px-5 py-2 sm:px-3 sm:py-1 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 border border-purple-600 transition-all duration-300 hover:scale-105 shadow-md"
                  onClick={handleApprove}
                >
                  <Check size={16} className="mr-2 sm:mr-1" />
                  <span className="sm:text-sm">Approve</span>
                </Button>
              </motion.div>
            </div>
          </div>
        ) }
      </div>
    </TooltipProvider>
  );
}
