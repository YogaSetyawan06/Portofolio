/**
 * SectionHeading — reusable heading component for each section.
 */
interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-black">{title}</h2>
      {subtitle && (
        <p className="mt-2 text-body text-lg">{subtitle}</p>
      )}
    </div>
  );
}
