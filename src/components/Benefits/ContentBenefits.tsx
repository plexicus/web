import { useTranslations } from '@/i18n/utils'; // Assuming this path
import { 
  ShieldCheck, 
  Zap, 
  BarChart, 
  Bell, 
  LineChart, 
  Users, 
  Layers, 
  Clock, 
  FileCheck, 
} from 'lucide-react';
import BenefitCard from '../Card/Benefit';

interface Benefit {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function ContentBenefits({ lang }: { lang: string }) {
  const t = useTranslations(lang);

  const benefits: Benefit[] = [
    {
      title: t('benefits.grid.items.cicd.title'),
      description: t('benefits.grid.items.cicd.description'),
      icon: <Layers className="w-6 h-6" />,
    },
    {
      title: t('benefits.grid.items.automation.title'),
      description: t('benefits.grid.items.automation.description'),
      icon: <ShieldCheck className="w-6 h-6" />,
    },
    {
      title: t('benefits.grid.items.prioritization.title'),
      description: t('benefits.grid.items.prioritization.description'),
      icon: <BarChart className="w-6 h-6" />,
    },
    {
      title: t('benefits.grid.items.feedback.title'),
      description: t('benefits.grid.items.feedback.description'),
      icon: <Bell className="w-6 h-6" />,
    },
    {
      title: t('benefits.grid.items.monitoring.title'),
      description: t('benefits.grid.items.monitoring.description'),
      icon: <LineChart className="w-6 h-6" />,
    },
    {
      title: t('benefits.grid.items.scalability.title'),
      description: t('benefits.grid.items.scalability.description'),
      icon: <Users className="w-6 h-6" />,
    },
    {
      title: t('benefits.grid.items.collaboration.title'),
      description: t('benefits.grid.items.collaboration.description'),
      icon: <Zap className="w-6 h-6" />,
    },
    {
      title: t('benefits.grid.items.timetofix.title'),
      description: t('benefits.grid.items.timetofix.description'),
      icon: <Clock className="w-6 h-6" />,
    },
    {
      title: t('benefits.grid.items.compliance.title'),
      description: t('benefits.grid.items.compliance.description'),
      icon: <FileCheck className="w-6 h-6" />,
    },
  ];
  return (
    <section className="py-16 md:py-24 bg-white relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-12 md:mb-16 animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            { t('benefits.grid.title') }
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            { t('benefits.grid.subtitle') }
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          { benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="animate-fade-up" 
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <BenefitCard 
                className="h-60 md:h-54"
                title={benefit.title} 
                description={benefit.description} 
              />
            </div>
          )) }
        </div>
      </div>
    </section>
  );
}
