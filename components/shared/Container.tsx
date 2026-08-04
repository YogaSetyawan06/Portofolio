export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`w-full max-w-[1080px] mx-auto px-6 md:px-8 lg:px-[44px] ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
