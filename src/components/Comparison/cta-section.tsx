import Link from '@/components/ui/link';

interface CTASectionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

export default function ComparisonCtaSection({ title, description, buttonText, buttonLink }: CTASectionProps) {
  return (
    <section className="py-16 bg-purple-700 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">{ title }</h2>
        <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">{ description }</p>
        <Link href={buttonLink} className="inline-block bg-white text-purple-700 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors">
          { buttonText }
        </Link>
      </div>
    </section>
  );
}