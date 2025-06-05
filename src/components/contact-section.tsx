import { useEffect } from 'react';
import { Button } from './ui/button';
import { useTranslations } from '@/i18n/utils';
export default function ContactSection({ lang }) {
  const t = useTranslations(lang);
  useEffect(() => {

    const trackForm = document.createElement('script');
    trackForm.src = 'https://js.hs-scripts.com/43769202.js';
    trackForm.id = 'hs-script-loader';
    trackForm.type = 'text/javascript';
    trackForm.defer = true;
    trackForm.async = true;

    const embedForm = document.createElement('script');
    embedForm.src = 'https://js.hsforms.net/forms/v2.js?ver=11.3.6';
    document.body.appendChild(embedForm);
    // Add the desired attributes
    embedForm.setAttribute('data-hs-shell', 'true');
    embedForm.setAttribute('data-hs-frame', 'true');
    embedForm.setAttribute('data-hubspot-rendered', 'true');

    embedForm.addEventListener('load', () => {
      if ((window as any).hbspt) {
        (window as any).hbspt.forms.create({
          portalId: '43769202',
          formId: '076aaef8-47be-4fc8-b09b-0ff8169919c2',
          target: '#hbspt-form-1747992927000-4374046073',
        });
      }
    });
  }, []);
  return (
    <section className="py-16 text-white" style={{ backgroundColor: '#8220ff' }}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-start md:py-[100px]">
          <div className="w-full order-last md:order-first">
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
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-lg h-full w-full">
            <h3 className="text-xl font-semibold mb-6 text-black">{ t('contact.form.title') }</h3>
            <div id="hbspt-form-1747992927000-4374046073" className="h-full w-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
