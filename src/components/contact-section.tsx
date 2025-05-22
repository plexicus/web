import { Button } from './ui/button';
import { useTranslations } from '@/i18n/utils';
export default function ContactSection({ lang }) {
  const t = useTranslations(lang);
  return (
    <section className="py-16 text-white" style={{ backgroundColor: '#8220ff' }}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-end">
          <div className='w-full order-last md:order-first'>
            <h2 className="text-3xl font-bold tracking-tight mb-6">{ t('contact.title') }</h2>
            <p className="text-white/90 mb-8">
              { t('contact.subtitle') }
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{ t('contact.addresses') }</h3>
                  <div className="text-white/80">
                    <p className="font-medium">USA</p>
                    <p>
                      2010 El Camino Real #2456
                      <br />
                      Santa Clara, CA 95050 USA
                    </p>

                    <div className="my-3 border-t border-white/10"></div>

                    <p className="font-medium">EUROPE</p>
                    <p>
                      Madrid International Lab
                      <br />
                      Calle Bailen 41, 28005, Madrid
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5"
                  >
                    <path d="M12 8v4l3 3"></path>
                    <circle cx="12" cy="12" r="10"></circle>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{ t('contact.hours') }</h3>
                  <p className="text-white/80">Mon-Fri 9:00AM - 5:00PM</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{ t('contact.email') }</h3>
                  <p className="text-white/80">info@plexicus.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{ t('contact.phone') }</h3>
                  <p className="text-white/80">+1 510-298-1863</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg">
            <h3 className="text-xl font-semibold mb-6">{ t('contact.form.title') }</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="first-name" className="block text-sm font-medium text-white/80 mb-1">
                    { t('contact.form.first_name') }*
                  </label>
                  <input
                    type="text"
                    id="first-name"
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label htmlFor="last-name" className="block text-sm font-medium text-white/80 mb-1">
                    { t('contact.form.last_name') }*
                  </label>
                  <input
                    type="text"
                    id="last-name"
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1">
                  { t('contact.form.business_email') }*
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20"
                  placeholder="john.doe@company.com"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-white/80 mb-1">
                  { t('contact.form.company') }*
                </label>
                <input
                  type="text"
                  id="company"
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20"
                  placeholder="Acme Inc."
                />
              </div>

              <div>
                <label htmlFor="job-title" className="block text-sm font-medium text-white/80 mb-1">
                  { t('contact.form.job_title') }*
                </label>
                <input
                  type="text"
                  id="job-title"
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20"
                  placeholder="Security Engineer"
                />
              </div>

              <div className="flex items-start">
                <input
                  id="privacy"
                  type="checkbox"
                  className="h-4 w-4 mt-1 border-white/30 rounded bg-white/5 text-primary focus:ring-primary"
                />
                <label htmlFor="privacy" className="ml-2 block text-sm text-white/70">
                  { t('contact.form.tnc') }
                </label>
              </div>

              <Button className="w-full bg-white text-primary hover:bg-white/90">{ t('contact.form.submit') }</Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
