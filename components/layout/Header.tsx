"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/layout/Logo";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { navLinks, site, type NavLink } from "@/lib/site";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Parent overview first, then child pages (e.g. Services → All Services, Daycare…). */
function dropdownItems(link: NavLink) {
  if (!link.children?.length) return [];
  return [{ label: link.label, href: link.href }, ...link.children];
}

function DesktopItem({ link, pathname }: { link: NavLink; pathname: string }) {
  const active = isActive(pathname, link.href);
  const childActive = link.children?.some((child) => isActive(pathname, child.href));
  const items = dropdownItems(link);
  const [pinned, setPinned] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPinned(false);
  }, [pathname]);

  useEffect(() => {
    if (!pinned) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setPinned(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPinned(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [pinned]);

  if (!link.children?.length) {
    return (
      <Link
        href={link.href}
        aria-current={active ? "page" : undefined}
        className={cn(
          "border-b-2 py-1.5 font-display text-[0.9375rem] font-semibold transition-colors duration-300 xl:text-[1rem]",
          active
            ? "border-wine text-wine"
            : "border-transparent text-ink hover:border-wine hover:text-wine",
        )}
      >
        {link.label}
      </Link>
    );
  }

  return (
    <div
      ref={rootRef}
      className={cn("group/nav relative", pinned && "is-open")}
    >
      <div className="inline-flex items-center gap-0.5">
        <Link
          href={link.href}
          aria-current={active && !childActive ? "page" : undefined}
          className={cn(
            "border-b-2 py-1.5 font-display text-[0.9375rem] font-semibold transition-colors duration-300 xl:text-[1rem]",
            active || childActive
              ? "border-wine text-wine"
              : "border-transparent text-ink hover:border-wine hover:text-wine",
          )}
        >
          {link.label}
        </Link>
        <button
          type="button"
          aria-haspopup="true"
          aria-expanded={pinned}
          aria-label={`${pinned ? "Close" : "Open"} ${link.label} menu`}
          onClick={(event) => {
            event.preventDefault();
            setPinned((value) => !value);
          }}
          className={cn(
            "grid h-8 w-8 place-items-center rounded-full transition-colors duration-200",
            active || childActive || pinned
              ? "text-wine"
              : "text-ink hover:bg-cream-dark hover:text-wine",
          )}
        >
          <Icon
            name="angle-small-down"
            className={cn(
              "text-[0.85rem] transition-transform duration-300",
              pinned && "rotate-180",
              "group-hover/nav:rotate-180 group-focus-within/nav:rotate-180",
            )}
          />
        </button>
      </div>

      <div
        className={cn(
          "invisible absolute left-0 top-full z-[60] w-60 pt-2 opacity-0 transition-[opacity,visibility] duration-150",
          "pointer-events-none group-hover/nav:pointer-events-auto group-hover/nav:visible group-hover/nav:opacity-100",
          "group-focus-within/nav:pointer-events-auto group-focus-within/nav:visible group-focus-within/nav:opacity-100",
          pinned && "pointer-events-auto !visible !opacity-100",
        )}
      >
        <ul className="overflow-hidden rounded-[1rem] bg-white py-2 shadow-photo ring-1 ring-cream-dark">
          {items.map((child) => {
            const childIsActive = pathname === child.href;
            return (
              <li key={child.href}>
                <Link
                  href={child.href}
                  aria-current={childIsActive ? "page" : undefined}
                  onClick={() => setPinned(false)}
                  className={cn(
                    "block px-4 py-2.5 font-display text-[0.9rem] font-semibold transition-colors duration-200",
                    childIsActive
                      ? "bg-cream text-wine"
                      : "text-ink hover:bg-cream hover:text-wine",
                  )}
                >
                  {child.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function MobileItem({
  link,
  pathname,
  openHref,
  onToggle,
  onNavigate,
}: {
  link: NavLink;
  pathname: string;
  openHref: string | null;
  onToggle: (href: string) => void;
  onNavigate: () => void;
}) {
  const active = isActive(pathname, link.href);
  const childActive = link.children?.some((child) => isActive(pathname, child.href));
  const expanded = openHref === link.href;
  const items = dropdownItems(link);

  if (!link.children?.length) {
    return (
      <li>
        <Link
          href={link.href}
          aria-current={active ? "page" : undefined}
          onClick={onNavigate}
          className={cn(
            "flex items-center justify-between border-b border-cream-dark py-3.5 font-display text-base font-semibold",
            active ? "text-wine" : "text-ink hover:text-wine",
          )}
        >
          {link.label}
        </Link>
      </li>
    );
  }

  return (
    <li className="border-b border-cream-dark">
      <div className="flex items-center">
        <Link
          href={link.href}
          aria-current={active && !childActive ? "page" : undefined}
          onClick={onNavigate}
          className={cn(
            "flex-1 py-3.5 font-display text-base font-semibold",
            active || childActive ? "text-wine" : "text-ink hover:text-wine",
          )}
        >
          {link.label}
        </Link>
        <button
          type="button"
          aria-expanded={expanded}
          aria-label={`${expanded ? "Collapse" : "Expand"} ${link.label} submenu`}
          onClick={() => onToggle(link.href)}
          className="grid h-11 w-11 place-items-center text-ink"
        >
          <Icon
            name="angle-small-down"
            className={cn("text-base transition-transform duration-300", expanded && "rotate-180")}
          />
        </button>
      </div>
      {expanded ? (
        <ul className="overflow-hidden bg-white/70">
          {items.map((child) => {
            const childIsActive = pathname === child.href;
            return (
              <li key={child.href}>
                <Link
                  href={child.href}
                  aria-current={childIsActive ? "page" : undefined}
                  onClick={onNavigate}
                  className={cn(
                    "block py-2.5 pl-4 pr-2 font-display text-[0.95rem] font-semibold",
                    childIsActive ? "text-wine" : "text-soft hover:text-wine",
                  )}
                >
                  {child.label}
                </Link>
              </li>
            );
          })}
        </ul>
      ) : null}
    </li>
  );
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      setScrolled(y > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setOpenSubmenu(null);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-[60] bg-[#FEFBF5]/95 backdrop-blur-md transition-[box-shadow] duration-300",
        scrolled && "shadow-header",
      )}
    >
      <div className="container-page">
        <div
          className={cn(
            "flex flex-wrap items-center justify-between gap-3 py-2.5 sm:gap-4 sm:py-3 transition-[min-height] duration-300 ease-gentle",
            scrolled ? "min-h-[5.25rem] sm:min-h-[6.5rem]" : "min-h-[7.25rem] sm:min-h-[9rem] lg:min-h-[10.5rem]",
          )}
        >
          <Logo compact={scrolled} />

          <nav aria-label="Main" className="hidden items-center gap-x-5 gap-y-2 lg:flex xl:gap-x-6">
            {navLinks.map((link) => (
              <DesktopItem key={link.href} link={link} pathname={pathname} />
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={site.phoneHref}
              className="hidden items-center gap-2.5 font-display text-[1.125rem] font-bold text-ink underline-offset-4 transition-colors duration-300 hover:text-wine hover:underline sm:inline-flex"
            >
              <Icon name="phone-call" className="text-[1.05rem]" />
              {site.phoneDisplay}
            </a>

            <Link
              href="/contact-us"
              className="hidden rounded-pill bg-wine px-5 py-2.5 font-display text-[0.9375rem] font-bold text-white shadow-cta transition-[background-color,box-shadow] duration-300 hover:bg-brand-500 hover:shadow-[0_12px_28px_rgba(35,150,206,0.32)] sm:inline-flex"
            >
              Book an Appointment
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="grid h-11 w-11 place-items-center rounded-pill text-ink transition-colors hover:bg-cream-dark lg:hidden"
            >
              <span className="relative block h-4 w-5" aria-hidden="true">
                <span
                  className={cn(
                    "absolute left-0 top-0 h-0.5 w-full bg-current transition-transform duration-300",
                    menuOpen && "top-1.5 rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-[7px] h-0.5 w-full bg-current transition-opacity duration-300",
                    menuOpen && "opacity-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute bottom-0 left-0 h-0.5 w-full bg-current transition-transform duration-300",
                    menuOpen && "bottom-1.5 -rotate-45",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      {menuOpen ? (
        <div id="mobile-menu" className="border-t border-cream-line bg-[#FEFBF5] lg:hidden">
          <nav aria-label="Mobile" className="container-page py-4">
            <ul className="flex flex-col">
              {navLinks.map((link) => (
                <MobileItem
                  key={link.href}
                  link={link}
                  pathname={pathname}
                  openHref={openSubmenu}
                  onToggle={(href) =>
                    setOpenSubmenu((current) => (current === href ? null : href))
                  }
                  onNavigate={() => {
                    setMenuOpen(false);
                    setOpenSubmenu(null);
                  }}
                />
              ))}
            </ul>

            <div className="mt-5 flex flex-col gap-3">
              <a
                href={site.phoneHref}
                className="flex w-full items-center justify-center gap-2 rounded-pill border-2 border-ink px-6 py-3.5 font-display text-base font-bold text-ink"
              >
                <Icon name="phone-call" />
                Call {site.phoneDisplay}
              </a>
              <Link
                href="/contact-us"
                onClick={() => {
                  setMenuOpen(false);
                  setOpenSubmenu(null);
                }}
                className="flex w-full items-center justify-center rounded-pill bg-wine px-6 py-3.5 font-display text-base font-bold text-white"
              >
                Book an Appointment
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
