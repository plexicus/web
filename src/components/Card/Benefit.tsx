
import React from 'react';
import { Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BenefitCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
}

const BenefitCard = ({ title, description, icon = <Shield className="w-6 h-6" />, className }: BenefitCardProps) => {
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
