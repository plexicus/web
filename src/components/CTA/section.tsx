import Link from '@/components/ui/link';

interface CTASectionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
}

export default function CTASection({ title, description, buttonText, buttonLink, secondaryButtonText, secondaryButtonLink }: CTASectionProps) {
  return (
    <section className="py-16 bg-purple-700 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">{ title }</h2>
        <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">{ description }</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={buttonLink} className="inline-block bg-white text-purple-700 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors">
            { buttonText }
          </Link>
          { secondaryButtonText && secondaryButtonLink && (
            <Link href={secondaryButtonLink} className="border-2 border-white text-white hover:bg-white/10 font-medium py-3 px-8 rounded-lg transition-colors">
              { secondaryButtonText }
            </Link>
          ) }
        </div>
      </div>
    </section>
  );
}