import { motion } from 'framer-motion';
import { Shield, Zap, Users, Target } from 'lucide-react';
import { useTranslations } from '@/i18n/utils';

export default function UseCasesHero({ lang }) {
  const t = useTranslations(lang);
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-purple-50 to-indigo-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="flex justify-center space-x-4 mb-8">
              <div className="p-3 bg-purple-100 rounded-full">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Zap className="w-8 h-8 text-purple-600" />
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Target className="w-8 h-8 text-purple-600" />
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-900">
              { t('use-case.hero.title') }
            </h1>

            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">{ t('use-case.hero.subtitle') }</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
