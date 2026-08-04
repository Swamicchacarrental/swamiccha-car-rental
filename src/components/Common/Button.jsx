export default function Button({
  children,
  href,
  variant = "primary",
}) {
  const classes =
    variant === "primary"
      ? "rounded-full bg-yellow-500 px-8 py-3 font-semibold text-black transition hover:bg-yellow-400"
      : "rounded-full border border-white/30 bg-white/10 px-8 py-3 font-semibold text-white backdrop-blur-md transition hover:bg-white/20";

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return <button className={classes}>{children}</button>;
}