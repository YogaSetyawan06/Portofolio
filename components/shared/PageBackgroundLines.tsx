export function PageBackgroundLines() {
  return (
    <>
      <div
        className="absolute inset-y-0 w-px bg-gray-300 pointer-events-none z-10 hidden lg:block"
        style={{ left: "calc(50% - 540px)" }}
      />
      <div
        className="absolute inset-y-0 w-px bg-gray-300 pointer-events-none z-10 hidden lg:block"
        style={{ left: "calc(50% + 540px)" }}
      />
    </>
  );
}
