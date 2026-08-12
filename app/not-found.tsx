import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="bg-[#B4D1DA] pb-26 pt-20">
      <div className="container-page">
        <div className="mx-auto max-w-xl text-center">
          <p className="font-display text-[5rem] font-extrabold leading-none text-brand-200">404</p>
          <h1 className="mt-4 text-display-md">This Page Went for a Walk</h1>
          <p className="mt-5 text-body text-muted">
            We couldn&rsquo;t find what you were looking for. Try our services page, or just call the
            shoppe - we&rsquo;re quicker than a sitemap.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/" size="lg">
              Back to home
            </ButtonLink>
            <ButtonLink href={site.phoneHref} variant="secondary" size="lg">
              <Icon name="phone-call" />
              {site.phoneDisplay}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
