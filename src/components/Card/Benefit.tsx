
import React from 'react';
import { Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
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
} from "lucide-react";

interface BenefitCardProps {
  title: string;
  description: string;
  iconName?: string;
  className?: string;
}

const BenefitCard = ({ title, description, iconName = 'Shield', className }: BenefitCardProps) => {

  const iconMap: Record<string, React.ReactNode> = {
    Layers: <Layers className="w-6 h-6" />,
    ShieldCheck: <ShieldCheck className="w-6 h-6" />,
    BarChart: <BarChart className="w-6 h-6" />,
    Bell: <Bell className="w-6 h-6" />,
    LineChart: <LineChart className="w-6 h-6" />,
    Users: <Users className="w-6 h-6" />,
    Zap: <Zap className="w-6 h-6" />,
    Clock: <Clock className="w-6 h-6" />,
    FileCheck: <FileCheck className="w-6 h-6" />,
    Shield: <Shield className="w-6 h-6" />
  };

  const icon = iconMap[iconName] || iconMap['Shield'];

  return (
    <div className={cn(
      "bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-500",
      "hover:border-primary/20 hover:translate-y-[-5px] group",
      className
    )}>
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center group-hover:bg-[#8220ff] group-hover:text-white transition-colors duration-300 transform group-hover:rotate-6">
          {icon}
        </div>
        <div className="flex flex-col">
          <h3 className="text-xl font-semibold mb-2 text-gray-800 group-hover:text-[#8220ff] transition-colors">{title}</h3>
          <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default BenefitCard;
