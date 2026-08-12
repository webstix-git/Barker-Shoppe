"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/layout/Logo";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { navLinks, site, type NavLink } from "@/lib/site";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function DesktopItem({ link, pathname }: { link: NavLink; pathname: string }) {
  const active = isActive(pathname, link.href);
  const childActive = link.children?.some((child) => isActive(pathname, child.href));

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
    <div className="group relative">
      <Link
        href={link.href}
        aria-current={active && !childActive ? "page" : undefined}
        aria-haspopup="true"
        className={cn(
          "inline-flex items-center gap-1 border-b-2 py-1.5 font-display text-[0.9375rem] font-semibold transition-colors duration-300 xl:text-[1rem]",
          active || childActive
            ? "border-wine text-wine"
            : "border-transparent text-ink hover:border-wine hover:text-wine",
        )}
      >
        {link.label}
        <Icon
          name="angle-small-down"
          className="text-[0.85rem] transition-transform duration-300 group-hover:rotate-180"
        />
      </Link>

      <div className="invisible absolute left-1/2 top-full z-50 w-60 -translate-x-1/2 pt-2 opacity-0 transition-[opacity,visibility] duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <ul className="overflow-hidden rounded-[1rem] bg-white py-2 shadow-photo ring-1 ring-cream-dark">
          {link.children.map((child) => {
            const childIsActive = isActive(pathname, child.href);
            return (
              <li key={child.href}>
                <Link
                  href={child.href}
                  aria-current={childIsActive ? "page" : undefined}
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
}: {
  link: NavLink;
  pathname: string;
  openHref: string | null;
  onToggle: (href: string) => void;
}) {
  const active = isActive(pathname, link.href);
  const childActive = link.children?.some((child) => isActive(pathname, child.href));
  const expanded = openHref === link.href || Boolean(childActive);

  if (!link.children?.length) {
    return (
      <li>
        <Link
          href={link.href}
          aria-current={active ? "page" : undefined}
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
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 0.61, 0.36, 1] }}
            className="overflow-hidden bg-white/70"
          >
            {link.children.map((child) => {
              const childIsActive = isActive(pathname, child.href);
              return (
                <li key={child.href}>
                  <Link
                    href={child.href}
                    aria-current={childIsActive ? "page" : undefined}
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
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
}

export function Header() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
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
        "sticky top-0 z-50 border-b border-cream-line bg-cream/95 backdrop-blur-md transition-shadow duration-300",
        scrolled && "shadow-header",
      )}
    >
      <div className="container-page">
        <div
          className={cn(
            "flex flex-wrap items-center justify-between gap-4 py-3 transition-[min-height] duration-300 ease-gentle",
            scrolled ? "min-h-[6.75rem]" : "min-h-[9.5rem]",
          )}
        >
          <Logo size="lg" compact={scrolled} />

          <nav aria-label="Main" className="hidden items-center gap-x-5 gap-y-2 lg:flex xl:gap-x-6">
            {navLinks.map((link) => (
              <DesktopItem key={link.href} link={link} pathname={pathname} />
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={site.phoneHref}
              className="hidden items-center gap-2.5 font-display text-[1.125rem] font-bold text-wine transition-colors duration-300 hover:text-brand-500 sm:inline-flex"
            >
              <Icon name="phone-call" className="text-[1.05rem] text-brand-500" />
              {site.phoneDisplay}
            </a>

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

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.22, 0.61, 0.36, 1] }}
            className="border-t border-cream-line bg-cream lg:hidden"
          >
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
                  />
                ))}
              </ul>

              <a
                href={site.phoneHref}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-pill bg-wine px-6 py-3.5 font-display text-base font-bold text-white"
              >
                <Icon name="phone-call" />
                Call {site.phoneDisplay}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
