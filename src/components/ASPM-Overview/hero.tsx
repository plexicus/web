'use client';

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
}

interface WorkflowStep {
  id: string;
  index: number;
  icon?: React.ReactNode;
  icons?: React.ReactNode[];
  label: string;
  description: string;
  color: string;
  activeColor: string;
  shadow: string;
  shape: string;
  isWide?: boolean;
  // Layout configuration
  row: 'top' | 'bottom';
  position: number; // Position within the row
  flexSize: number; // 1 for normal, 2 for wide
  tooltipSide: 'top' | 'bottom';
}

export default function HeroAnimation() {
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
        },
        // Segment 2: Search to Review
        {
          path: `M ${boxes.search.right} ${boxes.search.y} L ${boxes.review.left} ${boxes.review.y}`,
          step: 3,
        },
        // Segment 3: Review to Remediation - with higher elbow and rounded corners
        {
          path: `M ${boxes.review.x} ${boxes.review.bottom} 
                 Q ${boxes.review.x} ${boxes.review.bottom + 20} ${boxes.review.x + 10} ${boxes.review.bottom + 20}
                 L ${boxes.remediation.x - 10} ${boxes.review.bottom + 20} 
                 Q ${boxes.remediation.x} ${boxes.review.bottom + 20} ${boxes.remediation.x} ${boxes.review.bottom + 30}
                 L ${boxes.remediation.x} ${boxes.remediation.top}`,
          step: 5,
        },
        // Segment 4: Remediation to Approval
        {
          path: `M ${boxes.remediation.left} ${boxes.remediation.y} L ${boxes.approval.right} ${boxes.approval.y}`,
          step: 7,
        },
        // Segment 5: Approval to Git Merge
        {
          path: `M ${boxes.approval.left} ${boxes.approval.y} L ${boxes.gitmerge.right} ${boxes.gitmerge.y}`,
          step: 9,
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
      scale: [1, 1.15, 1],
      transition: { duration: 2, ease: 'easeInOut' },
    },
    breathing: {
      scale: [1, 1.05, 1],
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

  // Workflow steps data with layout configuration
  const workflowSteps: WorkflowStep[] = [
    {
      id: 'gitpr',
      index: 0,
      icon: <GitPullRequest size={28} />,
      label: 'Git PR',
      description: 'Create and submit a pull request with your code changes for review',
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
      activeColor: 'bg-gradient-to-br from-purple-600 to-purple-700',
      shadow: 'shadow-purple-200',
      shape: 'pill',
      row: 'top',
      position: 0,
      flexSize: 1,
      tooltipSide: 'bottom',
    },
    {
      id: 'search',
      index: 1,
      icon: <Search size={28} />,
      label: 'Search',
      description: 'Automatically scan and discover security vulnerabilities in your code',
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      activeColor: 'bg-gradient-to-br from-blue-600 to-blue-700',
      shadow: 'shadow-blue-200',
      shape: 'pill',
      row: 'top',
      position: 1,
      flexSize: 1,
      tooltipSide: 'bottom',
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
      color: 'bg-gradient-to-br from-cyan-500 to-cyan-600',
      activeColor: 'bg-gradient-to-br from-cyan-600 to-cyan-700',
      shadow: 'shadow-cyan-200',
      shape: 'pill',
      row: 'top',
      position: 2,
      flexSize: 2,
      tooltipSide: 'bottom',
    },
    {
      id: 'remediation',
      index: 3,
      icon: <Wrench size={28} />,
      label: 'Remediation',
      description: 'Apply automated fixes and security patches to resolve identified issues',
      color: 'bg-gradient-to-br from-orange-500 to-orange-600',
      activeColor: 'bg-gradient-to-br from-orange-600 to-orange-700',
      shadow: 'shadow-orange-200',
      shape: 'pill',
      row: 'bottom',
      position: 2, // Right side of bottom row
      flexSize: 1,
      tooltipSide: 'top',
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
      color: isEdited
        ? 'bg-gradient-to-br from-yellow-500 to-yellow-600'
        : 'bg-gradient-to-br from-green-500 to-green-600',
      activeColor: isEdited
        ? 'bg-gradient-to-br from-yellow-600 to-yellow-700'
        : 'bg-gradient-to-br from-green-600 to-green-700',
      shadow: isEdited ? 'shadow-yellow-200' : 'shadow-green-200',
      shape: 'pill',
      row: 'bottom',
      position: 1, // Center of bottom row
      flexSize: 2,
      tooltipSide: 'top',
    },
    {
      id: 'gitmerge',
      index: 5,
      icon: <GitMerge size={28} />,
      label: 'Git Merge',
      description: 'Merge the approved changes into the main branch after all checks pass',
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
      activeColor: 'bg-gradient-to-br from-purple-600 to-purple-700',
      shadow: 'shadow-purple-200',
      shape: 'pill',
      row: 'bottom',
      position: 0, // Left side of bottom row
      flexSize: 1,
      tooltipSide: 'top',
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
        return 'rounded-xl';
    }
  };

  // Group boxes by row and sort by position
  const topRowBoxes = workflowSteps.filter((step) => step.row === 'top').sort((a, b) => a.position - b.position);

  const bottomRowBoxes = workflowSteps.filter((step) => step.row === 'bottom').sort((a, b) => a.position - b.position);

  // Render a single box component
  const renderBox = (step: WorkflowStep) => (
    <div key={step.id} style={{ flex: step.flexSize }}>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            ref={(el) => {
              boxRefs.current[step.id] = el;
            }}
            className={`w-full h-20 ${getBoxShapeClass(step.shape)} flex items-center justify-center text-white font-bold shadow-lg relative z-10 cursor-pointer transition-all duration-300 px-4 ${
              isBoxAnimating(step.index) ? step.activeColor : step.color
            } ${step.shadow} ${isBoxAnimating(step.index) ? 'shadow-xl' : 'shadow-md'}`}
            variants={boxVariants}
            initial="hidden"
            animate={isBoxAnimating(step.index) ? 'visible' : isBoxWaiting(step.index) ? 'breathing' : 'hidden'}
            onAnimationComplete={isBoxAnimating(step.index) ? handleAnimationComplete : undefined}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            }}
          >
            { step.icons ? (
              <div className="flex items-center gap-4">
                { step.icons.map((icon, iconIndex) => (
                  <div key={iconIndex}>{ icon }</div>
                )) }
              </div>
            ) : (
              step.icon
            ) }
          </motion.div>
        </TooltipTrigger>
        <TooltipContent side={step.tooltipSide} className="max-w-xs z-50">
          <div className="text-center">
            <div className="font-semibold mb-1">{ step.label }</div>
            <div className="text-xs py-2">{ step.description }</div>
          </div>
        </TooltipContent>
      </Tooltip>
    </div>
  );

  return (
    <TooltipProvider>
      <div className="w-full max-w-6xl mx-auto">
        { /* Current step indicator */ }
        <div className="mb-4 text-gray-600 font-mono text-sm bg-white backdrop-blur-sm px-3 py-1 rounded-full shadow-sm border border-gray-200 inline-block">
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
        <div ref={containerRef} className="relative bg-white rounded-3xl p-8 shadow-2xl border border-gray-200">
          { /* Sequential animated workflow lines */ }
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
            { lineSegments.map((segment, index) => (
              <g key={index}>
                { /* Line segment */ }
                <motion.path
                  d={segment.path}
                  stroke="#3b82f6"
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
                    fill="#3b82f6"
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

          { /* Flexbox layout for boxes - NOW USING SINGLE ITERATION! */ }
          <div className="flex flex-col gap-16">
            { /* Top row */ }
            <div className="flex items-center justify-between gap-8">{ topRowBoxes.map(renderBox) }</div>

            { /* Bottom row */ }
            <div className="flex items-center justify-between gap-8">{ bottomRowBoxes.map(renderBox) }</div>
          </div>
        </div>

        { /* Action buttons */ }
        { isAtApprovalStep && (
          <div className="mt-6 flex justify-center">
            <div className="bg-white rounded-full p-4 shadow-xl border border-gray-200 flex gap-3">
              <motion.div variants={shakeVariants} animate={showDecisionShake ? 'shake' : ''} className="flex gap-3">
                <Button
                  variant="outline"
                  className="px-5 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 border-yellow-600 text-yellow-900 font-semibold rounded-full hover:from-yellow-500 hover:to-yellow-600 shadow-lg transition-all duration-300 hover:scale-105"
                  onClick={handleEdit}
                >
                  <Edit size={14} className="mr-2" />
                  Edit
                </Button>

                <Button
                  className="px-5 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-full hover:from-green-600 hover:to-green-700 shadow-lg transition-all duration-300 hover:scale-105"
                  onClick={handleApprove}
                >
                  <Check size={14} className="mr-2" />
                  Approve
                </Button>
              </motion.div>
            </div>
          </div>
        ) }
      </div>
    </TooltipProvider>
  );
}
