const NAVY = "#092A4D";

export function Avatar({ name, small }: { name: string; small?: boolean }) {
  const initial = name.trim().charAt(0).toUpperCase() || "?";
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-bold text-white ${
        small ? "size-7 text-xs" : "size-10 text-sm"
      }`}
      style={{ backgroundColor: NAVY }}
    >
      {initial}
    </span>
  );
}
