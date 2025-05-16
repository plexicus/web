import { 
  ShieldCheck, 
  Zap, 
  BarChart, 
  Bell, 
  LineChart, 
  Users, 
  Layers, 
  Clock, 
  FileCheck 
} from 'lucide-react';
import BenefitCard from '../Card/Benefit';

interface Benefit {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function ContentBenefits() {
  const benefits: Benefit[] = [
    {
      title: "Seamless Integration with CI/CD Pipelines",
      description: "Security becomes a built-in part of development, reducing vulnerabilities early in the lifecycle.",
      icon: <Layers className="w-6 h-6" />
    },
    {
      title: "Automated Vulnerability Management",
      description: "Reduces manual work with AI-driven detection, prioritization, and remediation of vulnerabilities, streamlining the development lifecycle.",
      icon: <ShieldCheck className="w-6 h-6" />
    },
    {
      title: "Intelligent Prioritization with Damage Potential",
      description: "Enables teams to focus on high-impact issues through smart prioritization metrics, optimizing time and resources.",
      icon: <BarChart className="w-6 h-6" />
    },
    {
      title: "Real-time Security Feedback",
      description: "Developers are immediately alerted to issues during development, allowing quick fixes at the source.",
      icon: <Bell className="w-6 h-6" />
    },
    {
      title: "Continuous Monitoring and Reporting",
      description: "Offers ongoing visibility into application security and supports compliance through detailed reporting.",
      icon: <LineChart className="w-6 h-6" />
    },
    {
      title: "Scalability for Growing Teams",
      description: "Adaptable for both small teams and large enterprises, supporting growth while maintaining strong security practices.",
      icon: <Users className="w-6 h-6" />
    },
    {
      title: "Enhanced Collaboration",
      description: "Encourages better communication between dev, sec, and ops through integrated workflows, promoting efficient DevSecOps practices.",
      icon: <Zap className="w-6 h-6" />
    },
    {
      title: "Accelerated Time-to-Fix",
      description: "AI-generated remediation playbooks and code fixes shorten the resolution cycle for identified vulnerabilities.",
      icon: <Clock className="w-6 h-6" />
    },
    {
      title: "Compliance and Visibility",
      description: "Provides detailed and actionable security reports that align with regulatory standards and organizational policies.",
      icon: <FileCheck className="w-6 h-6" />
    }
  ];
  return (
     <section className="py-16 md:py-24 bg-white relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-12 md:mb-16 animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Strategic Advantages of PLEXICUS
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our comprehensive security platform provides multiple benefits that transform how teams approach security in the development lifecycle.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="animate-fade-up" 
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <BenefitCard 
              className='h-60 md:h-54'
                title={benefit.title} 
                description={benefit.description} 
                icon={benefit.icon}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
