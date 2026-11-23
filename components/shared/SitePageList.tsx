import Link from "next/link";
import { sitemapSections } from "@/lib/site";

/** Hierarchical site page list shared by sitemap and 404. */
export function SitePageList() {
  return (
    <>
      <h2 className="font-display text-display-sm text-ink">All pages</h2>

      <div className="mt-10 space-y-10">
        {sitemapSections.map((section) => (
          <div key={section.heading}>
            <h3 className="font-display text-lg font-bold tracking-[-0.02em] text-ink">
              {section.heading}
            </h3>
            <ul className="mt-4 space-y-2 border-l border-cream-line pl-5">
              {section.pages.map((page) => (
                <li key={page.href}>
                  <Link
                    href={page.href}
                    className="text-body font-medium text-muted transition-colors duration-300 hover:text-wine"
                  >
                    {page.label}
                  </Link>
                  {"children" in page && page.children ? (
                    <ul className="mt-2 space-y-1.5 border-l border-cream-line pl-4">
                      {page.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="text-body-sm text-soft transition-colors duration-300 hover:text-wine"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
