export default function GlassCard({
  children,
}) {
  return (
    <div
      className="
      rounded-3xl
      border
      border-white/10
      bg-white/5
      backdrop-blur-xl
      p-8
      transition-all
      duration-500
      hover:-translate-y-2
      hover:border-yellow-500
      "
    >
      {children}
    </div>
  );
}