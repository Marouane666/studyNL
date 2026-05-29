"use client";

import Image from "next/image";
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
    <header className="w-full border-b border-[#f4d8c8] bg-[#fffaef]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-6">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src="/logo.svg"
            alt="StudyNL"
            width={32}
            height={32}
            priority
          />
          <span className="text-xl font-semibold tracking-tight">
            <span className="text-[#03294f]">Study</span>
            <span className="text-[#fd7933]">NL</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
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
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[#e8eafb] text-[#03294f]"
                    : "text-[#03294f]/80 hover:text-[#03294f] hover:bg-[#e8eafb]/60"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-[#03294f]/15 px-3 py-1.5 text-sm font-medium text-[#03294f] hover:bg-[#03294f]/5 transition-colors"
            aria-label="Change language"
          >
            <GlobeIcon />
            EN
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

function GlobeIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a13.5 13.5 0 0 1 0 18a13.5 13.5 0 0 1 0-18z" />
    </svg>
  );
}
