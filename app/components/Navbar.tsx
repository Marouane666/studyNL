"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = { href: string; label: string };

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/start-here", label: "Start Here" },
  { href: "/about", label: "About" },
  { href: "/guides", label: "Guides" },
  { href: "/hub-plus", label: "Hub Plus" },
  { href: "/help-centre", label: "Help Centre" },
  { href: "/forum", label: "Forum" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="w-full bg-[#eaf2fa]">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-6">
        <Link href="/" className="flex flex-col shrink-0 leading-none">
          <span className="text-2xl font-bold tracking-tight">
            <span className="text-[#03294f]">Study</span>
            <span className="text-[#fd7933]">NL</span>
          </span>
          <span className="mt-1 text-[10px] font-medium tracking-[0.15em] text-[#03294f]/60">
            POWERED BY GRADUATE HELP STUDENTS
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-2">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`rounded-full px-4 py-2 text-sm font-semibold text-[#03294f] transition-shadow ${
                  isActive
                    ? "bg-white shadow-[0_2px_8px_rgba(3,41,79,0.08)]"
                    : "bg-white shadow-[0_1px_3px_rgba(3,41,79,0.06)] hover:shadow-[0_2px_8px_rgba(3,41,79,0.1)]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            className="hidden sm:inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#03294f] shadow-[0_1px_3px_rgba(3,41,79,0.06)] hover:shadow-[0_2px_8px_rgba(3,41,79,0.1)] transition-shadow"
            aria-label="Change language"
          >
            English
          </button>
          <Link
            href="/start"
            className="inline-flex items-center rounded-full bg-[#fd7933] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#e96a25] transition-colors"
          >
            Start your move
          </Link>
        </div>
      </div>
    </header>
  );
}
