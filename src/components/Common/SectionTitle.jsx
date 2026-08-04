export default function SectionTitle({
  title,
  subtitle,
}) {
  return (
    <div className="mb-16 text-center">

      <p className="mb-3 uppercase tracking-[6px] text-yellow-500">
        {subtitle}
      </p>

      <h2 className="text-5xl font-bold text-white">
        {title}
      </h2>

    </div>
  );
}