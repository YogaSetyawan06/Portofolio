/**
 * AnimatedDot — pulsing green availability indicator with glowing shadow (§5.2).
 */
export default function AnimatedDot() {
  return (
    <span className="relative flex h-2 w-2">
      {/* Outer glow ring */}
      <span className="animate-glow-dot absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-60" />
      {/* Inner solid dot */}
      <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-green shadow-[0_0_4px_1px_rgba(34,197,94,0.4)]" />
    </span>
  );
}
