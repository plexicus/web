import { motion } from "framer-motion"
import { Shield, ArrowRight, CheckCircleIcon, User, Code, Eye } from "lucide-react"
import { useState, useEffect, useRef } from "react"

export default function NavigateComplexitySection() {
    const [isVisible, setIsVisible] = useState(true)
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.disconnect()
                }
            },
            { threshold: 0.2 },
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => observer.disconnect()
    }, [])
    const keyChallanges = [
        {
            title: "Complex Architectures",
            description: "Managing security across microservices, containers, and cloud-native environments",
            stat: "73% increase in complexity",
        },
        {
            title: "Fast-Paced CI/CD",
            description: "Addressing vulnerabilities within rapid deployment cycles",
            stat: "5x faster deployments",
        },
        {
            title: "Alert Fatigue",
            description: "Reducing noise from disparate security tools",
            stat: "1000+ daily alerts",
        },
        {
            title: "Security vs Speed",
            description: "Ensuring security empowers rather than hinders development",
            stat: "40% slower releases",
        },
    ]
    return (
        <>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="space-y-6"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Navigating the Complexities of{" "}
                        <span className="bg-gradient-to-r from-[#8220ff] to-purple-600 bg-clip-text text-transparent">
                            Modern Application Security
                        </span>
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                        In today's dynamic development environments, organizations face mounting pressure to innovate rapidly
                        while defending against an increasingly sophisticated threat landscape.
                    </p>
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-gray-800">Key Challenges:</h3>
                        <div className="space-y-3">
                            {
                                keyChallanges.map((challenge, index) => (
                                    <motion.div
                                        key={index}
                                        className="flex items-start space-x-3 p-3 rounded-lg bg-white border border-purple-100 shadow-sm"
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                    >
                                        <div className="w-2 h-2 rounded-full bg-[#8220ff] mt-2 flex-shrink-0"></div>
                                        <div className="flex-1">
                                            <h4 className="font-medium text-gray-900">{challenge.title}</h4>
                                            <p className="text-sm text-gray-600 mt-1">{challenge.description}</p>
                                            <span className="text-xs font-bold text-[#8220ff] bg-purple-50 px-2 py-1 rounded-full inline-block mt-2">
                                                {challenge.stat}
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}

                        </div>
                    </div>
                </motion.div>
                <div
                    className={`relative transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
                >

                    <SecurityFlowDiagram
                        isVisible={isVisible}
                    />
                </div>
            </div>
        </>
    )
}

function SecurityFlowDiagram({ isVisible }: { isVisible: boolean }) {
    const [activeFlow, setActiveFlow] = useState(0)
    const [hoveredComponent, setHoveredComponent] = useState<string | null>(null)

    useEffect(() => {
        if (!isVisible) return

        const flowInterval = setInterval(() => {
            setActiveFlow((prev) => (prev + 1) % 3)
        }, 3500)

        return () => clearInterval(flowInterval)
    }, [isVisible])

    return (
        <div className="relative w-full h-[500px] bg-gradient-to-br from-purple-100 to-purple-50 rounded-3xl p-8 overflow-hidden shadow-lg border border-purple-100">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `radial-gradient(circle at 25% 25%, #8220ff 1px, transparent 1px),
                           radial-gradient(circle at 75% 75%, #8220ff 1px, transparent 1px)`,
                        backgroundSize: "40px 40px",
                    }}
                />
            </div>

            {/* Flow Connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                    <linearGradient id="primaryFlow" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8220ff" stopOpacity="0.7" />
                        <stop offset="100%" stopColor="#a855f7" stopOpacity="0.7" />
                    </linearGradient>
                    <linearGradient id="secondaryFlow" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#a855f7" stopOpacity="0.7" />
                        <stop offset="100%" stopColor="#c084fc" stopOpacity="0.7" />
                    </linearGradient>
                    <linearGradient id="responseFlow" x1="100%" y1="100%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#c084fc" stopOpacity="0.7" />
                        <stop offset="100%" stopColor="#8220ff" stopOpacity="0.7" />
                    </linearGradient>
                </defs>

                {/* Top horizontal connection */}
                <path
                    d="M 180 80 Q 300 60 420 80"
                    fill="none"
                    stroke="url(#primaryFlow)"
                    strokeWidth="3"
                    strokeDasharray="6,3"
                    className={`transition-all duration-500 ${activeFlow === 0 ? "opacity-100" : "opacity-40"}`}
                />

                {/* Diagonal connection */}
                <path
                    d="M 420 120 Q 360 220 420 320"
                    fill="none"
                    stroke="url(#secondaryFlow)"
                    strokeWidth="3"
                    strokeDasharray="6,3"
                    className={`transition-all duration-500 ${activeFlow === 1 ? "opacity-100" : "opacity-40"}`}
                />

                {/* Bottom horizontal connection */}
                <path
                    d="M 380 360 Q 300 380 220 360"
                    fill="none"
                    stroke="url(#responseFlow)"
                    strokeWidth="3"
                    strokeDasharray="6,3"
                    className={`transition-all duration-500 ${activeFlow === 2 ? "opacity-100" : "opacity-40"}`}
                />

                {/* Animated flow particles */}
                <circle
                    r="4"
                    fill="#8220ff"
                    className={`transition-all duration-300 ${activeFlow === 0 ? "opacity-100" : "opacity-0"}`}
                >
                    <animateMotion dur="3s" repeatCount="indefinite">
                        <mpath href="#path1" />
                    </animateMotion>
                </circle>
                <path id="path1" d="M 180 80 Q 300 60 420 80" fill="none" opacity="0" />

                <circle
                    r="4"
                    fill="#a855f7"
                    className={`transition-all duration-300 ${activeFlow === 1 ? "opacity-100" : "opacity-0"}`}
                >
                    <animateMotion dur="3s" repeatCount="indefinite">
                        <mpath href="#path2" />
                    </animateMotion>
                </circle>
                <path id="path2" d="M 420 120 Q 360 220 420 320" fill="none" opacity="0" />

                <circle
                    r="4"
                    fill="#c084fc"
                    className={`transition-all duration-300 ${activeFlow === 2 ? "opacity-100" : "opacity-0"}`}
                >
                    <animateMotion dur="3s" repeatCount="indefinite">
                        <mpath href="#path3" />
                    </animateMotion>
                </circle>
                <path id="path3" d="M 380 360 Q 300 380 220 360" fill="none" opacity="0" />
            </svg>

            {/* Developer/User Node */}
            <div
                className={`absolute top-4 left-4 transition-all duration-700 cursor-pointer ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                    } ${activeFlow === 0 ? "scale-105 shadow-xl" : "scale-100 shadow-lg"}`}
                onMouseEnter={() => setHoveredComponent("developer")}
                onMouseLeave={() => setHoveredComponent(null)}
            >
                <div className="bg-white rounded-2xl p-4 w-40 relative">
                    {/* Corner Dots */}
                    <div className="absolute top-2 left-2 w-1.5 h-1.5 bg-gray-200 rounded-full"></div>
                    <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-gray-200 rounded-full"></div>
                    <div className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-gray-200 rounded-full"></div>
                    <div className="absolute bottom-2 right-2 w-1.5 h-1.5 bg-gray-200 rounded-full"></div>

                    {/* Icon */}
                    <div className="flex justify-center mb-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center border-4 border-blue-50">
                            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                                <User className="w-4 h-4 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="text-center">
                        <h3 className="text-sm font-semibold text-gray-800 mb-1">Developer</h3>
                        <p className="text-xs text-gray-600">Alex</p>
                        <div className="mt-2 flex justify-center gap-1">
                            <div className="w-4 h-0.5 bg-blue-200 rounded-full"></div>
                            <div className="w-4 h-0.5 bg-blue-300 rounded-full"></div>
                            <div className="w-4 h-0.5 bg-blue-400 rounded-full"></div>
                        </div>
                    </div>
                </div>
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                    <div className="bg-white px-2 py-1 rounded-full shadow-sm border border-gray-100">
                        <span className="text-xs font-medium text-gray-700">User</span>
                    </div>
                </div>
            </div>

            {/* Security Engine Node */}
            <div
                className={`absolute top-4 right-4 transition-all duration-700 cursor-pointer ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                    } ${activeFlow === 1 ? "scale-105 shadow-xl" : "scale-100 shadow-lg"}`}
                onMouseEnter={() => setHoveredComponent("security-engine")}
                onMouseLeave={() => setHoveredComponent(null)}
            >
                <div className="bg-white rounded-2xl p-4 w-40 relative">
                    {/* Corner Dots */}
                    <div className="absolute top-2 left-2 w-1.5 h-1.5 bg-gray-200 rounded-full"></div>
                    <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-gray-200 rounded-full"></div>
                    <div className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-gray-200 rounded-full"></div>
                    <div className="absolute bottom-2 right-2 w-1.5 h-1.5 bg-gray-200 rounded-full"></div>

                    {/* Icon */}
                    <div className="flex justify-center mb-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center border-4 border-purple-50">
                            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                                <Shield className="w-4 h-4 text-purple-600" />
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="text-center">
                        <h3 className="text-sm font-semibold text-gray-800 mb-1">Security Engine</h3>
                        <p className="text-xs text-gray-600">Policy Check</p>
                        <div className="mt-2 flex justify-center gap-1">
                            <div className="w-4 h-0.5 bg-purple-200 rounded-full"></div>
                            <div className="w-4 h-0.5 bg-purple-300 rounded-full"></div>
                            <div className="w-4 h-0.5 bg-purple-400 rounded-full"></div>
                        </div>
                    </div>
                </div>
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                    <div className="bg-white px-2 py-1 rounded-full shadow-sm border border-purple-100">
                        <span className="text-xs font-medium text-purple-700">PDP</span>
                    </div>
                </div>
            </div>

            {/* AI Security Agent Node */}
            <div
                className={`absolute bottom-16 right-4 transition-all duration-700 cursor-pointer ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                    } ${activeFlow === 2 ? "scale-105 shadow-xl" : "scale-100 shadow-lg"}`}
                onMouseEnter={() => setHoveredComponent("ai-agent")}
                onMouseLeave={() => setHoveredComponent(null)}
            >
                <div className="bg-white rounded-2xl p-4 w-40 relative">
                    {/* Corner Dots */}
                    <div className="absolute top-2 left-2 w-1.5 h-1.5 bg-gray-200 rounded-full"></div>
                    <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-gray-200 rounded-full"></div>
                    <div className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-gray-200 rounded-full"></div>
                    <div className="absolute bottom-2 right-2 w-1.5 h-1.5 bg-gray-200 rounded-full"></div>

                    {/* Icon */}
                    <div className="flex justify-center mb-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center border-4 border-orange-50">
                            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                                <Eye className="w-4 h-4 text-orange-600" />
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="text-center">
                        <h3 className="text-sm font-semibold text-gray-800 mb-1">AI Agent</h3>
                        <p className="text-xs text-gray-600">Security Analysis</p>
                        <div className="mt-2 flex justify-center gap-1">
                            <div className="w-4 h-0.5 bg-orange-200 rounded-full"></div>
                            <div className="w-4 h-0.5 bg-orange-300 rounded-full"></div>
                            <div className="w-4 h-0.5 bg-orange-400 rounded-full"></div>
                        </div>
                    </div>
                </div>
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                    <div className="bg-white px-2 py-1 rounded-full shadow-sm border border-orange-100">
                        <span className="text-xs font-medium text-orange-700">Agent</span>
                    </div>
                </div>
            </div>

            {/* Application Node */}
            <div
                className={`absolute bottom-16 left-4 transition-all duration-700 cursor-pointer ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                    } ${activeFlow === 0 ? "scale-105 shadow-xl" : "scale-100 shadow-lg"}`}
                onMouseEnter={() => setHoveredComponent("application")}
                onMouseLeave={() => setHoveredComponent(null)}
            >
                <div className="bg-white rounded-2xl p-4 w-40 relative">
                    {/* Corner Dots */}
                    <div className="absolute top-2 left-2 w-1.5 h-1.5 bg-gray-200 rounded-full"></div>
                    <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-gray-200 rounded-full"></div>
                    <div className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-gray-200 rounded-full"></div>
                    <div className="absolute bottom-2 right-2 w-1.5 h-1.5 bg-gray-200 rounded-full"></div>

                    {/* Icon */}
                    <div className="flex justify-center mb-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center border-4 border-green-50">
                            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                                <Code className="w-4 h-4 text-green-600" />
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="text-center">
                        <h3 className="text-sm font-semibold text-gray-800 mb-1">Application</h3>
                        <p className="text-xs text-gray-600">Secure Deploy</p>
                        <div className="mt-2 flex justify-center gap-1">
                            <div className="w-4 h-0.5 bg-green-200 rounded-full"></div>
                            <div className="w-4 h-0.5 bg-green-300 rounded-full"></div>
                            <div className="w-4 h-0.5 bg-green-400 rounded-full"></div>
                        </div>
                    </div>
                </div>
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                    <div className="bg-white px-2 py-1 rounded-full shadow-sm border border-green-100">
                        <span className="text-xs font-medium text-green-700">Your App</span>
                    </div>
                </div>
            </div>

            {/* Flow Labels */}
            <div
                className={`absolute top-16 left-1/2 transform -translate-x-1/2 transition-all duration-500 ${activeFlow === 0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
            >
                <div className="bg-white border border-purple-200 text-purple-700 px-4 py-2 rounded-full text-sm font-medium shadow-sm">
                    Security Request
                </div>
            </div>

            <div
                className={`absolute top-1/2 right-12 transform -translate-y-1/2 transition-all duration-500 ${activeFlow === 1 ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"}`}
            >
                <div className="bg-white border border-purple-200 text-purple-700 px-4 py-2 rounded-full text-sm font-medium shadow-sm">
                    AI Analysis
                </div>
            </div>

            <div
                className={`absolute bottom-32 left-1/2 transform -translate-x-1/2 transition-all duration-500 ${activeFlow === 2 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}
            >
                <div className="bg-white border border-purple-200 text-purple-700 px-4 py-2 rounded-full text-sm font-medium shadow-sm">
                    Secure Response
                </div>
            </div>

            {/* Central Decision Point */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="bg-white rounded-xl p-3 shadow-md border-2 border-purple-200">
                    <div className="text-center">
                        <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full mx-auto mb-1 flex items-center justify-center">
                            <CheckCircleIcon className="w-3 h-3 text-white" />
                        </div>
                        <div className="text-xs font-medium text-gray-700">Conditional</div>
                        <div className="text-xs font-medium text-gray-700">Access</div>
                    </div>
                </div>
            </div>

            {/* Bottom Result - More Seamless */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                <div className="bg-white rounded-2xl px-4 py-2 shadow-lg border-2 border-purple-100">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                            <CheckCircleIcon className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <span className="font-semibold text-gray-800">Security Agent</span>
                            <span className="text-purple-600 font-medium">can</span>
                            <span className="font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
                                Secure Applications
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Status Indicator */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                <div className="flex items-center gap-2 bg-white bg-opacity-80 backdrop-blur-sm px-3 py-2 rounded-full text-xs text-purple-600">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                    <span className="font-medium">Active Security Flow</span>
                </div>
            </div>

            {/* Hover Tooltips */}
            {hoveredComponent && (
                <div className="absolute top-2 right-2 bg-gray-800 text-white px-3 py-2 rounded-lg text-xs max-w-48 z-10">
                    {hoveredComponent === "developer" &&
                        "Development teams initiate secure deployment requests through integrated development workflows"}
                    {hoveredComponent === "security-engine" &&
                        "Centralized security engine evaluates policies, scans for vulnerabilities, and enforces access controls"}
                    {hoveredComponent === "ai-agent" &&
                        "AI-powered security agent analyzes threats, provides intelligent recommendations, and automates responses"}
                    {hoveredComponent === "application" &&
                        "Secure application deployment with validated security controls and real-time monitoring"}
                </div>
            )}
        </div>
    )
}