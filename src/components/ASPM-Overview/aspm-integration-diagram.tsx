'use client';

import { motion } from 'framer-motion';
import { Code, Server, FlaskRoundIcon as Flask, Rocket, CheckCircle, Search, Cog } from 'lucide-react';

export default function AspmIntegrationDiagram() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 0.8, ease: 'easeInOut' },
    },
  };

  return (
    <motion.div className="w-full max-w-3xl mx-auto" initial="hidden" animate="visible" variants={containerVariants}>
      <svg viewBox="0 0 800 600" className="w-full h-auto" style={{ background: '#e8e6f9' }}>
        { /* Background */ }
        <rect x="0" y="0" width="800" height="600" fill="#e8e6f9" rx="20" ry="20" />

        { /* Connection lines */ }
        <motion.path
          d="M400 200 L250 150"
          stroke="#6b46c1"
          strokeWidth="2"
          strokeDasharray="5,5"
          fill="none"
          variants={lineVariants}
        />
        <motion.path
          d="M400 200 L550 150"
          stroke="#6b46c1"
          strokeWidth="2"
          strokeDasharray="5,5"
          fill="none"
          variants={lineVariants}
        />
        <motion.path
          d="M400 400 L250 450"
          stroke="#6b46c1"
          strokeWidth="2"
          strokeDasharray="5,5"
          fill="none"
          variants={lineVariants}
        />
        <motion.path
          d="M400 400 L550 450"
          stroke="#6b46c1"
          strokeWidth="2"
          strokeDasharray="5,5"
          fill="none"
          variants={lineVariants}
        />

        { /* Vertical connection lines */ }
        <motion.path
          d="M250 150 L250 450"
          stroke="#6b46c1"
          strokeWidth="2"
          strokeDasharray="5,5"
          fill="none"
          variants={lineVariants}
        />
        <motion.path
          d="M550 150 L550 450"
          stroke="#6b46c1"
          strokeWidth="2"
          strokeDasharray="5,5"
          fill="none"
          variants={lineVariants}
        />

        { /* Connection labels */ }
        <motion.text
          x="200"
          y="300"
          fill="#1a1a3a"
          fontSize="16"
          fontWeight="bold"
          textAnchor="middle"
          variants={itemVariants}
        >
          Code
        </motion.text>
        <motion.text
          x="600"
          y="300"
          fill="#1a1a3a"
          fontSize="16"
          fontWeight="bold"
          textAnchor="middle"
          variants={itemVariants}
        >
          Deploy
        </motion.text>
        <motion.text
          x="400"
          y="175"
          fill="#1a1a3a"
          fontSize="16"
          fontWeight="bold"
          textAnchor="middle"
          variants={itemVariants}
        >
          Build
        </motion.text>
        <motion.text
          x="400"
          y="425"
          fill="#1a1a3a"
          fontSize="16"
          fontWeight="bold"
          textAnchor="middle"
          variants={itemVariants}
        >
          Testing
        </motion.text>

        { /* ASPM Integration center box */ }
        <motion.rect x="300" y="275" width="200" height="50" rx="10" ry="10" fill="#8b5cf6" variants={itemVariants} />
        <motion.text
          x="400"
          y="305"
          fill="white"
          fontSize="18"
          fontWeight="bold"
          textAnchor="middle"
          variants={itemVariants}
        >
          ASPM INTEGRATION
        </motion.text>

        { /* Code Circle (Top Left) */ }
        <motion.circle cx="250" cy="150" r="70" fill="#c4b5fd" variants={itemVariants} />
        <motion.foreignObject x="200" y="100" width="100" height="100" variants={itemVariants}>
          <div className="flex flex-col items-center justify-center h-full">
            <div className="bg-white p-2 rounded-lg mb-2">
              <Code className="w-8 h-8 text-indigo-700" />
            </div>
            <div className="bg-white p-1 rounded-lg mb-2 w-12 h-8 flex items-center justify-center">
              <span className="text-xs font-bold text-indigo-700">{ '</>' }</span>
            </div>
            <div className="bg-white rounded-lg p-1 w-16 h-10 flex items-center justify-center">
              <Search className="w-4 h-4 text-indigo-700" />
              <Cog className="w-4 h-4 text-indigo-700" />
            </div>
          </div>
        </motion.foreignObject>
        <motion.text
          x="250"
          cy="200"
          fill="#1a1a3a"
          fontSize="14"
          fontWeight="bold"
          textAnchor="middle"
          variants={itemVariants}
        >
          Code
        </motion.text>

        { /* Build Circle (Top Right) */ }
        <motion.circle cx="550" cy="150" r="70" fill="#c4b5fd" variants={itemVariants} />
        <motion.foreignObject x="500" y="100" width="100" height="100" variants={itemVariants}>
          <div className="flex flex-col items-center justify-center h-full">
            <div className="flex mb-2">
              <Server className="w-10 h-10 text-white" />
              <div className="ml-1 flex flex-col">
                <div className="bg-white w-4 h-8 rounded-t-lg"></div>
                <div className="bg-white w-4 h-8 rounded-b-lg"></div>
              </div>
            </div>
            <CheckCircle className="w-6 h-6 text-white" />
          </div>
        </motion.foreignObject>
        <motion.text
          x="550"
          y="200"
          fill="#1a1a3a"
          fontSize="14"
          fontWeight="bold"
          textAnchor="middle"
          variants={itemVariants}
        >
          Solver
        </motion.text>
        <motion.text
          x="550"
          y="220"
          fill="#1a1a3a"
          fontSize="14"
          fontWeight="bold"
          textAnchor="middle"
          variants={itemVariants}
        >
          Destrine
        </motion.text>

        { /* Testing Circle (Bottom Left) */ }
        <motion.circle cx="250" cy="450" r="70" fill="#c4b5fd" variants={itemVariants} />
        <motion.foreignObject x="200" y="400" width="100" height="100" variants={itemVariants}>
          <div className="flex flex-col items-center justify-center h-full">
            <Flask className="w-12 h-12 text-white" />
            <CheckCircle className="w-6 h-6 text-white mt-2" />
            <div className="flex mt-1">
              <Cog className="w-5 h-5 text-white" />
              <Cog className="w-5 h-5 text-white ml-1" />
            </div>
          </div>
        </motion.foreignObject>
        <motion.text
          x="250"
          y="500"
          fill="#1a1a3a"
          fontSize="14"
          fontWeight="bold"
          textAnchor="middle"
          variants={itemVariants}
        >
          Arseloc
        </motion.text>

        { /* Deploy Circle (Bottom Right) */ }
        <motion.circle cx="550" cy="450" r="70" fill="#c4b5fd" variants={itemVariants} />
        <motion.foreignObject x="500" y="400" width="100" height="100" variants={itemVariants}>
          <div className="flex flex-col items-center justify-center h-full">
            <Rocket className="w-14 h-14 text-white" />
            <div className="mt-2 bg-white/20 rounded-full w-10 h-3"></div>
            <div className="mt-1 bg-white/20 rounded-full w-8 h-2"></div>
          </div>
        </motion.foreignObject>

        { /* Clouds */ }
        <motion.ellipse cx="520" cy="420" rx="10" ry="8" fill="white" opacity="0.6" variants={itemVariants} />
        <motion.ellipse cx="580" cy="430" rx="12" ry="8" fill="white" opacity="0.6" variants={itemVariants} />
        <motion.ellipse cx="530" cy="110" rx="10" ry="8" fill="white" opacity="0.6" variants={itemVariants} />
        <motion.ellipse cx="570" cy="120" rx="12" ry="8" fill="white" opacity="0.6" variants={itemVariants} />
      </svg>
    </motion.div>
  );
}
